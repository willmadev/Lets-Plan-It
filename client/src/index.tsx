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
import { sortByDueDate } from "./helpers/sortByDueDate";

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getTasks: {
            keyArgs: false,
            merge(existing = [], incoming: any, { args, readField }) {
              console.log("MERGE - existing:", existing);
              console.log("MERGE - incoming:", incoming);
              console.log("MERGE - args:", args);
              // const merged: any[] = existing ? existing.slice(0) : [];

              // const existingIdSet = new Set(
              //   merged.map((task) => readField("id", task))
              // );

              // incoming = incoming.filter(
              //   (task: any) => !existingIdSet.has(readField("id", task))
              // );

              // const afterIndex = merged.findIndex(
              //   (task) => args?.cursor === readField("id", task)
              // );

              // if (afterIndex >= 0) {
              //   merged.splice(afterIndex + 1, 0, ...incoming);
              // } else {
              //   merged.push(...incoming);
              // }
              // console.log("MERGE - merged:", merged);
              // return merged;

              let merged = incoming ? [...incoming] : [];
              if (incoming) {
                const incomingIdSet = new Set(
                  merged.map((task) => readField("id", task))
                );
                console.log("MERGE - incomingIdSet:", incomingIdSet);

                existing = existing.filter(
                  (task: any) => !incomingIdSet.has(readField("id", task))
                );

                merged.push(...existing);
              }
              console.log("MERGE - merged", merged);
              merged = merged.sort((a, b) => {
                const aDue = parseInt(readField("due", a)!);
                const bDue = parseInt(readField("due", b)!);
                if (aDue < bDue) return -1;
                if (aDue > bDue) return 1;
                return 0;
              });
              console.log("MERGE - merged", merged);
              return merged;
            },
            read(existing: any[], { args, readField }) {
              // if (existing) {
              //   const afterIndex = existing.findIndex(
              //     (task) => args?.cursor === readField("id", task)
              //   );

              //   if (afterIndex && afterIndex >= 0) {
              //     const page = existing.slice(
              //       afterIndex + 1,
              //       afterIndex + 1 + args?.limit
              //     );
              //     console.log("page:", page);
              //     if (page && page.length > 0) {
              //       return page;
              //     }
              //   }
              // }

              if (!existing) return;

              console.log("READ - existing:", existing);
              console.log("READ - args:", args);

              let sorted = sortByDueDate(existing);
              if (args?.filter?.completed) {
                sorted = sorted.filter(
                  (task: any) => task.completed === args.filter.completed
                );
              }

              console.log("READ - sorted:", sorted);

              const limit = args?.limit || 20;
              console.log("READ - limit:", limit);

              return sorted;

              // if (args?.cursor) {
              //   return sorted.slice(args?.cursor, args?.cursor + limit);
              // } else {
              //   return sorted.slice(0, limit);
              // }
            },
          },
        },
      },
    },
  }),
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
