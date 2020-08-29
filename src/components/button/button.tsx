import React, { MouseEvent, ReactNode } from "react";
import Button from "./styled-button";

export type ButtonProps = {
  onClick: (props: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
};

const ButtonComponent = (props: ButtonProps): JSX.Element => {
  const { children, onClick, type } = props;
  return (
    <Button onClick={onClick} type={type}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
