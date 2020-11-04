import React from 'react';
import styled from 'styled-components';

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
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  z-index: 90;
`;

const Head = styled.h2`
  font-size: 1.25rem;
  color: #000;
`;

const Header = ({ headText, children }) => {
  return (
    <Container>
      <Head>{headText}</Head>
      {children}
    </Container>
  );
};

export default Header;
