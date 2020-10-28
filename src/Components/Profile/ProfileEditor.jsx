import React from 'react';

const ProfileEditor = ({onSubmit, onChange, userName}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={userName}
          onChange={onChange}
        />
        <input type="submit" value="Update" />
      </form>
      </div>
  );
};

export default ProfileEditor;