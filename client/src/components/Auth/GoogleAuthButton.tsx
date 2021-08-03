import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { FC } from "react";
import { useGetGoogleAuthUrlQuery } from "src/generated/graphql";

// #region button image imports
import signIn_disabled from "./images/signIn_disabled.png";
import signIn_focused from "./images/signIn_focused.png";
import signIn_normal from "./images/signIn_normal.png";
import signIn_pressed from "./images/signIn_pressed.png";
import signUp_disabled from "./images/signUp_disabled.png";
import signUp_focused from "./images/signUp_focused.png";
import signUp_normal from "./images/signUp_normal.png";
import signUp_pressed from "./images/signUp_pressed.png";
//#endregion

type action = "signIn" | "signUp";
type state = "normal" | "focused" | "disabled" | "pressed";

const getButtonSrc = (action: action, state: state) => {
  const images = {
    signIn_disabled: signIn_disabled,
    signIn_focused: signIn_focused,
    signIn_normal: signIn_normal,
    signIn_pressed: signIn_pressed,
    signUp_disabled: signUp_disabled,
    signUp_focused: signUp_focused,
    signUp_normal: signUp_normal,
    signUp_pressed: signUp_pressed,
  };

  return images[`${action}_${state}`];
};

interface GoogleAuthButtonProps {
  action: action;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ action }) => {
  const [btnState, setBtnState] = useState<state>("disabled");
  const [url, setUrl] = useState("");
  const [{ data }] = useGetGoogleAuthUrlQuery({ variables: { action } });

  useEffect(() => {
    if (data) {
      setUrl(data.getGoogleAuthUrl);
      setBtnState("normal");
    }
  }, [data]);

  const handleClick = useCallback(() => {
    window.open(url, "_self");
  }, [url]);

  return (
    <a onClick={handleClick}>
      <img
        src={getButtonSrc(action, btnState)}
        style={{
          height: "50px",
          boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.1)",
          cursor: url === "" ? "not-allowed" : "pointer",
        }}
        draggable={false}
        onMouseEnter={() =>
          url === "" ? setBtnState("disabled") : setBtnState("pressed")
        }
        onMouseLeave={() => {
          url === "" ? setBtnState("disabled") : setBtnState("normal");
        }}
      />
    </a>
  );
};

export default GoogleAuthButton;
