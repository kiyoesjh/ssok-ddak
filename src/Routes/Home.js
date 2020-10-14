import React, { useState } from 'react';

const Home = () => {
  const [write, setWrite] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
  };
  const onChange = ({ target: { value } }) => setWrite(value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={write}
          placeholder="what's on your mind?"
          maxLength={128}
        />
        <input type="submit" value="ssok" />
      </form>
    </div>
  );
};

export default Home;
