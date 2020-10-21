import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ userObject, refreshUserObj }) => {
  const [userName, setUserName] = useState(userObject.displayName);
  const history = useHistory();
  const logOutHandle = async () => {
    await authService.signOut();
    history.push('/');
  };
  // const getMySsoks = async () => {
  //   const ssoks = await dbService
  //     .collection('ssok')
  //     .where('creatorId', '==', userObject.uid)
  //     .orderBy('createdAt')
  //     .get();
  //   console.log(ssoks.docs.map((doc) => doc.data()));
  // };
  // useEffect(() => {
  //   getMySsoks();
  // }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObject.displayName !== userName) {
      //변경
      await userObject.updateProfile({ displayName: userName });
      refreshUserObj();
    }
  };
  const onChange = ({ target: { value } }) => {
    setUserName(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
        />
        <input type="submit" value="Update" />
      </form>
      <button type="button" onClick={logOutHandle}>
        logout
      </button>
    </>
  );
};

export default Profile;
