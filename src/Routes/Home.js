import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok/Ssok';
import styled from 'styled-components';
import device, { containerWidth } from 'styles/deviceSize';

const HomeWrap = styled.div`
  display: flex;
  width: 100%;
  ${containerWidth}
`;

const ColumnWrap = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  @media ${device.mobile} {
    width: 90%;
  }
  @media ${device.tablet} {
    columns: unset;
  }
  @media ${device.laptop} {
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
    <HomeWrap>
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
    </HomeWrap>
  );
};

export default Home;
