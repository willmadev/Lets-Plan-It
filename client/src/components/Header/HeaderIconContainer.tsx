import { FC } from "react";
import styled from "styled-components";

interface StyledContainerProps {
  gridIndex: number;
}

const StyledContainer = styled.div<StyledContainerProps>`
  display: flex;
  gap: 20px;
  margin: 0px 50px;
  grid-column: ${(props) => props.gridIndex};
`;

interface HeaderIconContainerProps {
  gridIndex: number;
}

const HeaderIconContainer: FC<HeaderIconContainerProps> = ({
  children,
  gridIndex,
}) => {
  return <StyledContainer gridIndex={gridIndex}>{children}</StyledContainer>;
};

export default HeaderIconContainer;
