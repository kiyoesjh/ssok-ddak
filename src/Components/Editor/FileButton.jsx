import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const FileButton = ({ onFileChange }) => {
	const onChange = useCallback(e => {
		onFileChange(e);
	});
	return (
		<>
			<FileUploadLabel htmlFor="file_upload">
				<FontAwesomeIcon icon={faImage} />
			</FileUploadLabel>
			<FileUploadButton
				id="file_upload"
				type="file"
				accept="image/*"
				multiple
				onChange={onChange}
			/>
		</>
	);
};

export default FileButton;

FileButton.propTypes = {
	onFileChange: PropTypes.func.isRequired,
};

const FileUploadLabel = styled.label`
	font-size: 1.75rem;
	width: 45px;
	height: 45px;
	margin: 0 10px;
	padding: 10px;
	color: ${({ theme }) => theme.mainColor(1)};
	background-color: ${({ theme }) => theme.mainColor(0.1)};
	cursor: pointer;
	border-radius: 50%;
	&:hover {
		color: ${({ theme }) => theme.mainColor(0.5)};
	}
`;

const FileUploadButton = styled.input`
	position: absolute;
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	z-index: -1;
`;
