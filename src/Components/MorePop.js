import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const MoreButton = styled.button`
  outline: none;
  font-size: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

const PopList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 100px;
  max-width: calc(295px);
  top: 0;
  right: 0;
  background-color: #eee;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 21;
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

export default MorePop;
