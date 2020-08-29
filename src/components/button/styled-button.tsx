import styled from "styled-components";
import { StyleProps } from "../common-style/common-style";

const Button = styled.button<StyleProps>`
  width: ${(props) => props.width};
  cursor: pointer;
`;

export default Button;
