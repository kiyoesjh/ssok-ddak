import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok';
import styled from 'styled-components';
import device from 'styles/deviceSize';

const Wrap = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 0;
  column-width: 320px;
  column-gap: 15px;
  column-count: 1; //작은순
  @media ${device.mobile} {
    width: 90%;
  }
  @media ${device.tablet} {
    column-count: 2;
  }
  @media ${device.laptop} {
    column-count: 3;
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
    <>
      <Wrap>
        {ssoks.map((ssok) => (
          <Ssok
            key={ssok.id}
            ssokData={ssok}
            isOwner={ssok.creatorId === userObject.uid}
          />
        ))}
      </Wrap>
    </>
  );
};

export default Home;
