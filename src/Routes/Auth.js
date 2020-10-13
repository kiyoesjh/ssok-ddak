import { authService } from 'fbase';
import React, { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
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
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? '회원가입' : '로그인'} />
      </form>
      <div>
        <button type="button" onClick={toggleAccount}>
          {newAccount ? '로그인' : '회원가입'}
        </button>
        <button type="button">Google로 시작하기</button>
        <button type="button">Github로 시작하기</button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default Auth;
