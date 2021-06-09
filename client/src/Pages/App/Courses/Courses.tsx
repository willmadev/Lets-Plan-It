import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./courses.module.css";
import { Course, useCoursesQuery } from "src/generated/graphql";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <div className={styles.courseCard_container}>
      <div className={styles.courseCard_banner} />
      <h2 className={styles.courseCard_title}>{course.courseName}</h2>
      <div className={styles.courseCard_notificationContainer}>
        <div className={styles.courseCard_notificationWrapper}>
          <FontAwesomeIcon
            icon="check-circle"
            className={styles.courseCard_notificationIcon}
          />
          <p>{course.taskCount}</p>
        </div>
        <div className={styles.courseCard_notificationWrapper}>
          <FontAwesomeIcon
            icon="info-circle"
            className={styles.courseCard_notificationIcon}
          />
          <p>99</p>
        </div>
      </div>
    </div>
  );
};

const CourseContainer: FC = () => {
  const { data, loading, error } = useCoursesQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  if (!data || !data.getCourses || data.getCourses.length === 0) {
    return <p>No courses found</p>;
  }

  return (
    <div className={styles.coursesContainer}>
      {data?.getCourses?.map((course: Course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  );
};

export const Courses: FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1>Courses</h1>
      <CourseContainer />
    </div>
  );
};
