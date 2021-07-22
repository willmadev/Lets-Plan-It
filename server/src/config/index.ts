import devConfig from "./config.dev";
import prodConfig from "./config.prod";

import dotenv from "dotenv";
dotenv.config();

let config = {
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS!),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  BASE_URL: "",
  PORT: "",
};

if (process.env.NODE_ENV === "development") {
  config = { ...config, ...devConfig };
} else {
  config = { ...config, ...prodConfig };
}

export default config;
