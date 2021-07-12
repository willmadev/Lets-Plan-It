import React from "react";
import { RouteComponentProps } from "react-router";
import { useTestQuery } from "src/generated/graphql";

const Landing: React.FC<RouteComponentProps> = ({ history }) => {
  const [{ fetching, error, data }] = useTestQuery();
  if (fetching || !data) return <p>loadingggg</p>;
  if (error) return <p>errorrr</p>;
  console.log(data);

  return (
    <div>
      <h1>Let's plan it</h1>
      <p>{data.hello}</p>
    </div>
  );
};

export default Landing;
