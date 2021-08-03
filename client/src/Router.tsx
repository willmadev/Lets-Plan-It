import { Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";

import App from "./pages/App";
import TestAuth from "./pages/TestAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GoogleCallback from "./pages/GoogleCallback";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/googlecb" component={GoogleCallback} />
      <Route path="/app" component={App} />
      <Route exact path="/testAuth" component={TestAuth} />
    </Switch>
  );
};

export default Router;
