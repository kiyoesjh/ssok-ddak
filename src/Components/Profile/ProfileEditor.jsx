import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import FileButton from 'components/Editor/FileButton';
import { onFileChange, uploadFileURL } from 'utils';
import { dbService, storageService } from 'fbase';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ProfileEditor = ({ refreshUserObj, userObject, ssoks }) => {
  const [userName, setUserName] = useState(userObject.displayName);
  const [userPhoto, setUserPhoto] = useState('');
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName == userName && !userPhoto) return;
    //user info update,
    //db ssok 에 있는 user info update
    const editObj = {
      userInfo: {},
      ssokUserInfo: {},
    };
    if (userObject.displayName !== userName) {
      editObj.userInfo['displayName'] = userName;
      editObj.ssokUserInfo['creatorName'] = userName;
    }
    if (userPhoto) {
      await storageService.refFromURL(userObject.photoURL).delete();
      const uploadURL = await uploadFileURL(userObject.uid, userPhoto);
      editObj.userInfo['photoURL'] = uploadURL;
      editObj.ssokUserInfo['creatorPhoto'] = uploadURL;
    }
    await userObject.updateProfile(editObj.userInfo); //user정보 업데이트
    ssoks.forEach((ssok) => {
      //db정보 업데이트
      dbService.doc(`ssok/${ssok.id}`).update(editObj.ssokUserInfo);
    });
    refreshUserObj();
    setUserPhoto('');
    history.push('/profile');
  };

  const onChange = ({ target: { value } }) => {
    setUserName(value);
  };

  return (
    <Wrap>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
        />
        <FileButton onFileChange={onFileChange} setAttachment={setUserPhoto} />
        <input type="submit" value="Update" />
      </form>
    </Wrap>
  );
};

export default ProfileEditor;
