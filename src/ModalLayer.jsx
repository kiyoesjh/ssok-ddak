import React from 'react';
import {createPortal} from "react-dom";
import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.25);
`;

const ModalLayer = ({children}) => {
  return createPortal(<Modal>{children}</Modal>, document.getElementById("layer"));
};

export default ModalLayer;
