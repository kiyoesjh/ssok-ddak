import React from 'react';
import styled from 'styled-components';

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
  color: ${({ isAttachment, theme }) =>
    isAttachment ? '#fff' : `${theme.boldColor}`};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'RIDIBatang';
  text-align: center;
  z-index: 5;
`;

const UserSsok = ({ ssok }) => {
  const { attachmentURL } = ssok;
  return (
    <Container>
      <ImgWrap imgUrl={attachmentURL} />
      <Text isAttachment={Boolean(attachmentURL)}>{ssok.text}</Text>
    </Container>
  );
};

export default React.memo(UserSsok);
