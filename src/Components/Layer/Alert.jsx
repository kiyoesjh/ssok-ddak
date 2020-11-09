import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0px;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: 5px;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.boldColor};
  margin: 5px 0;
`;

const ConfirmButton = styled.button`
  padding: 5px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.mainColor(1)};
  color: ${({ theme }) => theme.boldColor};
`;

const Alert = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => setIsOpen(false);
  return (
    <>
      {isOpen && (
        <Container>
          <Overlay />
          <Content>
            <Message>{message}</Message>
            <ConfirmButton type="button" onClick={onClick}>
              확인
            </ConfirmButton>
          </Content>
        </Container>
      )}
    </>
  );
};

export default Alert;
