import React from "react";
import { useTestAuthQuery } from "src/generated/graphql";

const TestAuth: React.FC = () => {
  const [{ data, fetching, error }] = useTestAuthQuery({
    requestPolicy: "network-only",
  });

  if (fetching) return <div>LOADING</div>;
  if (error) {
    console.error(error);
    return <div>{error.message}</div>;
  }
  if (!data) {
    console.log(data);
    return <div>No data</div>;
  }

  console.log(data);

  return <div>{data.testAuth}</div>;
};

export default TestAuth;
