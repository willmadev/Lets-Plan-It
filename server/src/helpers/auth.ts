import { User } from "src/entity/User";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env";
import { Response } from "express";

export const createAccessToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
};

const createRefreshToken = (user: User) => {
  return jwt.sign(
    {
      userId: user.id,
      version: user.refreshTokenVersion,
    },
    REFRESH_TOKEN_SECRET,
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
