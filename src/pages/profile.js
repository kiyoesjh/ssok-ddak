import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_REQUEST } from 'reducers/user';

import Container from 'components/Container';
import AppLayout from 'components/AppLayout';
import Header from 'components/Header';
import UserSsoks from 'components/Profile/UserSsoks';
import ProfileEditor from 'components/Profile/ProfileEditor';
import ModalLayer from 'components/Modal';

const Profile = () => {
	const { me } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();
	useEffect(() => {
		if (!me) {
			router.push('/');
		}
	}, [me]);

	useEffect(() => {
		if (router.query.followings) {
			dispatch({
				type: LOAD_FOLLOWINGS_REQUEST,
			});
		}
	}, [router.query.followings]);

	useEffect(() => {
		if (router.query.followers) {
			dispatch({
				type: LOAD_FOLLOWERS_REQUEST,
			});
		}
	}, [router.query.followers]);

	if (!me) {
		return null;
	}

	return (
		<AppLayout>
			<Head>
				<title>내 프로필 | ssok ddak</title>
			</Head>
			<Container>
				<Header headText={me.nickname || me.email} />
				<Wrap>
					<UserInfoWrap>
						<UserPhotoWrap>
							<UserPhoto>
								<UserImg src={me.photoURL || '/images/user_img.png'} />
							</UserPhoto>
						</UserPhotoWrap>
						<UserInfo>
							<UserNameWrapper>
								<UserName>{me.nickname || me.email}</UserName>
								<ButtonWrap>
									<Link href="/profile/?edit=true" as="/profile/edit">
										<ProfileEditButton>프로필 수정</ProfileEditButton>
									</Link>
								</ButtonWrap>
							</UserNameWrapper>
							<UserInfoList>
								<li>
									<ListButton type="button">
										게시글 <Length>{me.Posts.length}</Length>
									</ListButton>
								</li>
								<li>
									<Link href="/profile/?followings=true" as="/profile/followings">
										<FollowListButton>
											팔로우 <Length>{me.Followings.length}</Length>
										</FollowListButton>
									</Link>
								</li>
								<li>
									<Link href="/profile/?followers=true" as="/profile/followers">
										<FollowListButton>
											팔로워 <Length>{me.Followers.length}</Length>
										</FollowListButton>
									</Link>
								</li>
							</UserInfoList>
						</UserInfo>
					</UserInfoWrap>
					<Content>{!!me.Posts.length && <UserSsoks />}</Content>
				</Wrap>
			</Container>

			{router.query.edit && (
				<ModalLayer onClick={() => router.back()}>
					<ProfileEditor userObject={me} />
				</ModalLayer>
			)}
			{router.query.followings && (
				<ModalLayer onClick={() => router.back()}>
					<div>
						{me.Followings.map(({ id, nickname }) => (
							<div key={id}>{nickname}</div>
						))}
					</div>
				</ModalLayer>
			)}
			{router.query.followers && (
				<ModalLayer onClick={() => router.back()}>
					<div>
						{me.Followers.map(({ id, nickname }) => (
							<div key={id}>{nickname}</div>
						))}
					</div>
				</ModalLayer>
			)}
		</AppLayout>
	);
};

export default Profile;

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
