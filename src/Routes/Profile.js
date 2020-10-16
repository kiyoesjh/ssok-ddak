import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const logOutHandle = async () => {
    await authService.signOut();
    history.push('/');
  };
  return (
    <>
      <button type="button" onClick={logOutHandle}>
        logout
      </button>
      Profile
    </>
  );
};

export default Profile;
