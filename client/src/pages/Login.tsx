import React, { FC, useState } from "react";
import { RouteComponentProps } from "react-router";
import { OperationResult } from "urql";
import { useDispatch } from "react-redux";
import { setAccessToken } from "src/utils/auth";
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
  Divider,
} from "src/styles/auth";
import {
  Exact,
  LoginInput,
  LoginMutation,
  useLoginMutation,
} from "src/generated/graphql";
import { StyledParagraph, StyledLink } from "src/styles/global";
import { setUser } from "src/store/user/user.slice";
import GoogleAuthButton from "src/components/Auth/GoogleAuthButton";

const Login: FC<RouteComponentProps> = ({ history }) => {
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [message, setMessage] = useState("");

  const [loginState, login] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validate input
    let response: OperationResult<
      LoginMutation,
      Exact<{
        input: LoginInput;
      }>
    >;
    try {
      response = await login({
        input: {
          email: inputField.email,
          password: inputField.password,
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
      dispatch(
        setUser({
          email: response.data.login.email,
          id: response.data.login.id,
          name: response.data.login.name,
        })
      );
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
            <AuthSubmitButton
              type="submit"
              value="Log In"
              disabled={loginState.fetching}
            />
          </AuthForm>
          <Divider />
          <GoogleAuthButton action="signIn" />
        </AuthFormWrapper>
      </AuthFormLayout>
    </AuthPageWrapper>
  );
};

export default Login;
