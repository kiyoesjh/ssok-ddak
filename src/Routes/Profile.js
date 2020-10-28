import Container from 'components/Container';
import Header from 'components/Header';
import ModalLayer from 'routes/ModalLayer';
import ProfileEditor from 'components/Profile/ProfileEditor';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Post from './Post';

const Profile = ({ userObject, refreshUserObj }) => {
  const [userName, setUserName] = useState(userObject.displayName);
  const [userPhoto, setUserPhoto] = useState(userObject.photoURL);
  const history = useHistory();
  const { url } = useRouteMatch();

  const logOutHandle = async () => {
    await authService.signOut();
    history.push('/');
  };
  // const getMySsoks = async () => {
  //   const ssoks = await dbService
  //     .collection('ssok')
  //     .where('creatorId', '==', userObject.uid)
  //     .orderBy('createdAt')
  //     .get();
  //   console.log(ssoks.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMySsoks();
  // }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName !== userName) {
      //변경
      await userObject.updateProfile({ displayName: userName });
      refreshUserObj();
    }
  };
  const onChange = ({ target: { value } }) => {
    setUserName(value);
  };
  return (
    <>
      <Container>
        <Header>{userName}</Header>
        {/* <ProfileEditor
        onSubmit={onSubmit}
        onChange={onChange}
        userName={userName}
      /> */}
        <Wrap>
          <UserPhoto>
            <UserImg src={userPhoto} />
          </UserPhoto>
          <Content>
            <ButtonWrap>
              <ProfileEditButton to={`${url}/edit`}>
                프로필 수정
              </ProfileEditButton>
            </ButtonWrap>
          </Content>
          <button type="button" onClick={logOutHandle}>
            logout
          </button>
        </Wrap>
      </Container>
      <Route path={`${url}/edit`}>
        <ModalLayer onClick={() => history.goBack()}>
          <div>test</div>
        </ModalLayer>
      </Route>
    </>
  );
};

export default Profile;

const Wrap = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 15px auto;
  ${device.tablet} {
    width: 90%;
  }
`;

const UserPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  border: 5px solid #fff;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  margin-top: -50px;
  border-radius: 5px;
  background: #fff;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;

const ProfileEditButton = styled(Link)`
  padding: 10px;
  background-color: #ddd;
  border-radius: 30px;
`;
