import React, { useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import axios from 'axios';
import { END } from 'redux-saga';
import {
	LOAD_FOLLOWINGS_REQUEST,
	LOAD_FOLLOWERS_REQUEST,
	LOAD_MY_INFO_REQUEST,
	LOAD_USER_REQUEST,
} from 'reducers/user';
import { LOAD_USER_POSTS_REQUEST } from 'reducers/post';
import Container from 'components/Container';
import AppLayout from 'components/AppLayout';
import Header from 'components/Header';
import UserSsoks from 'components/Profile/UserSsoks';
import ModalLayer from 'components/Modal';
import wrapper from 'store/configureStore';

const User = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useDispatch();
	const {
		hasMorePosts,
		loadPostsLoading,
		ssoks,
		loadPostsError,
		loadFollowingsError,
		loadFollowersError,
	} = useSelector(state => state.post);

	const { userInfo, me } = useSelector(state => state.user);
	const isMe = parseInt(id, 10) === me.id;
	const user = useMemo(() => (isMe ? me : userInfo), [isMe, me, userInfo]);
	console.log(isMe);
	useEffect(() => {
		if (router.query.followings) {
			console.log(user.id);
			dispatch({
				type: LOAD_FOLLOWINGS_REQUEST,
				data: user.id,
				isMe,
			});
		}
	}, [router.query.followings]);

	useEffect(() => {
		if (router.query.followers) {
			dispatch({
				type: LOAD_FOLLOWERS_REQUEST,
				data: user.id,
				isMe,
			});
		}
	}, [router.query.followers]);

	useEffect(() => {
		const onScroll = () => {
			if (
				window.scrollY + document.documentElement.clientHeight >
				document.documentElement.scrollHeight - 400
			) {
				if (hasMorePosts && !loadPostsLoading) {
					const lastId = ssoks[ssoks.length - 1]?.id;
					dispatch({
						type: LOAD_USER_POSTS_REQUEST,
						data: id,
						lastId,
					});
				}
			}
		};

		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [hasMorePosts, loadPostsLoading, ssoks]);

	useEffect(() => {
		if (loadPostsError) {
			alert(loadPostsError);
		} else if (loadFollowersError) {
			alert(loadFollowersError);
		} else if (loadFollowingsError) {
			alert(loadFollowingsError);
		}
	}, [loadPostsError, loadFollowersError, loadFollowingsError]);

	return (
		<AppLayout>
			<Head>
				<title>@{user.nickname} | ssok ddak</title>
			</Head>
			<Container>
				<Header headText={user.nickname || me.nickname} />
				<Wrap>
					<UserInfoWrap>
						<UserPhotoWrap>
							<UserPhoto>
								<UserImg src={user.photoURL || '/images/user_img.png'} />
							</UserPhoto>
						</UserPhotoWrap>
						<UserInfo>
							<UserNameWrapper>
								<UserName>{user.nickname || user.email}</UserName>
								{me && (
									<ButtonWrap>
										{isMe && (
											<Link href="/profile/?edit=true" as="/profile/edit">
												<ProfileEditButton>프로필 수정</ProfileEditButton>
											</Link>
										)}
										{!isMe && (
											<>
												{me.Followings.filter(following => user.id === following.id).length ? (
													<button type="button">팔로우 취소</button>
												) : (
													<button type="button">팔로우</button>
												)}
											</>
										)}
									</ButtonWrap>
								)}
							</UserNameWrapper>
							<UserInfoList>
								<li>
									<ListButton type="button">
										게시글 <Length>{user.Posts.length}</Length>
									</ListButton>
								</li>
								<li>
									<Link
										href={`/user/${user.id}/?followings=${true}`}
										as={`/user/${user.id}/?followings`}
									>
										<FollowListButton>
											팔로우 <Length>{user.Followings.length}</Length>
										</FollowListButton>
									</Link>
								</li>
								<li>
									<Link
										href={`/user/${user.id}/?followers=${true}`}
										as={`/user/${user.id}/?followers`}
									>
										<FollowListButton>
											팔로워 <Length>{user.Followers.length}</Length>
										</FollowListButton>
									</Link>
								</li>
							</UserInfoList>
						</UserInfo>
					</UserInfoWrap>
					<Content>{!!ssoks.length && <UserSsoks />}</Content>
				</Wrap>
			</Container>

			{router.query.followings && (
				<ModalLayer onClick={() => router.back()}>
					<div>
						{console.log(user.Followings)}
						{user.Followings.map(item => (
							<div key={item.id}>{item.nickname}</div>
						))}
					</div>
				</ModalLayer>
			)}
			{router.query.followers && (
				<ModalLayer onClick={() => router.back()}>
					<div>
						{console.log(user.Followers)}
						{user.Followers.map(item => (
							<div key={item.id}>{item.nickname}</div>
						))}
					</div>
				</ModalLayer>
			)}
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
		type: LOAD_USER_REQUEST,
		data: context.params.id,
	});
	context.store.dispatch({
		type: LOAD_USER_POSTS_REQUEST,
		data: context.params.id,
	});
	context.store.dispatch(END);
	await context.store.sagaTask.toPromise();
});

export default User;

const Wrap = styled.div`
	width: 100%;
	max-width: 1000px;
	margin: 50px auto;
`;

const UserInfoWrap = styled.div`
	display: flex;
	align-items: center;
	width: 90%;
	margin: 0 auto;
	margin-bottom: 20px;
`;

const UserPhotoWrap = styled.div`
	display: flex;
	align-items: center;
	flex-basis: 0;
	flex-grow: 1;
`;

const UserPhoto = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 150px;
	margin: 0 auto;
	border-radius: 50%;
	overflow: hidden;
`;

const UserImg = styled.img`
	width: 100%;
	height: auto;
`;

const UserInfo = styled.div`
	margin-left: 40px;
	display: flex;
	flex-direction: column;
	flex-basis: 30px;
	flex-grow: 2;
`;

const UserNameWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
`;

const UserName = styled.strong`
	font-size: 25px;
	color: ${({ theme }) => theme.fontColor};
`;

const UserInfoList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	> li {
		margin-left: 10px;
		&:first-child {
			margin-left: 0;
		}
	}
`;

const ListButton = styled.button`
	cursor: pointer;
`;

const FollowListButton = styled.a`
	cursor: pointer;
`;

const Length = styled.span`
	font-weight: bold;
`;

const Content = styled.div`
	width: 90%;
	margin: 0 auto;
	min-height: 400px;
	padding-top: 30px;
	border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ButtonWrap = styled.div`
	margin-left: 15px;
`;

const ProfileEditButton = styled.a`
	display: block;
	padding: 10px;
	border: 1px solid ${({ theme }) => theme.mainColor(1)};
	border-radius: 30px;
	color: ${({ theme }) => theme.mainColor(1)};
	cursor: pointer;
`;
