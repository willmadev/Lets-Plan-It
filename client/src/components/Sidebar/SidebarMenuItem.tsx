import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Link } from "react-router-dom";
import fonts from "src/theme/font";
import { iconName } from "src/utils/types";
import styled from "styled-components";

const SidebarMenuItemContainer = styled(Link)`
  margin: 3px 10px;
  display: grid;
  grid-template-columns: 35px max-content;
  grid-column-gap: 15px;
  align-items: center;
  padding: 7px 15px;
  border-radius: 10px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: ${(props) => props.theme.color.sidebarItemBackground};
  }

  &:active {
    color: inherit;
  }

  & > p {
    ${fonts.sidebarMenuItem}
  }
`;

interface SidebarMenuItemCourseIconProps {
  color: string;
}

const SidebarMenuItemCourseIcon = styled.div<SidebarMenuItemCourseIconProps>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
`;

const SidebarMenuItemIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  justify-self: center;
`;

interface SidebarMenuItemProps {
  icon?: iconName;
  color?: string;
  title: string;
  path: string;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  title,
  color,
  icon,
  path,
}) => {
  return (
    <SidebarMenuItemContainer to={path}>
      {icon ? (
        <SidebarMenuItemIcon icon={icon} />
      ) : (
        <SidebarMenuItemCourseIcon color={color!} />
      )}
      <p>{title}</p>
    </SidebarMenuItemContainer>
  );
};

export default SidebarMenuItem;
