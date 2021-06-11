import { Link } from "react-router-dom";

import styles from "./sidebar.module.css";

const Sidebar: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className={styles.sidebarContainer}>
      <h1>Let's Plan It</h1>
      <div className={styles.menuItem}>
        <Link to={url}>Dashboard</Link>
        <br />
        <Link to={`${url}/courses`}>Courses</Link>
      </div>
    </div>
  );
};

export default Sidebar;
