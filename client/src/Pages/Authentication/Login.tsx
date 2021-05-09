import { FetchResult } from "@apollo/client";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "src/accessToken";
import { LoginMutation, useLoginMutation } from "src/generated/graphql";

import styles from "./authentication.module.css";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const [login] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate input
    let response: FetchResult<LoginMutation>;
    try {
      response = await login({
        variables: {
          input: {
            email: inputField.email,
            password: inputField.password,
          },
        },
      });
      console.log(response);
      if (!response.data) {
        console.error("No Response");
        return;
      }
    } catch (err) {
      console.error(err);
      return;
    }

    if (response.data.login.__typename === "AuthPayload") {
      setAccessToken(response.data.login!.accessToken);
      setMessage("Successfully Logged In");
      history.push("/app");
      return;
    }
    if (response.data.login.__typename === "AuthError") {
      setMessage(response.data.login.message);
    }
  };
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formLayout}>
        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Login</h1>
          <form
            name="login"
            onSubmit={(e) => handleSubmit(e)}
            className={styles.formContainer}
          >
            <input
              name="email"
              className={styles.textInput}
              type="email"
              placeholder="Email"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.email}
            />
            <input
              name="password"
              className={styles.textInput}
              type="password"
              placeholder="Password"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.password}
            />
            <p className={styles.flashMessage}>{message}</p>
            <input type="submit" value="Log In" className={styles.submitBtn} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
