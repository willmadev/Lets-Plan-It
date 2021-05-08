import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import { MyContext } from "../helpers/types";
import { ACCESS_TOKEN_SECRET } from "../helpers/env";
import { User } from "../entity/User";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("No authorization header");
  }

  let payload: any;
  try {
    const token = authorization.split(" ")[1];
    payload = verify(token, ACCESS_TOKEN_SECRET);
    console.log(payload);
  } catch (err) {
    console.error(err);
    throw new Error("Not authenticated");
  }

  try {
    const user = await User.findOne(payload.userId);
    if (!user) {
      throw new Error();
    }
    context.user = user;
  } catch (err) {
    console.log(err);
    throw new Error("User not found");
  }
  return next();
};
