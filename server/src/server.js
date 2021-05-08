const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const schema = require("./schema/schema");
const { verify } = require("jsonwebtoken");
const { getUser } = require("./helpers/db");
const { createAccessToken } = require("./helpers/auth");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.rtk;
  if (!token) {
    return res.status(400).json({ success: false, error: "No refresh token" });
  }

  let payload;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    console.error(err);
    return res
      .status(400)
      .json({ success: false, error: "Refresh token error" });
  }

  const user = await getUser(payload.userId);

  if (!user) {
    return res.status(500).json({ success: false, error: "User not found" });
  }

  if (payload.version !== user.refreshTokenVersion) {
    return res
      .status(400)
      .json({ success: false, error: "Refresh token invalid" });
  }
  return res
    .status(200)
    .json({ success: true, accessToken: createAccessToken(user) });
});

const server = new ApolloServer({
  schema,
  context: (req) => ({ ...req }),
});

server.applyMiddleware({ app, path: "/graphql", cors: false });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
