import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onFileChange /* uploadFileURL */ } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from 'reducers/user';
import { useRouter } from 'next/router';
import Loading from 'components/Button/Loading';

const ProfileEditor = () => {
	const userInfo = useSelector(state => state.user.userInfo);
	const [userName, setUserName] = useState(userInfo.nickname);
	const [userPhoto, setUserPhoto] = useState('');
	const { changeNicknameLoading, changeNicknameDone } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const router = useRouter();

	const onSubmit = async event => {
		event.preventDefault();
		if (userInfo.nickname === userName && !userPhoto) return;

		if (userInfo.nickname !== userName) {
			dispatch({
				type: CHANGE_NICKNAME_REQUEST,
				data: userName,
			});
		}
		if (userPhoto) {
			// await storageService.refFromURL(userInfo.photoURL).delete();
			// const uploadURL = await uploadFileURL(userInfo.uid, userPhoto);
			// console.log(uploadURL);
			// editObj.userInfo.photoURL = uploadURL;
			// editObj.ssokUserInfo.creatorPhoto = uploadURL;
		}
	};

	const onChange = ({ target: { value } }) => {
		setUserName(value);
	};

	useEffect(() => {
		if (changeNicknameDone) {
			setUserPhoto('');
			router.push('/profile');
		}
	}, []);

	return (
		<Wrap>
			<Form onSubmit={onSubmit}>
				<ProfileImgWrap photo={userPhoto || userInfo.profileImage || '/images/user_img.png'}>
					<Label htmlFor="file_upload">
						<FontAwesomeIcon icon={faPlus} />
					</Label>
					<FileInput
						id="file_upload"
						type="file"
						accept="image/*"
						onChange={event => onFileChange(event, setUserPhoto)}
					/>
				</ProfileImgWrap>
				<NameInput type="text" placeholder="Display name" value={userName} onChange={onChange} />
				<Button buttonWidth="100%" isFullButton>
					<SubmitInput type="submit">
						{changeNicknameLoading ? <Loading /> : '업데이트'}
					</SubmitInput>
				</Button>
			</Form>
		</Wrap>
	);
};

export default React.memo(ProfileEditor);

const Wrap = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	padding: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const NameInput = styled.input`
	width: 100%;
	padding: 10px;
	background-color: #eee;
	line-height: 1.5;
	margin: 20px 0;
	border-radius: 5px;
`;

const ProfileImgWrap = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
	height: 150px;
	overflow: hidden;
	margin: 0 auto;
	border-radius: 50%;
	background: #eee no-repeat center;
	background-image: ${({ photo }) => `url(${photo})`};
	background-size: 100% auto;
`;

const Label = styled.label`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-size: 1.5rem;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.3);
	cursor: pointer;
	border-radius: 50%;
`;

const FileInput = styled.input`
	position: absolute;
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
`;

const SubmitInput = styled.button`
	width: 100%;
	padding: 10px;
	color: #fff;
`;
