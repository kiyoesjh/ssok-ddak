import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SsokFactory = ({ userObject }) => {
  const [ssok, setSsok] = useState('');
  const [attachment, setAttachment] = useState();
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentURL = '';
    if (attachment) {
      const attachmentRef = storageService
        .ref()
        .child(`${userObject.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, 'data_url');
      attachmentURL = await response.ref.getDownloadURL();
    }
    const ssokData = {
      text: ssok,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      attachmentURL,
    };
    await dbService.collection('ssok').add(ssokData);
    setSsok('');
    setAttachment('');
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
  );
};

export default SsokFactory;
