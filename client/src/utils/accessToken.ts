let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
  console.log("Set access token:", accessToken);
};

export const getAccessToken = () => {
  if (accessToken === "") return null;
  return accessToken;
};
