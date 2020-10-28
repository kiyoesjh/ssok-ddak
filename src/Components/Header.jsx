import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  display: flex;
  top: 0;
  height: 50px;
  min-height: 50px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  align-items: center;
  z-index: 90;
`;

const Head = styled.h2`
  font-size: 1.25rem;
  color: #000;
  padding: 0 15px;
`;



const Header = ({children}) => {
  return (
    <Container>
      <Head>{children}</Head>
    </Container>
  );
};

export default Header;
