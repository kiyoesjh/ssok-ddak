import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from './Ssok';

const Home = ({ userId }) => {
  const [ssok, setSsok] = useState('');
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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('ssok').add({
      text: ssok,
      createdAt: Date.now(),
      creatorId: userId,
    });
    setSsok('');
  };
  const onChange = ({ target: { value } }) => setSsok(value);
  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            value={ssok}
            placeholder="what's on your mind?"
            maxLength={128}
          />
          <input type="submit" value="ssok" />
        </form>
      </div>
      <div>
        {ssoks.map((ssok) => (
          <Ssok
            key={ssok.id}
            ssokData={ssok}
            isOwner={ssok.creatorId === userId}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
