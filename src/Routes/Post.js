import React from 'react';
import SsokEditor from 'components/Editor/SsokEditor';
import Header from 'components/Header';
import Container from 'components/Container';

const Post = ({ userObject }) => {
  return (
    <Container>
      <Header headText="글쓰기" />
      <SsokEditor userObject={userObject} />
    </Container>
  );
};

export default Post;
