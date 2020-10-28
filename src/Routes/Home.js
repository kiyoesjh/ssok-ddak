import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok/Ssok';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Header from 'components/Header';
import Container from 'components/Container';

// const HomeWrap = styled.div`
//   display: flex;
//   flex: 1;
//   width: 100%;
//   flex-direction: column;
//   ${device.tablet} {
//     border-left: 1px solid #ddd;
//   }
// `;

const ColumnWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  ${device.mobile} {
    width: 80%;
  }
  ${device.tablet} {
    columns: unset;
  }
  ${device.laptop} {
    width: 100%;
    column-count: 3;
    /* column-width: 320px; */
    column-gap: 15px;
  }
`;

const Home = ({ userObject }) => {
  const [ssoks, setSsoks] = useState([]);
  const handlerSnapShot = () => {
    dbService.collection('ssok').onSnapshot((snapshot) => {
      const ssokArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSsoks(ssokArr);
    });
  };
  useEffect(() => {
    handlerSnapShot();
  }, []);

  return (
    <Container>
      <Header>홈</Header>
      <ColumnWrap>
        <Wrap>
          {ssoks.map((ssok) => (
            <Ssok
              key={ssok.id}
              ssokData={ssok}
              isOwner={ssok.creatorId === userObject.uid}
            />
          ))}
        </Wrap>
      </ColumnWrap>
    </Container>
  );
};

export default Home;
