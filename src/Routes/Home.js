import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok/Ssok';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Header from 'components/Header';
import Container from 'components/Container';

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
    column-gap: 15px;
  }
`;

const Home = ({ userObject }) => {
  const [ssoks, setSsoks] = useState([]);

  useEffect(() => {
    const unsubscribe = dbService.collection('ssok').onSnapshot((snapshot) => {
      const ssokArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSsoks(ssokArr);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Container>
      <Header headText="홈" />
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
