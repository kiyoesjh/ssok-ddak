import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //onAuthStateChanged는 로그인, 로그아웃, 어플리케이션이 초기화 될 떄 발생한다.
      if (user) {
        setUserObject(user);
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObject)} userObject={userObject} />
      ) : (
        'loading...'
      )}
    </>
  );
}

export default App;
