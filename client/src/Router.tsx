import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";

// import App from "./Pages/App";
import App from "./pages/App";
import TestAuth from "./Pages/TestAuth";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
