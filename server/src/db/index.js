const dotenv = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    dialect: "postgres",
    host: process.env.PGHOST,
    port: process.env.PGPORT,
  }
);

console.info("SETUP - Connecting database...");

const Task = require("./tasks")(sequelize, DataTypes);
const User = require("./users")(sequelize, DataTypes);

User.hasMany(Task);
Task.belongsTo(User);

sequelize
  .authenticate()
  .then(() => console.info("INFO - Database connected."))
  .catch((err) =>
    console.error("ERROR - Unable to connect to the database:", err)
  );

try {
  // sequelize.sync({ force: true });
  sequelize.sync();
} catch (err) {
  console.error("ERROR - Sync error:", err);
}

module.exports = {
  Task,
  User,
};
