import { FC } from "react";
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
        <SidebarMenuItem
          color="red"
          title="Course 1"
          path={`${basePath}/courses/1`}
        />
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
