import React from 'react';
import SsokEditor from 'components/Editor/SsokEditor';
import Header from 'components/Header';
import Container from 'components/Container';
import AppLayout from 'components/AppLayout';

const Post = ({ userObject }) => {
	return (
		<AppLayout>
			<Container>
				<Header headText="글쓰기" />
				<SsokEditor userObject={userObject} />
			</Container>
		</AppLayout>
	);
};

export default Post;
