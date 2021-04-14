import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';

import wrapper from 'store/configureStore';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user';
import Home from 'components/Home';
import Auth from 'components/Auth';
import { LOAD_POSTS_REQUEST } from 'reducers/post';

const App = () => {
	const { me } = useSelector(state => state.user);
	return <>{me ? <Home /> : <Auth />}</>;
};

export const getServerSideProps = wrapper.getServerSideProps(async context => {
	const cookie = context.req ? context.req.headers.cookie : ''; // 서버 쪽에서 실행하면 context.req 가 존재한다.
	axios.defaults.headers.Cookie = '';
	if (cookie && context.req) {
		axios.defaults.headers.Cookie = cookie;
	}
	context.store.dispatch({
		type: LOAD_MY_INFO_REQUEST,
	});
	context.store.dispatch({
		type: LOAD_POSTS_REQUEST,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default App;
