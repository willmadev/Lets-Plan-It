import { FetchResult } from "@apollo/client";
import { FC, useState } from "react";
import {
  CreateTaskMutation,
  Task,
  useGetTasksQuery,
  useCreateTaskMutation,
  GetTasksDocument,
  // GetTasksQuery,
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

  const [createTask] = useCreateTaskMutation({
    // update: (cache, {data}) => {
    //   cache.modify({
    //     fields:{
    //       getTasks: (existingTasks) => {
    //         const newTaskRef = cache.writeFragment({
    //           data: data?.createTask,
    //           fragment:
    //         })
    //       }
    //     }
    //   })
    // },
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
        refetchQueries: [{ query: GetTasksDocument }],
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
      <p className={styles.taskItem_course}>{task.id}</p>
      <p className={styles.taskItem_due}>
        {formatDate(new Date(parseInt(task.due)))}
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
  });
  console.log(data);

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
      {data.getTasks.map((task) => {
        return <TaskItem task={task} key={task.id} />;
      })}
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
