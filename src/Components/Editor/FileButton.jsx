import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';

const FileUploadLabel = styled.label`
  font-size: 1.75rem;
  width: 45px;
  height: 45px;
  padding: 10px;
  color: ${({ theme }) => theme.lightMode.mainColor(1)};
  background-color: ${({ theme }) => theme.lightMode.mainColor(0.1)};
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    color: ${({ theme }) => theme.lightMode.mainColor(0.5)};
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

const FileButton = ({ onFileChange, setAttachment }) => {
  return (
    <>
      <FileUploadLabel htmlFor="file_upload">
        <FontAwesomeIcon icon={faImage} />
      </FileUploadLabel>
      <FileUploadButton
        id="file_upload"
        type="file"
        accept="image/*"
        onChange={(event) => onFileChange(event, setAttachment)}
      />
    </>
  );
};

export default FileButton;
