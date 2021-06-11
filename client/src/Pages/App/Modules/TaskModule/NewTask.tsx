import { FetchResult } from "@apollo/client";
import React, { FC, useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  GetTasksDocument,
  CreateTaskMutation,
  useGetCoursesQuery,
  Course,
} from "src/generated/graphql";
import DatePicker from "../DatePicker";
import { Dropdown } from "../Dropdown";

import styles from "./newTask.module.css";

interface CoursePickerProps {
  value: string;
  onChange: Function;
}

const CoursePicker: FC<CoursePickerProps> = ({ value, onChange }) => {
  const {
    error: courseError,
    data: courseData,
    loading,
  } = useGetCoursesQuery();

  useEffect(() => {
    console.log("use effect", courseData);
    if (courseData?.getCourses) {
      onChange(courseData.getCourses[0]);
    }
  }, []);

  if (courseError) {
    console.error(courseError);
    return <div>error</div>;
  }

  if (!courseData || !courseData.getCourses) {
    return <div>no courses</div>;
  }

  if (loading) {
    return <div>loading</div>;
  }

  const selectCourse = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    course: Course
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("course");
    onChange(course);
  };

  return (
    <Dropdown className={styles.coursePicker} value={value}>
      <div className={styles.coursePickerContainer}>
        {courseData.getCourses.map((course) => {
          return (
            <button
              className={styles.coursePickerButton}
              type="button"
              key={course.id}
              onClick={(e) => selectCourse(e, course)}
            >
              {course.courseName}
            </button>
          );
        })}
      </div>
    </Dropdown>
  );
};

interface NewTaskProps {
  course?: Course;
}

export const NewTask: FC<NewTaskProps> = ({ course }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    date: new Date(),
    course: {
      id: "",
      courseName: "",
    },
  });

  useEffect(() => {
    if (course) {
      setNewTask({
        ...newTask,
        course: { id: course.id, courseName: course.courseName },
      });
    }
  }, []);

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
      let completedFieldData = data.createTask;
      cache.writeQuery({
        query: GetTasksDocument,
        data: { getTasks: [completedFieldData] },
      });

      console.log("new cache", completedFieldData);
    },
  });

  const submitTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting new task");

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
            course: newTask.course.id,
            due: newTask.date,
            title: newTask.title,
          },
        },
        // refetchQueries: [{ query: GetTasksDocument }],
      });
      console.log("create task response:", response);
      // setNewTask({
      //   date: new Date(),
      //   title: "",
      //   course: ,
      // });
    } catch (err) {
      console.error("create task error:", err);
    }
  };

  return (
    <form
      name="new-task"
      className={styles.container}
      onSubmit={(e) => submitTask(e)}
    >
      <input
        name="title"
        className={styles.titleInput}
        placeholder="Create new task"
        onChange={(e) => {
          handleTaskInputChange(e.target.name, e.target.value);
        }}
        value={newTask.title}
      />
      <div className={styles.selectorContainer}>
        <DatePicker
          className={styles.datePicker}
          date={newTask.date}
          onChange={(date: Date) => {
            handleTaskInputChange("date", date);
          }}
        />
        {course ? null : (
          <CoursePicker
            value={newTask.course.courseName}
            onChange={(course: Course) => {
              console.log(course);
              handleTaskInputChange("course", course);
            }}
          />
        )}
      </div>
      <input
        name="submit"
        className={styles.submit}
        type="submit"
        value="Add Task"
      />
    </form>
  );
};
