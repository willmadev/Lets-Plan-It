const jwt = require("jsonwebtoken");

const isAuth = async (resolve, root, args, context, info) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("No authorization header");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload;
    console.log(payload);
  } catch (err) {
    console.error(err);
    throw new Error("Not authenticated");
  }

  return await resolve(root, args, context, info);
};

const schema = {
  Query: {
    task: isAuth,
    allTasks: isAuth,
    testAuth: isAuth,
  },
  Mutation: {
    logout: isAuth,
    revokeRefreshTokens: isAuth,
    createTask: isAuth,
  },
};

module.exports = schema;
