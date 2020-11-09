import Container from 'components/Container';
import Header from 'components/Header';
import ModalLayer from 'routes/ModalLayer';
import ProfileEditor from 'components/Profile/ProfileEditor';
import { dbService } from 'fbase';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import UserSsoks from 'components/Profile/UserSsoks';

const Wrap = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 50px auto;
`;

const UserInfoWrap = styled.div`
  display: flex;
  align-items: flex-end;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserPhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
  height: auto;
`;

const UserName = styled.strong`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.fontColor};
  display: block;
  margin: 0 40px;
`;

const Content = styled.div`
  width: 90%;
  margin: 0 auto;
  min-height: 400px;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const grayButtonStyle = css`
  display: block;
  padding: 10px;
  /* background-color: ${({ theme }) => theme.lightColor}; */
  border: 1px solid ${({ theme }) => theme.mainColor(1)};
  border-radius: 30px;
  color: ${({ theme }) => theme.mainColor(1)};
`;

const ProfileEditButton = styled(Link)`
  ${grayButtonStyle}
`;

const Profile = ({ userObject, refreshUserObj }) => {
  const [ssoks, setSsoks] = useState([]);
  const history = useHistory();
  const { url } = useRouteMatch();

  const getMySsoks = useCallback(async () => {
    const userSsoks = await dbService
      .collection('ssok')
      .where('creatorId', '==', userObject.uid)
      .orderBy('createdAt')
      .get();
    const ssokArr = userSsoks.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSsoks(ssokArr);
  }, [userObject]);

  useEffect(() => {
    getMySsoks();
  }, [getMySsoks]);

  return (
    <>
      <Container>
        <Header headText={userObject.displayName} />
        <Wrap>
          <UserInfoWrap>
            <UserInfo>
              <UserPhoto>
                <UserImg src={userObject.photoURL} />
              </UserPhoto>
              <UserName>{userObject.displayName}</UserName>
            </UserInfo>
            <ButtonWrap>
              <ProfileEditButton to={`${url}/edit`}>
                프로필 수정
              </ProfileEditButton>
            </ButtonWrap>
          </UserInfoWrap>
          <Content>{ssoks && <UserSsoks ssoks={ssoks} />}</Content>
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
