import { User } from "src/entity/User";
import jwt from "jsonwebtoken";
import config from "../config";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    config.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
};

const createRefreshToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      version: user.refreshTokenVersion,
    },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

export const sendRefreshToken = (res: Response, user: User) => {
  const token = createRefreshToken(user);
  res.cookie("rtk", token, {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};
