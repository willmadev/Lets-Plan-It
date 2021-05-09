import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { setContext } from "@apollo/client/link/context";

import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Router from "./Router";
import { getAccessToken, setAccessToken } from "./accessToken";

import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  console.log("token:", token);
  if (token) {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
      },
    };
  }
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return false;
    }

    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      if (Date.now() >= exp! * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:5000/refresh_token", {
      credentials: "include",
      method: "POST",
    });
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken);
  },
  // handleResponse: (operation, accessTokenField) => (response) => {
  //   // here you can parse response, handle errors, prepare returned token to
  //   // further operations
  //   // returned object should be like this:
  //   // {
  //   //    access_token: 'token string here'
  //   // }
  // },
  handleError: (err) => {
    // full control over handling token fetch Error
    console.warn("Your refresh token is invalid. Try to relogin");
    console.error(err);

    // your custom action here
    // user.logout();
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([tokenRefreshLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  credentials: "include",
});

// fontawesome
library.add(faCaretDown, faCaretUp);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>,
  document.getElementById("root")
);
