import { FC, Fragment } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: FC<RouteProps> = (props) => {
  const isAuthenticated = true;
  return (
    <Fragment>
      {isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />}
    </Fragment>
  );
};

export default ProtectedRoute;
