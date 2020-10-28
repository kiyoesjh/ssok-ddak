import React from 'react';
import styled, {css} from "styled-components";

const widthStyles = css`
  width: ${({buttonWidth}) => buttonWidth};
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  color: #eee;
  background-color: ${({theme}) => theme.lightMode.mainColor(1)};
  transition: 0.3s;
  ${widthStyles};
  &:hover {
    background-color: ${({theme}) => theme.lightMode.mainColor(0.5)};
  }
`;


const Button = ({children, buttonWidth, ...rest}) => {
  return (
    <StyledButton buttonWidth={buttonWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
