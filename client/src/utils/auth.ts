import jwtDecode from "jwt-decode";

export type decodedAccessTokenType = {
  userId: string;
  iat: number;
  exp: number;
};

let accessToken = "";

const setAccessToken = (token: string) => {
  accessToken = token;
  console.log("Set access token:", accessToken);
};

const getAccessToken = () => {
  if (accessToken === "") return null;
  return accessToken;
};

const checkJwtValidity = (token: string) => {
  const decoded: decodedAccessTokenType = jwtDecode(token);
  return !(Date.now() >= decoded.exp * 1000);
};

export { setAccessToken, getAccessToken, checkJwtValidity };
