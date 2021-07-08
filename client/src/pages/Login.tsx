import { FetchResult } from "@apollo/client";
import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "src/accessToken";
import {
  AuthFormLayout,
  AuthFormWrapper,
  AuthTitle,
  AuthForm,
  AuthInputField,
  AuthSubmitButton,
  AuthFlashMessage,
  AuthPageWrapper,
  AuthTitleContainer,
} from "src/styles/auth";
import { LoginMutation, useLoginMutation } from "src/generated/graphql";
import { StyledParagraph, StyledLink } from "src/styles/global";

const Login: FC<RouteComponentProps> = ({ history }) => {
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
    <AuthPageWrapper>
      <AuthFormLayout>
        <AuthFormWrapper>
          <AuthTitleContainer>
            <AuthTitle>Login</AuthTitle>
            <StyledParagraph>
              If you do not have an account, create one {}
              <StyledLink to="/register">here</StyledLink>.
            </StyledParagraph>
          </AuthTitleContainer>

          <AuthForm name="login" onSubmit={(e) => handleSubmit(e)}>
            <AuthInputField
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.email}
            />
            <AuthInputField
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.password}
            />
            <AuthFlashMessage>{message}</AuthFlashMessage>
            <AuthSubmitButton type="submit" value="Log In" />
          </AuthForm>
        </AuthFormWrapper>
      </AuthFormLayout>
    </AuthPageWrapper>
  );
};

export default Login;
