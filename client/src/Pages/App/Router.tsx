import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Courses from "./Courses";
import Course from "./Course";

import styles from "./app.module.css";

export interface CourseRouteParams {
  courseId: string;
}

const Router: React.FC = () => {
  const { url, path } = useRouteMatch();
  return (
    <div className={styles.pageWrapper}>
      <Sidebar url={url} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route exact path={`${path}/courses`} component={Courses} />
        <Route exact path={`${path}/courses/:courseId`} component={Course} />
      </Switch>
    </div>
  );
};

export default Router;
