import React from 'react';

const FileButton = ({onFileChange}) => {
  return (
    <>
      <input type="file" accept="image/*" onChange={onFileChange} />
    </>
  );
};

export default FileButton;