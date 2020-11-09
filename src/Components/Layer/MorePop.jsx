import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const MoreButton = styled.button`
  outline: none;
  font-size: 20px;
  color: ${({ theme }) => theme.boldColor};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

const PopList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: calc(295px);
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 99;
`;

const MorePop = ({ children, setIsOpen, isOpen }) => {
  const togglePop = () => setIsOpen((prev) => !prev);
  return (
    <div>
      <MoreButton onClick={togglePop}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </MoreButton>
      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <PopList>{children}</PopList>
        </>
      )}
    </div>
  );
};

export default React.memo(MorePop);
