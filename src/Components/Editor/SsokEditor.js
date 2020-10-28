import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FileButton from './FileButton';
import SDButton from './SDButton';
import TextArea from './TextArea';
import styled from 'styled-components';
// import { Editor, EditorState, convertToRaw } from 'draft-js';

const SsokEditor = ({ userObject }) => {
  const [ssok, setSsok] = useState('');
  const [attachment, setAttachment] = useState();
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!ssok) return;
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
      creatorName: userObject.displayName,
      creatorPhoto: userObject.photoURL,
      attachmentURL,
    };
    await dbService.collection('ssok').add(ssokData);
    setSsok('');
    setAttachment('');
  };

  // const onChange = (editorState) => {
  //   const contentState = editorState.getCurrentContent();
  //   console.log(JSON.stringify(convertToRaw(contentState)));
  //   setEditorState(editorState);
  // };

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
    <Section>
      <form onSubmit={onSubmit}>
        <TextArea setSsok={(val) => setSsok(val)} ssok={ssok} />
        {/* <div contentEditable="true" onInput={getText}></div> */}
        {/* <Editor editorState={editorState} onChange={onChange} /> */}
        <ButtonWrapper>
          <FileButton onFileChange={onFileChange} />
          <SDButton />
        </ButtonWrapper>
      </form>
      {attachment && (
        <ImgFilePreview backgroundURL={attachment}>
          {/* <img src={attachment} /> */}
          <button type="button" onClick={onClearAttachment}>
            삭제
          </button>
        </ImgFilePreview>
      )}
    </Section>
  );
};

export default SsokEditor;

const Section = styled.div`
  width: 80%;
  height: 100%;
  margin: 10px auto;
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
