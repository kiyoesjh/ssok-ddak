import React from 'react';
import { authService, firebaseInstance } from 'fbase';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';

const SocialForm = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 20px 0 10px;
  border-top: 1px solid #ccc;
  justify-content: space-around;
`;

const ButtonWrap = styled.button`
  display: flex;
  align-items: center;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 18px;
`;

const ButtonText = styled.span`
  margin-left: 5px;
`;

const AuthSocialForm = () => {
  const onSocialClick = async ({ currentTarget: { name } }) => {
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };
  return (
    <SocialForm>
      <ButtonWrap type="button" name="google" onClick={onSocialClick}>
        <Icon icon={faGoogle} />
        <ButtonText>구글로 시작하기</ButtonText>
      </ButtonWrap>
      <ButtonWrap type="button" name="github" onClick={onSocialClick}>
        <Icon icon={faGithub} />
        <ButtonText>깃허브로 시작하기</ButtonText>
      </ButtonWrap>
    </SocialForm>
  );
};

export default AuthSocialForm;
