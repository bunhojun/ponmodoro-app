import styled from "styled-components";
import { StyleProps } from "../common-style/common-style";

export const Button = styled.button<StyleProps>`
  width: ${props => props.width};
  cursor: pointer;
`;
