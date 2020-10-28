import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Modal = styled.div`
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

const ChildrenWrap = styled.div`
  position: relative;
  z-index: 102;
`;

const ModalLayer = ({ children, onClick }) => {
  return createPortal(
    <Modal>
      <Overlay onClick={onClick} />
      <ChildrenWrap>{children}</ChildrenWrap>
    </Modal>,
    document.getElementById('modal_root')
  );
};

export default ModalLayer;
