import React from 'react';
// import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';
// import ModalLayer from 'pages/ModalLayer';
// import ProfileEditor from 'components/Profile/ProfileEditor';
import styled, { css } from 'styled-components';
import UserSsoks from 'components/Profile/UserSsoks';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProfileEditor from 'components/Profile/ProfileEditor';
import AppLayout from 'components/AppLayout';
import ModalLayer from '../../components/Modal';

const Profile = () => {
	const { userInfo } = useSelector(state => state.user);
	const router = useRouter();

	return (
		<AppLayout>
			<Head>
				<title>내 프로필 | ssok ddak</title>
			</Head>
			<Container>
				<Header headText={userInfo.nickname || userInfo.email} />
				<Wrap>
					<UserInfoWrap>
						<UserInfo>
							<UserPhoto>
								<UserImg src={userInfo.photoURL} />
							</UserPhoto>
							<UserName>{userInfo.nickname || userInfo.email}</UserName>
						</UserInfo>
						<ButtonWrap>
							<Link href={`/profile/?edit=${true}`} as="/profile/edit">
								<ProfileEditButton>프로필 수정</ProfileEditButton>
							</Link>
						</ButtonWrap>
					</UserInfoWrap>
					<Content>{!!userInfo.Post.length && <UserSsoks ssoks={userInfo.Post} />}</Content>
				</Wrap>
			</Container>

			{router.query.edit && (
				<ModalLayer onClick={() => router.back()}>
					<ProfileEditor refreshUserObj={null} userObject={userInfo} ssoks={userInfo.Post} />
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
	align-items: flex-end;
	width: 90%;
	margin: 0 auto;
	justify-content: space-between;
	margin-bottom: 20px;
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
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

const UserName = styled.strong`
	font-size: 1.6rem;
	color: ${({ theme }) => theme.fontColor};
	display: block;
	margin: 0 40px;
`;

const Content = styled.div`
	width: 90%;
	margin: 0 auto;
	min-height: 400px;
	padding-top: 30px;
	border-top: 1px solid ${({ theme }) => theme.borderColor};
`;

const ButtonWrap = styled.div`
	display: flex;
	justify-content: flex-end;
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
