import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";

import { HelloResolver } from "./resolvers/hello";
import { TaskResolver } from "./resolvers/task";
import { UserResolver } from "./resolvers/user";
import { User } from "./entity/User";
import { REFRESH_TOKEN_SECRET } from "./utils/env";
import { createAccessToken } from "./utils/auth";
import { CourseResolver } from "./resolvers/course";

const main = async () => {
  dotenv.config();

  await createConnection();

  const app = express();

  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.rtk;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, error: "No refresh token" });
    }

    let payload: any;
    try {
      payload = verify(token, REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.error(err);
      return res
        .status(400)
        .json({ success: false, error: "Refresh token error" });
    }
    console.log(payload);

    const user = await User.findOne(payload.userId);

    if (!user) {
      return res.status(500).json({ success: false, error: "User not found" });
    }

    if (payload.version !== user.refreshTokenVersion) {
      return res
        .status(400)
        .json({ success: false, error: "Refresh token invalid" });
    }
    return res
      .status(200)
      .json({ success: true, accessToken: createAccessToken(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, TaskResolver, UserResolver, CourseResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: corsOptions });

  app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
  });
};

main();
