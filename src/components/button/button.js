import React from 'react'
import { Button } from './styled-button';

const ButtonComponent = ({ children, ...otherAttr }) => {
    return (
        <Button {...otherAttr}>{children}</Button>
    );
}

export default ButtonComponent;