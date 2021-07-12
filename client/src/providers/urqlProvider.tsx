import { createClient, makeOperation, Provider } from "urql";
import { authExchange } from "@urql/exchange-auth";
import { AuthConfig } from "@urql/exchange-auth/dist/types/authExchange";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "src/accessToken";
import { FC } from "react";

type authStateType = { token: string } | null;
type decodedAccessTokenType = { userId: string; iat: number; exp: number };

const getAuth: AuthConfig<authStateType>["getAuth"] = async ({
  authState,
}: {
  authState: authStateType;
}) => {
  if (!authState) {
    const token = getAccessToken();
    if (token) {
      const decodedToken = jwtDecode(token) as decodedAccessTokenType;
      if (!(Date.now() >= decodedToken.exp * 1000)) return { token };
    }
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
  console.error("TODO-LOGOUT");

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

const client = createClient({
  url: "https://localhost:5000/graphql",
  exchanges: [
    authExchange({
      getAuth,
      addAuthToOperation,
      // TODO: error handling
    }),
  ],
});

const UrqlProvider: FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlProvider;
