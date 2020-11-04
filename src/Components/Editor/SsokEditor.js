import { dbService } from 'fbase';
import React, { useState } from 'react';
import FileButton from './FileButton';
import SDButton from './SDButton';
import TextArea from './TextArea';
import styled from 'styled-components';
import { onFileChange, uploadFileURL } from 'utils';

const Section = styled.div`
  width: 80%;
  height: 100%;
  margin: 50px auto;
  max-width: 980px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: space-between;
`;

const ImgFilePreview = styled.div`
  width: 100%;
  height: 50%;
  margin: 0 auto;
  background-image: url(${({ backgroundURL }) => backgroundURL});
  background-repeat: no-repeat;
  background-size: 100% auto;
`;

const SsokEditor = ({ userObject }) => {
  const [ssok, setSsok] = useState('');
  const [attachment, setAttachment] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!ssok) return;
    let attachmentURL = '';
    if (attachment) {
      attachmentURL = await uploadFileURL(userObject.uid, attachment);
    }
    const ssokData = {
      text: ssok,
      createdAt: Date.now(),
      creatorId: userObject.uid,
      creatorName: userObject.displayName,
      creatorPhoto: userObject.photoURL,
      attachmentURL,
    };
    await dbService.collection('ssok').add(ssokData);
    setSsok('');
    setAttachment('');
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <Section>
      <form onSubmit={onSubmit}>
        <TextArea setSsok={(val) => setSsok(val)} ssok={ssok} />
        <ButtonWrapper>
          <FileButton
            onFileChange={onFileChange}
            setAttachment={setAttachment}
          />
          <SDButton />
        </ButtonWrapper>
      </form>
      {attachment && (
        <ImgFilePreview backgroundURL={attachment}>
          <button type="button" onClick={onClearAttachment}>
            삭제
          </button>
        </ImgFilePreview>
      )}
    </Section>
  );
};

export default SsokEditor;
