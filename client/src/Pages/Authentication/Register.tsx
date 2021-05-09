import { FetchResult } from "@apollo/client";
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "src/accessToken";
import { RegisterMutation, useRegisterMutation } from "src/generated/graphql";

import styles from "./authentication.module.css";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [message, setMessage] = useState("");

  const [register] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate input
    if (inputField.password !== inputField.repeatPassword) {
      setMessage("Passwords must match");
      return;
    }

    let response: FetchResult<RegisterMutation>;
    try {
      response = await register({
        variables: {
          input: {
            name: inputField.name,
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
      // TODO: implement error handling
      console.error(err);
      return;
    }

    if (response.data.register.__typename === "AuthPayload") {
      setAccessToken(response.data.register!.accessToken);
      setMessage("Successfully Registered");
      history.push("/app");
      return;
    }
    if (response.data.register.__typename === "AuthError") {
      setMessage(response.data.register.message);
    }
  };
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formLayout}>
        <div className={styles.formWrapper}>
          <h1 className={styles.heading}>Register</h1>
          <form
            name="register"
            onSubmit={(e) => handleSubmit(e)}
            className={styles.formContainer}
          >
            <input
              name="name"
              className={styles.textInput}
              type="text"
              placeholder="Name"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.name}
            />
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
            <input
              name="repeatPassword"
              className={styles.textInput}
              type="password"
              placeholder="Repeat Password"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.repeatPassword}
            />
            <p className={styles.flashMessage}>{message}</p>
            <input
              type="submit"
              value="Register"
              className={styles.submitBtn}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
