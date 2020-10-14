import React, { useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
  const [ssok, setSsok] = useState('');
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
  );
};

export default Home;
