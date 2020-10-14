import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
  const [ssok, setSsok] = useState('');
  const [ssoks, setSsoks] = useState([]);
  const getSsoks = async () => {
    const dbSsoks = await dbService.collection('ssok').get();
    dbSsoks.forEach((document) => {
      const ssokObject = {
        ...document.data(),
        id: document.id,
      };
      setSsoks((prev) => [ssokObject, ...prev]);
    });
  };
  useEffect(() => {
    getSsoks();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('ssok').add({
      ssok,
      createdAt: Date.now(),
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
        {ssoks.map(({ ssok, id, createdAt }) => (
          <div key={id}>{ssok}</div>
        ))}
      </div>
    </>
  );
};

export default Home;
