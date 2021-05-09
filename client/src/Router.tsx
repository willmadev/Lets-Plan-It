import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./Pages/Landing";
// import Login from "./Login";
// import Register from "./Register";
import App from "./Pages/App";
import TestAuth from "./TestAuth";
import { Login, Register } from "./Pages/Authentication";
import DatePicker from "./Pages/App/Modules/DatePicker";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/app" component={App} />
        <Route exact path="/testAuth" component={TestAuth} />
        <Route exact path="/testdate" component={DatePicker} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
