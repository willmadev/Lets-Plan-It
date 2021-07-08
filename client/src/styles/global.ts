import { Link } from "react-router-dom";
import fonts from "src/theme/font";
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #8220ff;
  ${fonts.paragraph}
`;

const StyledParagraph = styled.p`
  ${fonts.paragraph}
`;

export { StyledLink, StyledParagraph };
