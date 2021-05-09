import React, { useState } from "react";
import DatePicker from "../DatePicker";

import styles from "./tasklist.module.css";

const NewTask: React.FC = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    date: new Date(),
  });

  const handleTaskInputChange = (field: string, value: any) => {
    setNewTask({ ...newTask, [field]: value });
  };

  return (
    <form
      name="new-task"
      className={styles.newTask_container}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        name="title"
        className={styles.newTask_titleInput}
        placeholder="Create new task"
        onChange={(e) => {
          console.log(e);
          handleTaskInputChange(e.target.name, e.target.value);
        }}
        value={newTask.title}
      />
      <DatePicker
        className={styles.newTask_datePicker}
        date={newTask.date}
        onChange={(date: Date) => {
          handleTaskInputChange("date", date);
          console.log("Date change");
        }}
      />
      <input
        name="submit"
        className={styles.newTask_submit}
        type="submit"
        value="Add Task"
      />
    </form>
  );
};

const TaskItem: React.FC = () => {
  return (
    <div className={styles.taskItem_container}>
      <div className={styles.taskItem_check}>O</div>
      <p className={styles.taskItem_title}>Task</p>
      <p className={styles.taskItem_course}>Course</p>
      <p className={styles.taskItem_due}>01/01/2021</p>
    </div>
  );
};

const TaskList: React.FC = () => {
  return (
    <div className={styles.moduleWrapper}>
      {/* New Task */}
      <NewTask />
      {/* Task List */}
      <div className={styles.taskList}>
        <TaskItem />
      </div>
    </div>
  );
};

export default TaskList;
