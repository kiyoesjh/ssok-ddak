import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { onFileChange } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequestAction } from 'reducers/post';
import FileButton from './FileButton';
import SDButton from './SDButton';
import TextArea from './TextArea';
import RadioButton from './RadioButton';

const SsokEditor = () => {
	const [ssok, setSsok] = useState('');
	const [attachment, setAttachment] = useState('');
	const [category, setCategory] = useState('other');

	const dispatch = useDispatch();

	const onClearAttachment = () => setAttachment(null);

	const { addPostDone } = useSelector(state => state.post);

	const onSubmit = async event => {
		event.preventDefault();
		if (!ssok) return;
		dispatch(addPostRequestAction(ssok));
	};

	useEffect(() => {
		if (addPostDone) {
			setSsok('');
			setAttachment('');
		}
	}, [addPostDone]);

	return (
		<Section>
			<form onSubmit={onSubmit}>
				<TagWrap>
					<RadioButton setCategory={setCategory} category={category} />
					<TextArea setSsok={val => setSsok(val)} ssok={ssok} />
				</TagWrap>
				<ButtonWrapper>
					<FileButton onFileChange={onFileChange} setAttachment={setAttachment} />
					<SDButton />
				</ButtonWrapper>
			</form>
			{attachment && (
				<ImgFilePreview backgroundURL={attachment}>
					<CloseButton type="button" onClick={onClearAttachment}>
						<FontAwesomeIcon icon={faTimesCircle} />
					</CloseButton>
				</ImgFilePreview>
			)}
		</Section>
	);
};

export default SsokEditor;

const Section = styled.div`
	width: 80%;
	height: 100%;
	margin: 50px auto;
	max-width: 980px;
`;

const ButtonWrapper = styled.div`
	display: flex;
	margin: 10px 0;
	justify-content: flex-end;
`;

const ImgFilePreview = styled.div`
	display: flex;
	width: 100%;
	height: 50%;
	margin: 20px auto;
	background-image: url(${({ backgroundURL }) => backgroundURL});
	background-repeat: no-repeat;
	background-size: 100% auto;
	align-items: flex-start;
	justify-content: flex-end;
`;

const CloseButton = styled.button`
	display: flex;
	width: 45px;
	height: 45px;
	align-items: center;
	justify-content: center;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.8);
	font-size: 2rem;
`;

const TagWrap = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
`;
