import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import wrapper from 'store/configureStore';
import { END } from 'redux-saga';
import styled from 'styled-components';
import { LOAD_POSTS_REQUEST } from 'reducers/post';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user';
import device from 'styles/deviceSize';
import Ssok from 'components/Ssok/Ssok';
import Header from 'components/Header';
import Container from 'components/Container';
import AppLayout from 'components/AppLayout';

const Home = () => {
	const {
		user,
		post: { ssoks, hasMorePosts, loadPostsLoading },
	} = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		const onScroll = () => {
			if (
				window.scrollY + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 400
			) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = ssoks[ssoks.length - 1]?.id;
					dispatch({
						type: LOAD_POSTS_REQUEST,
						lastId,
					});
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [hasMorePosts, loadPostsLoading, ssoks]);

	return (
		<AppLayout>
			<Container>
				<Header headText="쏙딱" />
				<ColumnWrap>
					<Wrap>
						{ssoks.map(ssok => (
							<Ssok key={ssok.id} ssokData={ssok} isOwner={ssok.User.id === user.me?.id} />
						))}
					</Wrap>
				</ColumnWrap>
			</Container>
		</AppLayout>
	);
};

export default Home;

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

const ColumnWrap = styled.div`
	width: 100%;
`;

const Wrap = styled.div`
	max-width: 1000px;
	margin: 0 auto 50px;
	padding: 15px 10px;
	${device.mobile} {
		width: 80%;
	}
	${device.tablet} {
		columns: unset;
		padding: 50px 10px;
		margin: 0 auto;
	}
	${device.laptop} {
		width: 100%;
		column-count: 3;
		column-gap: 15px;
	}
`;
