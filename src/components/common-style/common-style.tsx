import styled from "styled-components";

export type StyleProps = {
  height?: number | string;
  width?: number | string;
  minHeight?: number | string;
};

export const Wrapper = styled.div`
  min-height: 500px;
  height: 100vh;
  background-image: linear-gradient(to right bottom, #f3206d, #fed636);
  position: relative;
`;

export const Container = styled.div<StyleProps>`
  height: ${(props) => props.height};
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
`;

export const Centering = styled.div`
  display: flex;
  justify-content: center;
`;

export const Inner = styled.div<StyleProps>`
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  max-width: 800px;
  margin: 0 auto;
  margin-top: 3%;
  text-align: center;
`;

export const Form = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

export const Input = styled.input`
  display: block;
`;
