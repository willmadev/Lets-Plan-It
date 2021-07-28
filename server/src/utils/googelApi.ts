import { google } from "googleapis";
import config from "../config";

const oauth2Client = new google.auth.OAuth2({
  clientId: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  redirectUri: `${config.BASE_URL}/googlecb`,
});

google.options({ auth: oauth2Client });

export const scopes = {
  email: "https://www.googleapis.com/auth/userinfo.email",
  profile: "https://www.googleapis.com/auth/userinfo.profile",
};

export const getAuthUrl = (scopes: string[]) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    // todo: state
    state: "test",
  });
  return url;
};

oauth2Client.on("tokens", (tokens) => {
  if (tokens.refresh_token) {
    // store refresh token
  }
  // store access token
});

export const setGoogleTokens = async (code: string) => {
  let tokens;
  try {
    tokens = (await oauth2Client.getToken(code)).tokens;
    oauth2Client.setCredentials(tokens);
  } catch (err) {
    console.error(err);
  }
  console.log(tokens);
  return tokens;
};

export const getAuthPayload = async (idToken: string) => {
  const ticket = await oauth2Client.verifyIdToken({
    idToken,
    audience: config.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload;
};
