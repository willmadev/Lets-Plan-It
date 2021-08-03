import { google } from "googleapis";
import JWT from "jsonwebtoken";
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

export type googleAuthAction = "signIn" | "signUp";
export type stateParams = { action: googleAuthAction };

const generateState = (params: stateParams) => {
  return JWT.sign(params, config.GOOGLE_STATE_SECRET);
};

export const getAuthUrl = (action: googleAuthAction, scopes: string[]) => {
  const state = generateState({ action });
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state,
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
