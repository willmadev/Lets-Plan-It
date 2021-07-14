import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
  Provider,
} from "urql";
import { authExchange } from "@urql/exchange-auth";
import { AuthConfig } from "@urql/exchange-auth/dist/types/authExchange";
import {
  checkJwtValidity,
  getAccessToken,
  logout,
  setAccessToken,
} from "src/utils/auth";
import { FC } from "react";

type authStateType = { token: string } | null;

const getAuth: AuthConfig<authStateType>["getAuth"] = async ({
  authState,
}: {
  authState: authStateType;
}) => {
  const token = authState ? authState.token : getAccessToken();

  if (token && checkJwtValidity(token)) {
    return { token };
  }

  // refresh token
  const res = await fetch("http://localhost:5000/refresh_token", {
    credentials: "include",
    method: "POST",
  });
  const refreshTokenResponse = await res.json();
  if (refreshTokenResponse.success && refreshTokenResponse.accessToken) {
    setAccessToken(refreshTokenResponse.accessToken);
    return { token: refreshTokenResponse.accessToken };
  }

  // logout
  console.log("Logging out");
  logout();

  return null;
};

const addAuthToOperation: AuthConfig<authStateType>["addAuthToOperation"] = ({
  authState,
  operation,
}) => {
  if (!authState || !authState.token) {
    return operation;
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === "function"
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        authorization: `bearer ${authState.token}`,
      },
    },
  });
};

const didAuthError: AuthConfig<authStateType>["didAuthError"] = ({
  error,
  authState,
}) => {
  return error.graphQLErrors.some((e) => e.message === "Not authenticated");
};

const willAuthError: AuthConfig<authStateType>["willAuthError"] = ({
  authState,
}) => {
  // invalid access token
  if (!authState?.token || !checkJwtValidity(authState.token)) return true;
  return false;
};

const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      getAuth,
      addAuthToOperation,
      didAuthError,
      willAuthError,
    }),
    fetchExchange,
  ],
  fetchOptions: { credentials: "include" },
});

const UrqlProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
