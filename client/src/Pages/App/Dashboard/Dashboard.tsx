import styles from "./dashboard.module.css";
import { TaskModule } from "../Modules";

const Dashboard: React.FC = () => {
  console.log("dashboard");
  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.elementContainer} ${styles.taskContainer}`}>
        <TaskModule />
      </div>
      <div className={`${styles.elementContainer} ${styles.scheduleContainer}`}>
        <p>schedule</p>
      </div>
      <div
        className={`${styles.elementContainer} ${styles.announcementContainer}`}
      >
        <p>announcements</p>
      </div>
    </div>
  );
};
export default Dashboard;
