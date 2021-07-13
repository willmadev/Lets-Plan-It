import { FC } from "react";
import { useGetCoursesQuery } from "src/generated/graphql";
import styled from "styled-components";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarContainer = styled.div`
  grid-column: 1;
  grid-row: 2;
  height: calc(100vh - 55px - 40px);
  width: 230px;
  background-color: ${(props) => props.theme.color.sidebarBackground};
  padding: 20px 10px;
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

interface SidebarProps {
  basePath: string;
}

const Sidebar: FC<SidebarProps> = ({ basePath }) => {
  const [{ fetching, data }] = useGetCoursesQuery();
  return (
    <SidebarContainer>
      <SidebarMenu>
        <SidebarMenuItem icon="home" title="Dashboard" path={basePath} />
        <SidebarMenuItem
          icon="book"
          title="Courses"
          path={`${basePath}/courses`}
        />
        {/* <SidebarMenuItem icon="calendar-week" title="Upcoming" path="/app" /> */}
      </SidebarMenu>
      <hr />
      <SidebarMenu>
        {(() => {
          if (fetching) {
            return <p>Loading...</p>;
          }
          if (!data || !data.getCourses) {
            return <p>No courses found</p>;
          }
          return data.getCourses.map((course) => {
            return (
              <SidebarMenuItem
                title={course.courseName}
                color={`#${course.color}`}
                path={`${basePath}/courses/${course.id}`}
                key={course.id}
              />
            );
          });
        })()}
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
