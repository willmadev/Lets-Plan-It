import { FetchResult } from "@apollo/client";
import { useState } from "react";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "src/utils/auth";
import {
  AuthFlashMessage,
  AuthForm,
  AuthFormLayout,
  AuthFormWrapper,
  AuthInputField,
  AuthPageWrapper,
  AuthSubmitButton,
  AuthTitle,
  AuthTitleContainer,
} from "src/styles/auth";
import { RegisterMutation, useRegisterMutation } from "src/generated/graphql";
import { StyledLink, StyledParagraph } from "src/styles/global";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [inputField, setInputField] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [message, setMessage] = useState("");

  const [registerState, register] = useRegisterMutation();

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
        input: {
          name: inputField.name,
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
    <AuthPageWrapper>
      <AuthFormLayout>
        <AuthFormWrapper>
          <AuthTitleContainer>
            <AuthTitle>Register</AuthTitle>
            <StyledParagraph>
              If you already have an account, log in {}
              <StyledLink to="/login">here</StyledLink>.
            </StyledParagraph>
          </AuthTitleContainer>
          <AuthForm name="register" onSubmit={(e) => handleSubmit(e)}>
            <AuthInputField
              name="name"
              type="text"
              placeholder="Name"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.name}
            />
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
            <AuthInputField
              name="repeatPassword"
              type="password"
              placeholder="Repeat Password"
              required
              onChange={(e) => handleChange(e)}
              value={inputField.repeatPassword}
            />
            <AuthFlashMessage>{message}</AuthFlashMessage>
            <AuthSubmitButton
              type="submit"
              value="Register"
              disabled={registerState.fetching}
            />
          </AuthForm>
        </AuthFormWrapper>
      </AuthFormLayout>
    </AuthPageWrapper>
  );
};

export default Register;
