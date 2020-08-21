import React, { FunctionComponent, MouseEvent } from 'react'
import { Button } from './styled-button';

export type ButtonProps = {
    onClick: (props: MouseEvent<HTMLButtonElement>) => {},
    type?: "button" | "submit" | "reset" | undefined
  }

const ButtonComponent: FunctionComponent<ButtonProps> = (props) => {
    const { children, onClick, type } = props;
    return (
        <Button onClick={onClick} type={type}>{children}</Button>
    );
}

export default ButtonComponent;