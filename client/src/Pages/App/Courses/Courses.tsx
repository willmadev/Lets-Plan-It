import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./courses.module.css";

const CourseCard: FC = () => {
  return (
    <div className={styles.courseCard_container}>
      <div className={styles.courseCard_banner} />
      <h2 className={styles.courseCard_title}>AP Calculus AB</h2>
      <div className={styles.courseCard_notificationContainer}>
        <div className={styles.courseCard_notificationWrapper}>
          <FontAwesomeIcon
            icon="info-circle"
            className={styles.courseCard_notificationIcon}
          />
          <p>99</p>
        </div>
        <div className={styles.courseCard_notificationWrapper}>
          <FontAwesomeIcon
            icon="check-circle"
            className={styles.courseCard_notificationIcon}
          />
          <p>3</p>
        </div>
      </div>
    </div>
  );
};

export const Courses: FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <h1>Courses</h1>
      <div className={styles.coursesContainer}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};
