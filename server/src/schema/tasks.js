const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Time
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    course: String
    due: String
  }

  input CreateTaskInput {
    title: String!
    course: String
    due: DateTime
  }

  type CreateTaskPayload {
    errors: [String]
    task: Task
  }
`;

module.exports = typeDefs;
