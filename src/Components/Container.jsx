import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  min-height: 100%;
  flex-direction: column;
  ${device.tablet} {
    border-left: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

const Container = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
