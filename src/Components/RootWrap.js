import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';

const Wrap = styled.div`
  min-height: 100vh;
  ${device.tablet} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const RootWrap = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default RootWrap;
