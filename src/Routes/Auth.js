import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
  const onSocialClick = async ({ target: { name } }) => {
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
      <div>
        <button type="button" name="google" onClick={onSocialClick}>
          Google로 시작하기
        </button>
        <button type="button" name="github" onClick={onSocialClick}>
          Github로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
