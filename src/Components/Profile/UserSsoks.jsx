import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import UserSsok from './UserSsok';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fill, minmax(200px, auto));
  grid-auto-rows: minmax(200px, auto);
  gap: 10px;
  margin: 20px 0;
  ${device.custom('630px')} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const UserSsoks = ({ ssoks }) => {
  return (
    <Container>
      {ssoks.map((ssok) => (
        <UserSsok ssok={ssok} key={ssok.id} />
      ))}
    </Container>
  );
};

export default UserSsoks;
