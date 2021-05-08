require("dotenv").config();
const {
  createUser,
  getUser,
  getUserByEmail,
  incrementRefreshTokenVersion,
} = require("../helpers/db");
const bcrypt = require("bcryptjs");
const { AuthenticationError } = require("apollo-server");

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../helpers/auth");
const { UserError } = require("../helpers/errors");

const resolvers = {
  Query: {
    user: async (parent, args, context, info) => {
      User.findByPk(args);
    },
  },

  Mutation: {
    register: async (parent, { input }, { req, res }, info) => {
      // TODO: validate inputs
      console.log(input);

      // check if in db
      const inDb = await getUserByEmail(input.email);
      if (inDb) {
        throw new UserError("Email already exists");
      }
      // hash password
      const hashedPassword = await bcrypt.hash(
        input.password,
        parseInt(process.env.SALT_ROUNDS, 10)
      );
      if (!hashedPassword) {
        console.error("Hashed Password:", hashedPassword);
        throw new Error("Error hashing password");
      }

      // enter into database
      const user = await createUser({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      if (!user) {
        throw new Error("Error encountered while inserting user into db");
      }

      // make and return tokens
      const accessToken = createAccessToken(user);

      sendRefreshToken(res, createRefreshToken(user));

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        accessToken: accessToken,
      };
    },
    login: async (parent, { input }, { res }, info) => {
      // validate inputs

      // check if in db
      const user = await getUserByEmail(input.email);
      if (!user) {
        throw new UserError("Email does not exist");
      }

      // check if password matches
      const matchPassword = await bcrypt.compare(
        input.password,
        user.dataValues.password
      );

      if (!matchPassword) {
        throw new UserError("Incorrect Password");
      }

      // make and return tokens
      const accessToken = createAccessToken(user);

      sendRefreshToken(res, createRefreshToken(user));

      return {
        userId: user.id,
        email: user.email,
        name: user.name,
        accessToken: accessToken,
      };
    },
    logout: async (parent, args, { res }) => {
      sendRefreshToken(res, "");
    },
    revokeRefreshTokens: async (parent, args, { payload, res }, info) => {
      try {
        incrementRefreshTokenVersion(payload.userId);

        sendRefreshToken("");

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
};

module.exports = resolvers;
