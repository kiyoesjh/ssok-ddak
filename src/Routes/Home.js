import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Ssok from './Ssok';

const Home = ({ userId }) => {
  const [ssok, setSsok] = useState('');
  const [ssoks, setSsoks] = useState([]);
  const [attachment, setAttachment] = useState();

  const handlerSnapShot = () => {
    dbService.collection('ssok').onSnapshot((snapshot) => {
      const ssokArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSsoks(ssokArr);
    });
  };

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

  const onFileChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  useEffect(() => {
    handlerSnapShot();
  }, []);

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
          <input type="file" accept="image/*" onChange={onFileChange} />
          <input type="submit" value="ssok" />
        </form>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button type="button" onClick={onClearAttachment}>
              삭제
            </button>
          </div>
        )}
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
