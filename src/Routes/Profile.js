import Container from 'components/Container';
import Header from 'components/Header';
import ModalLayer from 'routes/ModalLayer';
import ProfileEditor from 'components/Profile/ProfileEditor';
import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import UserSsoks from 'components/Profile/UserSsoks';

const Profile = ({ userObject, refreshUserObj }) => {
  const [ssoks, setSsoks] = useState([]);
  const history = useHistory();
  const { url } = useRouteMatch();

  const logOutHandle = async () => {
    await authService.signOut();
    history.push('/');
  };

  const getMySsoks = async () => {
    const userSsoks = await dbService
      .collection('ssok')
      .where('creatorId', '==', userObject.uid)
      .orderBy('createdAt')
      .get();
    // console.log(ssoks.docs.map((doc) => doc.data()));
    const ssokArr = userSsoks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSsoks(ssokArr);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) getMySsoks();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Container>
        <Header>{userObject.displayName}</Header>
        <Wrap>
          <UserPhoto>
            <UserImg src={userObject.photoURL} />
          </UserPhoto>
          <Content>
            <ButtonWrap>
              <ProfileEditButton to={`${url}/edit`}>
                프로필 수정
              </ProfileEditButton>
            </ButtonWrap>
            {ssoks && <UserSsoks ssoks={ssoks} />}
          </Content>
          <button type="button" onClick={logOutHandle}>
            logout
          </button>
        </Wrap>
      </Container>
      <Route path={`${url}/edit`}>
        <ModalLayer onClick={() => history.goBack()}>
          <ProfileEditor
            refreshUserObj={refreshUserObj}
            userObject={userObject}
            ssoks={ssoks}
          />
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
  min-height: 400px;
  padding: 10px;
  margin-top: -50px;
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
