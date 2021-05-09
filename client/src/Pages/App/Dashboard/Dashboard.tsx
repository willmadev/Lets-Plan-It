import styles from "./dashboard.module.css";
import { TaskList } from "../Modules/index";

const Dashboard: React.FC = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={`${styles.elementContainer} ${styles.taskContainer}`}>
        <TaskList />
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
