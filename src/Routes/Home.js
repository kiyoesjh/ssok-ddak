import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from 'components/Ssok';
import styled from 'styled-components';

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
      <div>
        {ssoks.map((ssok) => (
          <Ssok
            key={ssok.id}
            ssokData={ssok}
            isOwner={ssok.creatorId === userObject.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
