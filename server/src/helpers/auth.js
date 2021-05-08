require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
};

const createRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      version: user.refreshTokenVersion,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

const sendRefreshToken = (res, token) => {
  res.cookie("rtk", token, {
    httpOnly: true,
    path: "/refresh_token",
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
};
