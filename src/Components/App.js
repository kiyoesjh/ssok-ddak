import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
  const [init, setInit] = useState(false);
  const [userObject, setUserObject] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //onAuthStateChanged는 로그인, 로그아웃, 어플리케이션이 초기화 될 때 발생한다.
      if (user) {
        setUserObject({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObject(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUserObj = () => {
    // setUserObject(authService.currentUser);
    const user = authService.currentUser;
    setUserObject({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObject)}
          userObject={userObject}
          refreshUserObj={refreshUserObj}
        />
      ) : (
        'loading...'
      )}
    </>
  );
}

export default App;
