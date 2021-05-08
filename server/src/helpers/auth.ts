import { User } from "src/entity/User";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./env";

const createAccessToken = (user: User) => {
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

// const sendRefreshToken = (res, token) => {
//   res.cookie("rtk", token, {
//     httpOnly: true,
//     path: "/refresh_token",
//   });
// };

export { createAccessToken, createRefreshToken };
