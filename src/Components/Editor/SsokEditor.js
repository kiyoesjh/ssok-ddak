import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGE_REQUEST } from 'reducers/post';
import FileButton from './FileButton';
import SDButton from './SDButton';
import TextArea from './TextArea';
import RadioButton from './RadioButton';

const SsokEditor = () => {
	const [ssok, setSsok] = useState('');
	// const [attachment, setAttachment] = useState('');
	const [category, setCategory] = useState('other');

	const dispatch = useDispatch();
	const imagePaths = useSelector(state => state.post.imagePaths);

	// const onClearAttachment = () => setAttachment(null);

	const { addPostDone } = useSelector(state => state.post);

	const onFileChange = event => {
		const imagesFormData = new FormData();
		[].forEach.call(event.target.files, v => {
			imagesFormData.append('image', v);
		});
		dispatch({
			type: UPLOAD_IMAGE_REQUEST,
			data: imagesFormData,
		});
	};

	const onDeleteImage = useCallback(index => () => {
		dispatch({
			type: REMOVE_IMAGE,
			data: index,
		});
	});

	const onSubmit = async event => {
		event.preventDefault();
		if (!ssok) return;
		if (!imagePaths.length) {
			dispatch({
				type: ADD_POST_REQUEST,
				data: {
					content: ssok,
					image: null,
				},
			});
			return;
		}
		const formData = new FormData();
		imagePaths.forEach(path => {
			formData.append('image', path);
		});
		formData.append('content', ssok);
		dispatch({
			type: ADD_POST_REQUEST,
			data: formData,
		});
	};

	useEffect(() => {
		if (addPostDone) {
			setSsok('');
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
					<FileButton onFileChange={onFileChange} />
					<SDButton />
				</ButtonWrapper>
			</form>
			{!!imagePaths.length &&
				imagePaths.map((imagePath, idx) => (
					<ImgFilePreview backgroundURL={`http://localhost:3065/${imagePath}`}>
						<CloseButton type="button" onClick={onDeleteImage(idx)}>
							<FontAwesomeIcon icon={faTimesCircle} />
						</CloseButton>
					</ImgFilePreview>
				))}
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
