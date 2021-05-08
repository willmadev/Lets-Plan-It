module.exports = function (sequelize, DataTypes) {
  const Task = sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        validate: {
          isInt: true,
          notNull: true,
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: [1, 255],
        },
      },
      course: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          len: [1, 255],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      due: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    },
    {
      tableName: "tasks",
    }
  );

  return Task;
};

const createTask = async (taskObj) => {
  try {
    const newTask = await Task.create(taskObj, { returning: true });
    console.log(newTask.toJSON());
    return newTask;
  } catch (err) {
    console.error(err);
  }
};

const getAllTasks = async (userId) => {
  try {
    const tasks = await Task.findAll();
    console.log(tasks);
    return tasks;
  } catch (err) {
    console.error(err);
  }
};

const getSingleTask = async (taskId) => {
  try {
    const task = await Task.findByPk(taskId);
    console.log(task);
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
    console.log(task);
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

// module.exports = {
//   createTask,
//   getAllTasks,
//   getSingleTask,
//   updateTask,
//   deleteTask,
// };
