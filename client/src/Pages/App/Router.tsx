import { BrowserRouter, Route, Switch, useRouteMatch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";

import styles from "./app.module.css";

const Router: React.FC = () => {
  let { url, path } = useRouteMatch();
  return (
    <BrowserRouter>
      <div className={styles.pageWrapper}>
        <Sidebar url={url} />
        <Switch>
          <Route exact path={path} component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default Router;
