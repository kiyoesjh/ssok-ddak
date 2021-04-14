import React, { useCallback, useState } from 'react';
import { faEdit, faTrashAlt, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from 'reducers/post';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from 'reducers/user';
import MorePop from '../Layer/MorePop';
import EditSsok from './EditSsok';

const Ssok = ({ ssokData, isOwner }) => {
	const [editing, setEditing] = useState(false); // 수정하고 있는지 아닌지에 대한 상태
	const [newSsok, setNewSsok] = useState(ssokData.content); // input값을 수정할 수 있는 상태값, 초기값=수정하기 전에 있던 텍스트
	const [isOpen, setIsOpen] = useState(false);
	const dispatch = useDispatch();
	const { me } = useSelector(state => state.user);

	const onSsokDelete = () => {
		dispatch({
			type: DELETE_POST_REQUEST,
			data: ssokData.id,
		});
	};
	const toggleEditing = () => {
		setEditing(prev => !prev);
		setIsOpen(false);
	};

	const liked = ssokData.Likers.find(v => v.id === me?.id);
	const onClickLike = useCallback(() => {
		if (liked) {
			return dispatch({
				type: UNLIKE_POST_REQUEST,
				data: ssokData.id,
			});
		}
		return dispatch({
			type: LIKE_POST_REQUEST,
			data: ssokData.id,
		});
	}, [liked]);

	const isFollowing = me?.Followings.find(v => v.id === ssokData.User.id);
	const onToggleFollow = useCallback(() => {
		if (isFollowing) {
			// 팔로잉 하고 있다면 언팔
			dispatch({
				type: UNFOLLOW_REQUEST,
				data: ssokData.User.id,
			});
		} else {
			dispatch({
				type: FOLLOW_REQUEST,
				data: ssokData.User.id,
			});
		}
	}, [isFollowing]);

	const onSubmit = event => {
		event.preventDefault();
		// try {
		// 	dbService.doc(`ssok/${ssokData.id}`).update({
		// 		text: newSsok,
		// 	});
		// } catch {}
		setEditing(false);
	};

	return (
		<Wrap>
			<UserInfoWrap>
				<UserInfo>
					<UserPhoto>
						<img src={ssokData.User.profileImg || '/images/user_img.png'} alt="배경이미지" />
					</UserPhoto>
					<UserName>{ssokData.User.nickname}</UserName>
				</UserInfo>
				{!isOwner && (
					<>
						<button type="button" onClick={onToggleFollow}>
							{!isFollowing ? '팔로우' : '팔로우 취소'}
						</button>
					</>
				)}
				{isOwner && ( // 글쓴 사람일 경우에만 수정, 삭제 버튼이 보일 수 있도록 체크
					<>
						<MorePop setIsOpen={setIsOpen} isOpen={isOpen}>
							<LayerButton type="button" onClick={onSsokDelete}>
								<FontAwesomeIcon icon={faTrashAlt} />
								<IconText>삭제하기</IconText>
							</LayerButton>
							<LayerButton type="button" onClick={toggleEditing}>
								<FontAwesomeIcon icon={faEdit} />
								<IconText>수정하기</IconText>
							</LayerButton>
						</MorePop>
					</>
				)}
			</UserInfoWrap>
			<PostContent>
				{editing ? ( // 수정하기를 눌렀다면? 폼이 나오게 된다.
					<EditSsok
						onSubmit={onSubmit}
						setNewSsok={setNewSsok}
						newSsok={newSsok}
						toggleEditing={toggleEditing}
					/>
				) : (
					<>
						{ssokData.Images.length ? (
							<>
								<ImgText>{ssokData.content}</ImgText>
								<PostImgWrap>
									{ssokData.Images.map(({ id, src }) => (
										<PostImg key={id} src={`http://localhost:3065/${src}`} />
									))}
								</PostImgWrap>
							</>
						) : (
							<EmptyDiv>
								<PostText>{ssokData.content}</PostText>
							</EmptyDiv>
						)}
						<Info>
							<CommentButton>
								<FontAwesomeIcon icon={faComment} />
								<span>0</span>
							</CommentButton>
							<LikeButton liked={liked} onClick={onClickLike}>
								<FontAwesomeIcon icon={faHeart} />
								<span>{ssokData.Likers.length}</span>
							</LikeButton>
						</Info>
					</>
				)}
			</PostContent>
		</Wrap>
	);
};

export default React.memo(Ssok);

Ssok.propTypes = {
	ssokData: PropTypes.shape({
		id: PropTypes.number.isRequired,
		User: PropTypes.shape({
			id: PropTypes.number.isRequired,
			nickname: PropTypes.string,
			profileImg: PropTypes.string,
		}),
		Images: PropTypes.arrayOf(PropTypes.object),
		category: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.number.isRequired,
		Likers: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
	isOwner: PropTypes.bool.isRequired,
};

const Wrap = styled.div`
	position: relative;
	width: 100%;
	margin: 0 auto 15px;
	break-inside: avoid;
`;

const UserInfoWrap = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	border-bottom: 0;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	padding: 10px;
	background-color: ${({ theme }) => theme.cardColor};
`;

const UserInfo = styled.div`
	display: flex;
	align-items: center;
`;

const UserPhoto = styled.div`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	overflow: hidden;
	> img {
		width: 100%;
		height: auto;
	}
`;

const UserName = styled.div`
	margin-left: 10px;
	color: ${({ theme }) => theme.boldColor};
`;

const PostContent = styled.div`
	position: relative;
`;

const Text = styled.p`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	white-space: pre-wrap;
	word-break: break-word;
	font-family: 'RIDIBatang';
	text-align: center;
	line-height: 1.5;
	${device.tablet} {
		font-size: 1.2rem;
	}
	${device.laptop} {
		font-size: 0.95rem;
	}
`;

const ImgText = styled(Text)`
	position: absolute;
	top: 0;
	left: 0;
	align-items: center;
	padding: 0 10px;
	color: #fff;
	z-index: 10;
`;

const PostText = styled(Text)`
	align-items: flex-start;
	padding: 30px 10px;
	color: ${({ theme }) => theme.boldColor};
`;

const PostWrap = styled.div`
	overflow: hidden;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`;

const PostImgWrap = styled(PostWrap)`
	position: relative;
	&:after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.3);
		content: '';
	}
`;

const PostImg = styled.img`
	display: block;
	width: 100%;
	height: auto;
`;

const LayerButton = styled.button`
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	color: ${({ theme }) => theme.fontColor};
	&:hover {
		background-color: ${({ theme }) => theme.lightColor};
	}
`;

const IconText = styled.span`
	padding-left: 8px;
	color: ${({ theme }) => theme.fontColor};
`;

const EmptyDiv = styled(PostWrap)`
	width: 100%;
	min-height: 100px;
	border-top: 1px solid ${({ theme }) => theme.borderColor};
	background-color: ${({ theme }) => theme.cardColor};
`;

const Info = styled.div`
	margin-top: 5px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	padding: 5px 10px;
	font-size: 14px;
`;

const CommentButton = styled.button``;

const LikeButton = styled.button`
	color: ${({ liked }) => (liked ? `red` : `inherit`)};
`;
