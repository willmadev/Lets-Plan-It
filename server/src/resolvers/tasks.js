const {
  GraphQLDate,
  GraphQLDateTime,
  GraphQLTime,
} = require("graphql-iso-date");

const {
  getSingleTask,
  getAllTasks,
  createTask,
  getUser,
} = require("../helpers/db");

const resolvers = {
  Date: GraphQLDate,
  Time: GraphQLTime,
  DateTime: GraphQLDateTime,

  Query: {
    task: async (parent, args, context, info) => {
      const task = await getSingleTask(args.taskId);
      return task;
    },
    allTasks: async (_, __, { payload }) => {
      if (!payload.userId) {
        return { errors: "Authorization error, please try again." };
      }
      const user = await getUser(payload.userId);
      if (!user) {
        return { errors: "User not found" };
      }

      const tasks = await getAllTasks(user);
      return tasks;
    },
  },

  Mutation: {
    createTask: async (_, { input }, { payload }) => {
      // TODO: validate input

      if (!payload.userId) {
        console.log(payload);
        return { errors: "Authorization error, please try again." };
      }

      input.userId = payload.userId;
      console.log(input);
      const task = await createTask(input);
      console.log(task);
      return { task };
    },
  },
};

module.exports = resolvers;
