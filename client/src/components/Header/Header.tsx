import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HeaderIconContainer from "./HeaderIconContainer";
import styled from "styled-components";

const HeaderContainer = styled.div`
  grid-row: 1;
  grid-column: 1/3;
  width: 100vw;
  height: 55px;
  background-color: ${(props) => props.theme.color.primary};
  display: grid;
  align-items: center;
  grid-template-columns: min-content auto min-content;
`;

const HeaderIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  height: 25px;
  color: ${(props) => props.theme.color.headerIcon};
`;

const Header: FC = () => {
  return (
    <HeaderContainer>
      <HeaderIconContainer gridIndex={1}>
        <HeaderIcon icon="bars" />
        <HeaderIcon icon="home" />
      </HeaderIconContainer>

      <HeaderIconContainer gridIndex={3}>
        <HeaderIcon icon="plus" />
        <HeaderIcon icon="search" />
        <HeaderIcon icon="bell" />
      </HeaderIconContainer>
    </HeaderContainer>
  );
};

export default Header;
