import { Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Courses from "./Courses";

import styles from "./app.module.css";

const Router: React.FC = () => {
  let { url, path } = useRouteMatch();
  return (
    <div className={styles.pageWrapper}>
      <Sidebar url={url} />
      <Switch>
        <Route exact path={path} component={Dashboard} />
        <Route path={`${path}/courses`} component={Courses} />
      </Switch>
    </div>
  );
};

export default Router;
