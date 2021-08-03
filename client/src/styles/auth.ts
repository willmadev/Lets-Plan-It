import fonts from "src/theme/font";
import styled from "styled-components";

const AuthPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.pageBackground};
`;

const AuthFormLayout = styled.div`
  width: 550px;
  height: 650px;
  max-width: 85%;
  max-height: 85%;
  background-color: ${(props) => props.theme.color.elementBackground};
  border-radius: 35px;
`;

const AuthFormWrapper = styled.div`
  width: calc(100% - 80px);
  height: calc(100% - 70px);
  padding: 35px 40px;
  display: flex;
  gap: 40px;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

const AuthTitleContainer = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const AuthTitle = styled.h1`
  ${fonts.authHeading}
`;

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 80%;
  align-items: center;
  justify-content: center;
`;

const AuthInputField = styled.input`
  border: 1px solid #000000;
  border-radius: 15px;
  width: 400px;
  height: 20px;
  padding: 12px 20px;
  ${fonts.authInputText}
  margin-bottom: 15px;

  &::placeholder {
    ${fonts.authInputPlaceholder}
    color: #000000;
  }
`;

const AuthFlashMessage = styled.p`
  width: 100%;
  margin-top: 5px;
  color: red;
`;

const AuthSubmitButton = styled.input`
  margin-top: 20px;
  padding: 10px 25px;
  background-color: ${(props) => props.theme.color.primary};
  border: none;
  border-radius: 22px;
  font-family: "open sans", sans-serif;
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.color.primaryHover};
  }
`;

const Divider = styled.hr`
  width: 100%;
`;

export {
  AuthPageWrapper,
  AuthFormLayout,
  AuthFormWrapper,
  AuthTitleContainer,
  AuthTitle,
  AuthForm,
  AuthInputField,
  AuthFlashMessage,
  AuthSubmitButton,
  Divider,
};
