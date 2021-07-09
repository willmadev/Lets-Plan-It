import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 35px;
  line-height: 54px;
`;

const StyledH2 = styled.h2`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 41px;
`;

const BackButton = styled(FontAwesomeIcon)`
  font-size: 25px;
  cursor: pointer;
`;

export { StyledH1, StyledH2, BackButton };
