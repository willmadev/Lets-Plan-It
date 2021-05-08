const { ApolloError } = require("apollo-server-errors");

class UserError extends ApolloError {
  constructor(message) {
    super(message);

    Object.defineProperty(this, "name", { value: "UserError" });
  }
}

module.exports = { UserError };
