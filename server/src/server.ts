import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { TaskResolver } from "./resolvers/task";
import { UserResolver } from "./resolvers/user";
import { User } from "./entity/User";
const main = async () => {
  await createConnection();

  console.log(await User.find());

  const app = express();

  app.get("/", (_, res) => {
    res.send("hello world");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, TaskResolver, UserResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(`Server started on localhost:${process.env.PORT}`);
  });
};

main();
