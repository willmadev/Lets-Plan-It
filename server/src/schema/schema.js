const { gql, makeExecutableSchema } = require("apollo-server-express");
const { merge } = require("lodash");
const { applyMiddleware } = require("graphql-middleware");

const Tasks = require("./tasks");
const Users = require("./users");

const tasksResolvers = require("../resolvers/tasks");
const usersResolvers = require("../resolvers/users");

const isAuth = require("../middlewares/isAuth");

const Query = gql`
  type Query {
    task(taskId: ID!): Task
    allTasks: [Task]
    user: User
    test: String!
    testAuth: String
  }

  type Mutation {
    register(input: RegisterInput!): UserAuthPayload
    login(input: LoginInput!): UserAuthPayload
    logout: Boolean
    revokeRefreshTokens: Boolean
    createTask(input: CreateTaskInput!): CreateTaskPayload
  }
`;

const resolvers = {
  Query: {
    test: () => "test hehe",
    testAuth: () => "user authorized",
  },
};

const schema = makeExecutableSchema({
  typeDefs: [Query, Tasks, Users],
  resolvers: merge(resolvers, tasksResolvers, usersResolvers),
});

const schemaWithMiddleware = applyMiddleware(schema, isAuth);
module.exports = schemaWithMiddleware;
