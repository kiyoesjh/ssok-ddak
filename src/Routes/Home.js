import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok/Ssok';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Header from 'components/Header';
import Container from 'components/Container';
import HomeSkeleton from 'skeletons/HomeSkeleton';

const ColumnWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto 50px;
  padding: 15px 10px;
  ${device.mobile} {
    width: 80%;
  }
  ${device.tablet} {
    columns: unset;
    padding: 50px 10px;
    margin: 0 auto;
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

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Container>
        <Header headText="홈" />
        <ColumnWrap>
          {ssoks.length ? (
            <Wrap>
              {ssoks.map((ssok) => (
                <Ssok
                  key={ssok.id}
                  ssokData={ssok}
                  isOwner={ssok.creatorId === userObject.uid}
                />
              ))}
            </Wrap>
          ) : (
            <HomeSkeleton />
          )}
        </ColumnWrap>
      </Container>
    </>
  );
};

export default React.memo(Home);
