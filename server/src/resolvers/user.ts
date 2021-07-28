import { User } from "../entity/User";
import {
  Arg,
  createUnionType,
  Ctx,
  Field,
  ID,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { createAccessToken, sendRefreshToken } from "../utils/auth";
import config from "../config";
import { MyContext } from "../utils/types";
import { isAuth } from "../middlewares/isAuth";
import {
  getAuthPayload,
  getAuthUrl,
  scopes,
  setGoogleTokens,
} from "../utils/googelApi";

@InputType()
class RegisterInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

const AuthResult = createUnionType({
  name: "AuthResult",
  types: () => [AuthPayload, AuthError] as const,
});

@ObjectType()
class AuthPayload {
  constructor({ id, email, name, accessToken }: AuthPayload) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.accessToken = accessToken;
  }

  @Field(() => ID)
  id!: Number;

  @Field()
  email!: String;

  @Field()
  name!: String;

  @Field()
  accessToken!: String;
}

@ObjectType()
class AuthError {
  constructor({ field, message }: AuthError) {
    this.field = field;
    this.message = message;
  }
  @Field()
  field: "Email" | "Password" | "Name" | "Google";

  @Field()
  message: String;
}

@InputType()
class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
class GoogleAuthInput {
  @Field()
  state: string;

  @Field()
  code: string;
}

@Resolver()
export class UserResolver {
  @UseMiddleware(isAuth)
  @Query(() => User)
  async getUser(@Ctx() { user }: MyContext) {
    return user;
  }

  @Mutation(() => AuthResult)
  async register(
    @Ctx() { res }: MyContext,
    @Arg("input") input: RegisterInput
  ) {
    // validate input
    console.log(input);

    // check if exists
    try {
      const existingUser = await User.findOne({ email: input.email });
      console.log(existingUser);
      if (existingUser) {
        const error = new AuthError({
          field: "Email",
          message: "Email already exists.",
        });
        return error;
      }
    } catch (err) {
      console.error(err);
      throw new Error("Database Lookup Error");
    }

    // hash password
    const hashedPassword = await hash(input.password, config.SALT_ROUNDS ?? 10);

    // save user
    const newUser = User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    await User.insert(newUser);

    // jwt token
    const accessToken = createAccessToken(newUser);
    sendRefreshToken(res, newUser);

    // Return payload
    const payload = new AuthPayload({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      accessToken: accessToken,
    });

    console.log(typeof payload);
    return payload;
  }

  @Mutation(() => AuthResult)
  async login(@Ctx() { res }: MyContext, @Arg("input") input: LoginInput) {
    // validate input
    console.log(input);

    // get from database
    const user = await User.findOne({ email: input.email });
    if (!user) {
      return new AuthError({
        field: "Email",
        message: "No account found.",
      });
    }

    if (!user.password) {
      return new AuthError({
        field: "Password",
        message: "Please sign in with google.",
      });
    }

    // check password
    if (!(await compare(input.password, user.password))) {
      return new AuthError({
        field: "Password",
        message: "Incorrect Password.",
      });
    }

    // jwt token
    const accessToken = createAccessToken(user);

    // Refresh token
    sendRefreshToken(res, user);

    // return
    return new AuthPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: accessToken,
    });
  }

  // #region Google signin
  @Query(() => String)
  getGoogleAuthUrl() {
    return getAuthUrl([scopes.email, scopes.profile]);
  }

  @Mutation(() => AuthResult)
  async googleLogin(
    @Ctx() { res }: MyContext,
    @Arg("input") input: GoogleAuthInput
  ) {
    // TODO: Check state
    console.log(input.state);

    const tokens = await setGoogleTokens(input.code);
    if (!tokens || !tokens.id_token) {
      return new AuthError({
        field: "Google",
        message: "Token error",
      });
    }

    const payload = await getAuthPayload(tokens.id_token);
    if (!payload) {
      return new AuthError({
        field: "Google",
        message: "User payload error",
      });
    }

    // get from database
    const user = await User.findOne({ email: payload.email });
    if (!user) {
      return new AuthError({
        field: "Email",
        message: "No account found.",
      });
    }

    const accessToken = createAccessToken(user);
    sendRefreshToken(res, user);

    // return
    return new AuthPayload({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken,
    });
  }

  @Mutation(() => AuthResult)
  async googleRegister(
    @Ctx() { res }: MyContext,
    @Arg("input") input: GoogleAuthInput
  ) {
    // TODO: Check state
    console.log(input);

    const tokens = await setGoogleTokens(input.code);
    if (!tokens || !tokens.id_token) {
      return new AuthError({
        field: "Google",
        message: "Token error",
      });
    }

    const payload = await getAuthPayload(tokens.id_token);
    if (!payload) {
      return new AuthError({
        field: "Google",
        message: "User payload error",
      });
    }

    // get from database
    const user = await User.findOne({ email: payload.email });
    if (user) {
      return new AuthError({
        field: "Email",
        message: "User already exists.",
      });
    }

    const newUser = User.create({
      name: payload.name,
      email: payload.email,
    });

    await User.insert(newUser);

    const accessToken = createAccessToken(newUser);
    sendRefreshToken(res, newUser);

    // return
    return new AuthPayload({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      accessToken,
    });
  }
}
