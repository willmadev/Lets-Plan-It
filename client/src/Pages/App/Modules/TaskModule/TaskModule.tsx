import { FC, useState } from "react";
import {
  Course,
  Task,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "src/generated/graphql";
import { formatDate } from "src/utils/formatDate";
import { NewTask } from "./NewTask";

import styles from "./taskModule.module.css";

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const [completed, setCompleted] = useState(false);
  const [updateTask] = useUpdateTaskMutation();
  const completeTask = async () => {
    let response;
    try {
      response = await updateTask({
        variables: {
          input: {
            id: task.id,
            completed: true,
          },
        },
      });
      console.log("complete task response:", response);
    } catch (err) {
      console.error("complete task error:", err);
    }
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
      <p className={styles.taskItem_course}>{task.course.courseName}</p>
      <p className={styles.taskItem_due}>
        {formatDate(new Date(parseInt(task.due))) ?? task.due}
      </p>
    </div>
  );
};

interface TaskListProps {
  course?: Course;
}

const TaskList: FC<TaskListProps> = ({ course }) => {
  const { error, data, fetchMore } = useGetTasksQuery({
    variables: {
      limit: 10,
      filter: {
        completed: false,
        course: course?.id,
      },
    },
    fetchPolicy: "cache-and-network",
  });
  console.log("tasklist data:", data);

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
        if (!task.completed) {
          return <TaskItem task={task} key={task.id} />;
        } else {
          return null;
        }
      })}
      {loadMoreActive ? (
        <button
          onClick={async () =>
            fetchMore({
              variables: {
                cursor: data.getTasks[data.getTasks.length - 1].id,
                limit: 10,
                filter: {
                  completed: false,
                },
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

interface TaskModuleProps {
  course?: Course;
}

const TaskModule: FC<TaskModuleProps> = ({ course }) => {
  return (
    <div className={styles.moduleWrapper}>
      {/* New Task */}
      <NewTask course={course} />
      {/* Task List */}
      <TaskList course={course} />
    </div>
  );
};

export default TaskModule;
