import { FetchResult } from "@apollo/client";
import { FC, useState } from "react";
import {
  CreateTaskMutation,
  Task,
  useGetTasksQuery,
  useCreateTaskMutation,
  GetTasksDocument,
} from "src/generated/graphql";
import { formatDate } from "src/helpers/formatDate";
// import { sortByDueDate } from "src/helpers/sortByDueDate";
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

  const [createTask] = useCreateTaskMutation({
    // update cache to add newly created task
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      if (data.createTask.__typename === "MutateTaskError") {
        return;
      }

      // const { getTasks } = cache.readQuery({
      //   query: GetTasksDocument,
      // }) ?? { getTask: null };

      // const newCache = [...getTasks, data?.createTask];

      // add completed field
      let completedFieldData = data.createTask as Task;
      completedFieldData.completed = true;
      cache.writeQuery({
        query: GetTasksDocument,
        data: { getTasks: [completedFieldData] },
      });

      console.log("new cache", completedFieldData);
    },
  });
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
        // refetchQueries: [{ query: GetTasksDocument }],
      });
      console.log("create task response:", response);
    } catch (err) {
      console.error("create task error:", err);
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
      <p className={styles.taskItem_course}>{task.id}</p>
      <p className={styles.taskItem_due}>
        {formatDate(new Date(parseInt(task.due))) ?? task.due}
      </p>
    </div>
  );
};

const TaskList: FC = () => {
  const { loading, error, data, fetchMore } = useGetTasksQuery({
    variables: {
      limit: 10,
      filter: {
        completed: false,
      },
    },
    fetchPolicy: "cache-and-network",
  });
  console.log("tasklist data:", data);

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  if (error) {
    console.error("tasklist error:", error);
  }

  if (!data) {
    return (
      <div>
        <p>no tasks found</p>
      </div>
    );
  }
  const loadMoreActive = !!data.getTasks[data.getTasks.length - 1];

  return (
    <div className={styles.taskList}>
      {data.getTasks.map((task) => {
        return <TaskItem task={task} key={task.id} />;
      })}
      {loadMoreActive ? (
        <button
          onClick={async () =>
            fetchMore({
              variables: {
                cursor: data.getTasks[data.getTasks.length - 1].id,
                limit: 10,
              },
            })
          }
        >
          Load More
        </button>
      ) : (
        <p>Enter a task above</p>
      )}
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
