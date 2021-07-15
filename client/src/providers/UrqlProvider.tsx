import { FC } from "react";
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
  validateAccessToken,
  refresh,
  setAccessToken,
  logout,
} from "src/utils/auth";

type authStateType = { token: string } | null;

const getAuth: AuthConfig<authStateType>["getAuth"] = async ({
  authState,
}: {
  authState: authStateType;
}) => {
  console.log("auth exchange getAuth");
  console.log({ authState });

  // no token (initial load) or invalid token (expired)
  if (!authState?.token || !validateAccessToken(authState.token)) {
    const accessToken = await refresh();
    console.log({ accessToken });
    if (accessToken) {
      setAccessToken(accessToken);
      return { token: accessToken };
    }

    console.log("Logging out");
    logout();

    return null;
  }

  return authState;
};

const addAuthToOperation: AuthConfig<authStateType>["addAuthToOperation"] = ({
  authState,
  operation,
}) => {
  console.log("auth exchange addAuthToOperation");
  if (!authState || !authState.token) {
    console.log("no authstate");
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
  if (!authState?.token || !validateAccessToken(authState.token)) return true;
  return false;
};

export const client = createClient({
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
