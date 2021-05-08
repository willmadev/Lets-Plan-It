import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { verify } from "jsonwebtoken";
import { HelloResolver } from "./resolvers/hello";
import { TaskResolver } from "./resolvers/task";
import { UserResolver } from "./resolvers/user";
import { User } from "./entity/User";
import { REFRESH_TOKEN_SECRET, PORT } from "./helpers/env";
import { createAccessToken, sendRefreshToken } from "./helpers/auth";

const main = async () => {
  await createConnection();

  console.log(await User.find());

  const app = express();

  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  app.post("/refresh_token", async (req, res) => {
    const refreshToken: string = req.cookies.rtk;
    if (!refreshToken) {
      return res.status(400).send({ success: false, accessToken: "" });
    }

    let payload: any;
    try {
      payload = verify(refreshToken, REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.error(err);
      return res.status(400).send({ success: false, accessToken: "" });
    }

    const user = await User.findOne({ id: payload.userId });
    if (!user) {
      return res.status(400).send({ success: false, accessToken: "" });
    }

    if (user.refreshTokenVersion !== payload.version) {
      return res.status(400).send({ success: false, accessToken: "" });
    }

    sendRefreshToken(res, user);

    return res
      .status(200)
      .send({ success: true, accessToken: createAccessToken(user) });
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, TaskResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
};

main();
