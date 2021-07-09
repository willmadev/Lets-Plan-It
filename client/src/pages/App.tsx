import { FC } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Header from "src/components/Header";
import Sidebar from "src/components/Sidebar";
import Dashboard from "src/components/Dashboard";
import styled from "styled-components";
import Course from "src/components/Course";
import Courses from "src/components/Courses";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-columns: 250px max-content;
`;

const PageContent = styled.div`
  grid-row: 2;
  grid-column: 2;
  width: calc(100vw - 250px);
  height: calc(100vh - 55px);
  background-color: ${(props) => props.theme.color.pageBackground};
  overflow-y: scroll;
`;

const App: FC = () => {
  const { path } = useRouteMatch();
  console.log(path);
  return (
    <PageWrapper>
      <Header />
      <Sidebar basePath={path} />
      <PageContent>
        <Switch>
          <Route
            exact
            path={`${path}/courses`}
            render={() => <Courses basePath={path} />}
          />
          <Route exact path={`${path}/course/`} component={Course} />
          <Route path={path} component={Dashboard} />
        </Switch>
      </PageContent>
    </PageWrapper>
  );
};

export default App;
