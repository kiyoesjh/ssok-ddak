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
  ${({ imgUrl }) =>
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
  background-color: #fff;
  border: 1px solid #ddd;
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
  padding: 15px 0;
  color: ${({ fontColor }) => fontColor};
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'RIDIBatang';
  text-align: center;
  z-index: 5;
`;

const UserSsok = ({ ssok }) => {
  return (
    <Container>
      <ImgWrap imgUrl={ssok.attachmentURL} />
      <Text fontColor={ssok.attachmentURL ? '#fff' : '#000'}>{ssok.text}</Text>
    </Container>
  );
};

export default UserSsok;
