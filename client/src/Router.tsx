import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";

import App from "./Pages/App";
import TestAuth from "./Pages/TestAuth";
import { Login, Register } from "./Pages/Authentication";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/app" component={App} />
        <Route exact path="/testAuth" component={TestAuth} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
