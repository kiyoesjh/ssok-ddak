import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { onFileChange, uploadFileURL } from 'utils';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #eee;
  line-height: 1.5;
  margin: 20px 0;
  border-radius: 5px;
`;

const ProfileImgWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 50%;
  background: #eee no-repeat center;
  background-image: ${({ photo }) => `url(${photo})`};
  background-size: 100% auto;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border-radius: 50%;
`;

const FileInput = styled.input`
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
`;

const SubmitInput = styled.input`
  width: 100%;
  padding: 10px;
  color: #fff;
`;

const ProfileEditor = ({ refreshUserObj, userObject, ssoks }) => {
  const [userName, setUserName] = useState(userObject.displayName);
  const [userPhoto, setUserPhoto] = useState('');
  const history = useHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName === userName && !userPhoto) return;
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
      <Form onSubmit={onSubmit}>
        <ProfileImgWrap photo={userPhoto || userObject.photoURL}>
          <Label htmlFor="file_upload">
            <FontAwesomeIcon icon={faPlus} />
          </Label>
          <FileInput
            id="file_upload"
            type="file"
            accept="image/*"
            onChange={(event) => onFileChange(event, setUserPhoto)}
          />
        </ProfileImgWrap>
        <NameInput
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
        />
        <Button buttonWidth="100%" isFullButton={true}>
          <SubmitInput type="submit" value="Update" />
        </Button>
      </Form>
    </Wrap>
  );
};

export default ProfileEditor;
