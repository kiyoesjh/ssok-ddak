import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Wrap = styled.div``;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

const MorePop = ({ children, setIsOpen, isOpen }) => {
  const togglePop = () => setIsOpen((prev) => !prev);
  return (
    <Wrap>
      <button onClick={togglePop}>
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          {children}
        </>
      )}
    </Wrap>
  );
};

export default MorePop;
