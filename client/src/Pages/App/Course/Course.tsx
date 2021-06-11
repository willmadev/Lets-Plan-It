import { FC } from "react";
import { useParams } from "react-router";
import { useGetSingleCourseQuery } from "src/generated/graphql";
import { TaskModule } from "../Modules";
import { CourseRouteParams } from "../Router";

import styles from "./course.module.css";

export const Course: FC = () => {
  const { courseId } = useParams<CourseRouteParams>();
  const { loading, data } = useGetSingleCourseQuery({
    variables: { id: courseId },
  });
  if (loading) {
    return <p>Loading course...</p>;
  }
  if (!data || !data.getSingleCourse) {
    return <p>Course not found</p>;
  }
  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.elementContainer} ${styles.taskContainer}`}>
        <TaskModule course={data.getSingleCourse} />
      </div>
    </div>
  );
};
