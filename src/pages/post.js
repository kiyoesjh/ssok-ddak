import React from 'react';
import SsokEditor from 'components/Editor/SsokEditor';
import Header from 'components/Header';
import Container from 'components/Container';
import AppLayout from 'components/AppLayout';

const Post = () => {
	return (
		<AppLayout>
			<Container>
				<Header headText="글쓰기" />
				<SsokEditor />
			</Container>
		</AppLayout>
	);
};

export default Post;
