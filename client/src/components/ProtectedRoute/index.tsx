import { FC, Fragment, useState } from "react";
import { Route, RouteProps, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { useEffect } from "react";
import { getUser } from "src/utils/auth";
import { setUser } from "src/store/user/user.slice";

const ProtectedRoute: FC<RouteProps> = ({ ...rest }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [authenticated, setAuthenticated] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fn = async () => {
      console.log("user state: ", user);

      if (!user.id) {
        const user = await getUser();

        if (!user) {
          setAuthenticated(false);
          history.push("/login");
        }

        // update redux with user data
        dispatch(
          setUser({
            email: user!.email,
            id: user!.id,
            name: user!.name,
          })
        );
        setAuthenticated(true);
      }
      setAuthenticated(true);
    };
    fn();
  }, [dispatch, history, user, location]);

  return (
    <Fragment>
      {authenticated ? <Route {...rest} /> : <p>authenticating</p>}
    </Fragment>
  );
};

export default ProtectedRoute;
