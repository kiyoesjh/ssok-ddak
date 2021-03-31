import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

const UserSsok = ({ ssok }) => {
	// const { attachmentURL } = ssok;
	return (
		<Container>
			<ImgWrap imgUrl={ssok.Images[0]} />
			<Text isAttachment={Boolean(ssok.Images[0])}>{ssok.content}</Text>
		</Container>
	);
};

export default React.memo(UserSsok);

UserSsok.propTypes = {
	ssok: PropTypes.shape({
		id: PropTypes.number,
		Images: PropTypes.arrayOf(PropTypes.string),
		Likers: PropTypes.arrayOf(PropTypes.object),
		User: PropTypes.shape({
			id: PropTypes.number,
			nickname: PropTypes.string,
		}),
		UserId: PropTypes.number,
		content: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}),
};

const Container = styled.div`
	position: relative;
`;

const ImgWrap = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	${({ imgUrl, theme }) =>
		imgUrl
			? `
    background-image: url(${imgUrl});
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.3);
      content: "";
    }`
			: `
    background-color: ${theme.cardColor};
  `}
`;

const Text = styled.p`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 20px 10px;
	color: ${({ isAttachment, theme }) => (isAttachment ? '#fff' : `${theme.boldColor}`)};
	line-height: 1.5;
	white-space: pre-wrap;
	word-break: break-word;
	font-family: 'RIDIBatang';
	text-align: center;
	z-index: 5;
`;
