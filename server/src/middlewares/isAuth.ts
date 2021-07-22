import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/User";
import config from "../config";
import { MyContext } from "../utils/types";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("No authorization header");
  }

  let payload: any;
  try {
    const token = authorization.split(" ")[1];
    payload = verify(token, config.ACCESS_TOKEN_SECRET);
    console.log(payload);
  } catch (err) {
    console.error(err);
    throw new Error("Not authenticated");
  }

  const user = await User.findOne(payload.userId);
  if (!user) {
    throw new Error("Authentication Error");
  }

  context.user = user;

  return next();
};
