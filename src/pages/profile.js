import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

import Container from 'components/Container';
import AppLayout from 'components/AppLayout';
import Header from 'components/Header';
import UserSsoks from 'components/Profile/UserSsoks';
import ProfileEditor from 'components/Profile/ProfileEditor';
import ModalLayer from 'components/Modal';

const Profile = () => {
	const { userInfo } = useSelector(state => state.user);
	const router = useRouter();
	useEffect(() => {
		if (!userInfo) {
			router.push('/');
		}
	}, [userInfo]);

	if (!userInfo) {
		return null;
	}

	return (
		<AppLayout>
			<Head>
				<title>내 프로필 | ssok ddak</title>
			</Head>
			<Container>
				<Header headText={userInfo.nickname || userInfo.email} />
				<Wrap>
					<UserInfoWrap>
						<UserPhotoWrap>
							<UserPhoto>
								<UserImg src={userInfo.photoURL || '/images/user_img.png'} />
							</UserPhoto>
						</UserPhotoWrap>
						<UserInfo>
							<UserNameWrapper>
								<UserName>{userInfo.nickname || userInfo.email}</UserName>
								<ButtonWrap>
									<Link href="/profile/?edit=true" as="/profile/edit">
										<ProfileEditButton>프로필 수정</ProfileEditButton>
									</Link>
								</ButtonWrap>
							</UserNameWrapper>
							<UserInfoList>
								<li>게시글 0</li>
								<li>팔로우 {userInfo.Followings.length}</li>
								<li>팔로워 {userInfo.Followers.length}</li>
							</UserInfoList>
						</UserInfo>
					</UserInfoWrap>
					<Content>{!!userInfo.Posts.length && <UserSsoks />}</Content>
				</Wrap>
			</Container>

			{router.query.edit && (
				<ModalLayer onClick={() => router.back()}>
					<ProfileEditor userObject={userInfo} />
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

const Content = styled.div`
	width: 90%;
	margin: 0 auto;
	min-height: 400px;
	padding-top: 30px;
	border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ButtonWrap = styled.div`
	/* display: flex;
	justify-content: flex-end; */
	margin-left: 15px;
`;

const grayButtonStyle = css`
	display: block;
	padding: 10px;
	/* background-color: ${({ theme }) => theme.lightColor}; */
	border: 1px solid ${({ theme }) => theme.mainColor(1)};
	border-radius: 30px;
	color: ${({ theme }) => theme.mainColor(1)};
`;

const ProfileEditButton = styled.a`
	${grayButtonStyle}
`;
