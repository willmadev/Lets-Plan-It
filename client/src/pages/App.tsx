import { FC, useState } from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Header from "src/components/Header/Header";
import Sidebar from "src/components/Sidebar";
import Dashboard from "src/components/Dashboard";
import Course from "src/components/Course";
import Courses from "src/components/Courses";
import ProtectedRoute from "src/components/ProtectedRoute";

export interface CourseRouteParams {
  courseId: string;
}

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

  const [scrolledToBottom, setScrolledToBottom] = useState(false);
  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight
    ) {
      console.log("scrolled to bottom");
      setScrolledToBottom(true);
    } else {
      setScrolledToBottom(false);
    }
  };
  return (
    <PageWrapper>
      <Header />
      <Sidebar basePath={path} />
      <PageContent onScroll={(e) => handleScroll(e)}>
        <Switch>
          <ProtectedRoute
            exact
            path={`${path}/courses`}
            render={() => <Courses basePath={path} />}
          />
          <ProtectedRoute
            path={`${path}/courses/:courseId`}
            render={() => <Course scrolledToBottom={scrolledToBottom} />}
          />
          <ProtectedRoute path={path} component={Dashboard} />
        </Switch>
      </PageContent>
    </PageWrapper>
  );
};

export default App;
