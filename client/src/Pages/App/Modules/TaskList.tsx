import React, { useState } from "react";

import styles from "./tasklist.module.css";

const TaskList: React.FC = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    date: new Date(),
  });

  const handleTaskInputChange = (field: string, value: any) => {
    setNewTask({ ...newTask, [field]: value });
  };

  // interface TimeInputTypes {
  //   value: any | null;
  //   onChange: any | null;
  // }

  // const TimeInput = ({ value, onChange }: TimeInputTypes) => (
  //   <input value={value} onChange={(e) => onChange(e.target.value)} />
  // );
  return (
    <div className={styles.moduleWrapper}>
      {/* New Task */}
      <form name="new-task" className={styles.newTaskContainer}>
        <input
          name="title"
          className={styles.taskTitleInput}
          placeholder="Create new task"
          onChange={(e) => handleTaskInputChange(e.target.name, e.target.value)}
          value={newTask.title}
        />
        <div className={styles.datePicker}></div>
      </form>
      {/* Task List */}
      <div className={styles.taskList}>
        <div className={styles.taskItemContainer}>
          <div className={styles.taskCheck}>O</div>
          <p className={styles.taskTitle}>Task</p>
          <p className={styles.taskCourse}>Course</p>
          <p className={styles.taskDueDate}>01/01/2021</p>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
