import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import wrapper from 'store/configureStore';
import { END } from 'redux-saga';
import styled, { keyframes } from 'styled-components';

import AuthForm from 'components/Auth/AuthForm';
import AuthSocialForm from 'components/Auth/AuthSocialForm';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user';

const Login = () => {
	const { me } = useSelector(state => state.user);
	const router = useRouter();

	useEffect(() => {
		if (me) {
			router.push('/');
			return;
		}
	}, [me]);

	return (
		<AuthWrap>
			<TitleLogo>ssok ddak</TitleLogo>
			<FormWrap>
				<AuthForm />
				<AuthSocialForm />
			</FormWrap>
		</AuthWrap>
	);
};

export default Login;

export const getServerSideProps = wrapper.getServerSideProps(async context => {
	const cookie = context.req ? context.req.headers.cookie : ''; // 서버 쪽에서 실행하면 context.req 가 존재한다.
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

const gradientKeyframes = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const AuthWrap = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: ${gradientKeyframes} 15s ease infinite;
`;

const TitleLogo = styled.h1`
	font-size: 50px;
	text-align: center;
	font-family: 'Dancing Script';
	color: #000;
`;

const FormWrap = styled.div`
	width: 60%;
	min-width: 300px;
	max-width: 450px;
	background-color: #eee;
	border-radius: 4px;
	margin-top: 30px;
	padding: 20px;
	box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;
