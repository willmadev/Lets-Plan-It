import { FetchResult } from "@apollo/client";
import { FC, useState } from "react";
import {
  CreateTaskMutation,
  Task,
  useAllTasksQuery,
  useCreateTaskMutation,
  AllTasksDocument,
} from "src/generated/graphql";
import { formatDate } from "src/helpers/formatDate";
import DatePicker from "../DatePicker";

import styles from "./taskModule.module.css";

const NewTask: FC = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    date: new Date(),
  });

  const handleTaskInputChange = (field: string, value: any) => {
    setNewTask({ ...newTask, [field]: value });
  };

  const [createTask] = useCreateTaskMutation();
  const submitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // input validation

    let response: FetchResult<
      CreateTaskMutation,
      Record<string, any>,
      Record<string, any>
    >;
    try {
      response = await createTask({
        variables: {
          input: {
            course: "test course",
            due: newTask.date,
            title: newTask.title,
          },
        },
        refetchQueries: [{ query: AllTasksDocument }],
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      name="new-task"
      className={styles.newTask_container}
      onSubmit={(e) => submitTask(e)}
    >
      <input
        name="title"
        className={styles.newTask_titleInput}
        placeholder="Create new task"
        onChange={(e) => {
          handleTaskInputChange(e.target.name, e.target.value);
        }}
        value={newTask.title}
      />
      <DatePicker
        className={styles.newTask_datePicker}
        date={newTask.date}
        onChange={(date: Date) => {
          handleTaskInputChange("date", date);
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

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const [completed, setCompleted] = useState(false);
  const completeTask = () => {
    setCompleted(true);
  };
  return (
    <div className={styles.taskItem_container}>
      <input
        type="checkbox"
        className={styles.taskItem_check}
        defaultChecked={completed}
        onChange={(e) => completeTask()}
      />
      <p className={styles.taskItem_title}>{task.title}</p>
      <p className={styles.taskItem_course}>{task.course}</p>
      <p className={styles.taskItem_due}>
        {formatDate(new Date(parseInt(task.due)))}
      </p>
    </div>
  );
};

const TaskList: FC = () => {
  const { loading, error, data } = useAllTasksQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    console.error(error);
  }

  if (!data) {
    return <div>no tasks found</div>;
  }

  return (
    <div className={styles.taskList}>
      {data.allTasks.map((task) => {
        return <TaskItem task={task} key={task.id} />;
      })}
    </div>
  );
};

const TaskModule: FC = () => {
  return (
    <div className={styles.moduleWrapper}>
      {/* New Task */}
      <NewTask />
      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default TaskModule;
