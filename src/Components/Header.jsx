import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import SettingPop from './Layer/SettingPop';

const Container = styled.div`
  position: sticky;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  top: 0;
  height: 50px;
  min-height: 50px;
  padding: 0 15px;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  z-index: 90;
`;

const Head = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.boldColor};
`;

const ButtonWrap = styled.div`
  display: block;
  ${device.tablet} {
    display: none;
  }
`;

const Header = ({ headText }) => {
  return (
    <Container>
      <Head>{headText}</Head>
      <ButtonWrap>
        <SettingPop position={`top: 5px; right: 0;`} />
      </ButtonWrap>
    </Container>
  );
};

export default Header;
