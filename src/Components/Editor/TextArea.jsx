import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.lightColor};
  flex: 1;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 240px;
  resize: none;
  padding: 10px;
  font-size: 1rem;
  background: none;
  color: ${({ theme }) => theme.boldColor};
  &::placeholder {
    color: ${({ theme }) => theme.boldColor};
    opacity: 0.8;
  }
`;

const TextArea = ({ setSsok, ssok }) => {
  const [height, setHeight] = useState();
  const onChange = ({ target }) => {
    const { value, scrollHeight } = target;
    setSsok(value);
    setHeight(scrollHeight);
  };
  const style = {
    height: `${height}px`,
  };
  return (
    <Container>
      <Textarea
        onChange={onChange}
        value={ssok}
        placeholder="적고 싶은 글이나 기억하고 싶은 글을 적어보세요."
        maxLength={300}
        style={style}
      />
    </Container>
  );
};

export default TextArea;
