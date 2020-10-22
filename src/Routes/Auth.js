import React from 'react';
import AuthForm from 'components/AuthForm';
import styled, { keyframes } from 'styled-components';
import AuthSocialForm from 'components/AuthSocialForm';

const gradientKeyframes = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AuthWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientKeyframes} 15s ease infinite;
`;

const TitleLogo = styled.h1`
  font-size: 50px;
  text-align: center;
  font-family: 'Dancing Script';
`;

const FormWrap = styled.div`
  width: 60%;
  min-width: 300px;
  max-width: 450px;
  background-color: #eee;
  border-radius: 4px;
  margin-top: 30px;
  padding: 20px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Auth = () => (
  <AuthWrap>
    <TitleLogo>ssok ddak</TitleLogo>
    <FormWrap>
      <AuthForm />
      <AuthSocialForm />
    </FormWrap>
  </AuthWrap>
);

export default Auth;
