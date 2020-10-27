import React from 'react';
import { useState } from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 10px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 100px;
  resize: none;
`;


const TextArea = ({setSsok, ssok}) => {
  const [height, setHeight] = useState();
  const onChange = ({ target }) => {
    const {value, scrollHeight} = target;
    setSsok(value);
    setHeight(scrollHeight);
  }
  const style = {
    height: `${height}px`
  }
  return (
    <Container>
      <Textarea
          onChange={onChange}
          value={ssok}
          placeholder="이야기를 적어주세요"
          maxLength={128}
          style={style}
        />
    </Container>
  );
};

export default TextArea;
