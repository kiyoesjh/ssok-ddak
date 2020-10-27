import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FileButton from './FileButton';
import SDButton from './SDButton';
import TextArea from './TextArea';
import styled from 'styled-components';
import { containerWidth } from 'styles/deviceSize';
// import { Editor, EditorState, convertToRaw } from 'draft-js';

const SsokEditor = ({ userObject }) => {
  const [ssok, setSsok] = useState('');
  const [attachment, setAttachment] = useState();
  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

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
    <Container>
      <form onSubmit={onSubmit}>
        <TextArea setSsok={(val) => setSsok(val)} ssok={ssok} />
        {/* <div contentEditable="true" onInput={getText}></div> */}
        {/* <Editor editorState={editorState} onChange={onChange} /> */}
        <FileButton onFileChange={onFileChange} />
        <SDButton />
      </form>
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button type="button" onClick={onClearAttachment}>
            삭제
          </button>
        </div>
      )}
    </Container>
  );
};

export default SsokEditor;

const Container = styled.div`
  width: 100%;
  ${containerWidth}
`;
