import React from 'react';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST } from 'reducers/user';
import SsokEditor from 'components/Editor/SsokEditor';
import Header from 'components/Header';
import Container from 'components/Container';
import AppLayout from 'components/AppLayout';
import wrapper from 'store/configureStore';

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

export const getServerSideProps = wrapper.getServerSideProps(async context => {
	const cookie = context.req ? context.req.headers.cookie : '';
	axios.defaults.headers.Cookie = '';
	if (cookie && context.req) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Post;
