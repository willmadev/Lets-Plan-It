import { useEffect } from "react";
import { useState } from "react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useGoogleAuthMutation } from "src/generated/graphql";
import { setUser } from "src/store/user/user.slice";
import { setAccessToken } from "src/utils/auth";

const GoogleCallback: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [registerState, register] = useGoogleAuthMutation();
  const [error, setError] = useState("");

  const [params, setParams] = useState({ code: "", state: "" });

  // get code and state from url params
  useEffect(() => {
    const query = location.search.substr(1);
    let result = { code: "", state: "" };
    query.split("&").forEach((part) => {
      const item = part.split("=");
      result = { ...result, [item[0]]: decodeURIComponent(item[1]) };
    });
    setParams(result);
  }, [location]);

  // send code and state to backend
  useEffect(() => {
    console.log(params);
    if (!params || params.code === "") {
      return;
    }

    (async () => {
      const response = await register({
        input: { code: params.code, state: params.state },
      }).catch((err) => console.error(err));

      if (!response || !response.data) {
        console.error("No Response");
        return;
      }

      if (response.data.googleAuth.__typename === "AuthError") {
        console.log("An error occured");
        setError(response.data.googleAuth.message);
      }
      if (response.data.googleAuth.__typename === "AuthPayload") {
        setAccessToken(response.data.googleAuth.accessToken);
        dispatch(setUser(response.data.googleAuth));
        history.push("/app");
      }
    })();
  }, [params]);

  // backend response
  useEffect(() => {
    console.log(registerState);
  }, [registerState]);

  // TODO: Make callback page pretty
  return <p>{error === "" ? "Loading..." : error}</p>;
};

export default GoogleCallback;
