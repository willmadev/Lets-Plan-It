import jwtDecode from "jwt-decode";
import { GetUserDocument, GetUserQuery } from "src/generated/graphql";
import { client } from "src/providers/UrqlProvider";
import store from "src/store";
import { setUser } from "src/store/user/user.slice";
import { OperationResult } from "urql";

export type decodedAccessTokenType = {
  userId: string;
  iat: number;
  exp: number;
};

export type decodedRefreshTokenType = {
  userId: string;
  version: number;
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

const validateAccessToken = (token: string) => {
  const decoded: decodedAccessTokenType = jwtDecode(token);
  return !(Date.now() >= decoded.exp * 1000);
};

const refresh = async () => {
  // fetch request
  console.log("refreshing tokens");
  const res = await fetch("http://localhost:5000/refresh_token", {
    credentials: "include",
    method: "POST",
  });

  const refreshTokenResponse = await res.json();
  if (refreshTokenResponse.success && refreshTokenResponse.accessToken) {
    console.log("refresh success");
    return refreshTokenResponse.accessToken as string;
  }
  return null;
};

const logout = () => {
  setAccessToken("");
  store.dispatch(setUser({ email: "", id: "", name: "" }));
  document.cookie = "rtk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const getUser = async () => {
  const result: OperationResult<GetUserQuery> = await client
    .query(GetUserDocument)
    .toPromise();
  if (!result.data?.getUser) {
    return null;
  }
  return result.data.getUser;
};

export {
  setAccessToken,
  getAccessToken,
  validateAccessToken,
  refresh,
  logout,
  getUser,
};
