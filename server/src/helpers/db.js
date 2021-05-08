const { Task } = require("../db");
const { User } = require("../db");

const createTask = async (taskObj) => {
  try {
    const newTask = await Task.create(taskObj, { returning: true });
    console.log(newTask);
    return newTask;
  } catch (err) {
    console.error(err);
  }
};

const getAllTasks = async (user) => {
  try {
    const tasks = await user.getTasks();
    return tasks;
  } catch (err) {
    console.error(err);
  }
};

const getSingleTask = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    return task;
  } catch (err) {
    console.error(err);
  }
};

const updateTask = async (taskId, taskObj) => {
  try {
    const task = await Task.update(taskObj, {
      where: {
        taskId,
      },
    });
    return task;
  } catch (err) {
    console.error(err);
  }
};

const deleteTask = async (taskId) => {
  try {
    await Task.destroy({
      where: {
        taskId,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (userObj) => {
  try {
    const newUser = User.create(userObj, { returning: true });
    return newUser;
  } catch (err) {
    console.error(err);
    return;
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (err) {
    console.error(err);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email: email } });
    return user;
  } catch (err) {
    console.error(err);
  }
};

const incrementRefreshTokenVersion = async (id) => {
  try {
    const user = await User.increment("refreshTokenVersion", {
      where: { id },
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  createUser,
  getUser,
  getUserByEmail,
  incrementRefreshTokenVersion,
};
