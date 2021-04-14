import React from 'react';
import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user';
import wrapper from 'store/configureStore';
import { LOAD_POST_REQUEST } from 'reducers/post';
import AppLayout from 'components/AppLayout';
import Container from 'components/Container';
import Header from 'components/Header';
import { useSelector } from 'react-redux';
import Ssok from 'components/Ssok/Ssok';
import Head from 'next/head';

const Post = () => {
	const { singleSsok } = useSelector(state => state.post);
	const user = useSelector(state => state.user);

	return (
		<AppLayout>
			<Head>
				<title>{singleSsok.User.nickname}님의 게시글</title>
				<meta name="description" content={singleSsok.content} />
				<meta property="og:title" content={`${singleSsok.User.nickname}님의 게시글`} />
				<meta property="og:description" content={singleSsok.content} />
				<meta property="og:image" content={singleSsok.Images[0]?.src || '/favicon.ico'} />
			</Head>
			<Container>
				<Header headText="게시글" />
				<Ssok ssokData={singleSsok} isOwner={singleSsok.User.id === user.me?.id} />
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
	context.store.dispatch({
		type: LOAD_POST_REQUEST,
		data: context.params.id,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default Post;
