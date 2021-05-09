let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
  console.log("Set access token:", accessToken);
};

export const getAccessToken = () => {
  return accessToken;
};
