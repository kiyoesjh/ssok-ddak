import React, { useState } from 'react';
import { authService } from 'fbase';
import styled from 'styled-components';

const FormWrapper = styled.div`
  width: 100%;
`;

const InputBox = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  color: #888;
  padding: 0 8px;
  border-radius: 3px;
`;

const ActiveSubmit = styled.input`
  width: 100%;
  height: 40px;
  background-color: #14274e;
  text-align: center;
  color: #fff;
  border-radius: 3px;
  margin-top: 15px;
  cursor: pointer;
`;

const ToggleButtonWrap = styled.div`
  margin-top: 40px;
  text-align: right;
`;

const ToggleText = styled.span`
  color: #aaa;
  margin-right: 5px;
`;

const ToggleButton = styled.button`
  color: #000;
  text-decoration: underline;
`;

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');

  const onChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        //계정만들기
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        //로그인
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <FormWrapper>
        <form onSubmit={onSubmit}>
          <InputBox
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            required
            value={email}
            onChange={onChange}
          />
          <InputBox
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            required
            value={password}
            onChange={onChange}
          />
          <ActiveSubmit
            type="submit"
            value={newAccount ? '회원가입' : '로그인'}
          />
        </form>
        <ToggleButtonWrap>
          <ToggleText>
            {newAccount ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
          </ToggleText>
          <ToggleButton type="button" onClick={toggleAccount}>
            {newAccount ? '로그인' : '회원가입'}
          </ToggleButton>
        </ToggleButtonWrap>
      </FormWrapper>
      <p>{error}</p>
    </>
  );
};

export default AuthForm;
