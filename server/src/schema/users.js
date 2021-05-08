const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    password: String!
    tasks: [Task]
  }

  type UserAuthPayload {
    userId: Int!
    email: String!
    name: String!
    accessToken: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
