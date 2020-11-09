import React from 'react';
import styled, { css } from 'styled-components';

const widthStyles = css`
  width: ${({ buttonWidth }) => buttonWidth};
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  color: ${({ theme }) => theme.mainColor(1)};
  border: 1px solid ${({ theme }) => theme.mainColor(1)};
  ${({ isFullButton, theme }) =>
    isFullButton &&
    `
      background-color: ${theme.mainColor(1)};
      color: #fff;
    `};
  transition: 0.3s;
  ${({ gap }) => gap && `margin: ${gap}`};
  ${widthStyles};
`;

const Button = ({ children, buttonWidth, isFullButton, gap, ...rest }) => {
  return (
    <StyledButton
      buttonWidth={buttonWidth}
      isFullButton={isFullButton}
      gap={gap}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
