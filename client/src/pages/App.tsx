import { FC } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "src/components/Header";
import Sidebar from "src/components/Sidebar";
import Dashboard from "src/components/Dashboard";
import styled from "styled-components";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: min-content max-content;
`;

const PageContent = styled.div`
  grid-row: 2;
  grid-column: 2;
  width: 100%;
  height: calc(100vh - 55px);
  background-color: ${(props) => props.theme.color.pageBackground};
`;

const App: FC = () => {
  const { path } = useRouteMatch();
  return (
    <PageWrapper>
      <Header />
      <Sidebar />
      <PageContent>
        <Switch>
          <Route exact path={path} component={Dashboard} />
        </Switch>
      </PageContent>
    </PageWrapper>
  );
};

export default App;
