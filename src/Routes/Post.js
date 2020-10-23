import SsokFactory from 'components/SsokFactory';
import React from 'react';

const Post = ({ userObject }) => {
  return (
    <div>
      <SsokFactory userObject={userObject} />
    </div>
  );
};

export default Post;
