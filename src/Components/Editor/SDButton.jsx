import React, { useState } from 'react';
import Button from 'components/Button';
import styled from "styled-components";

const SubmitButton = styled.input`
  width: 100%;
  height: 100%;
  color: inherit;
  outline: none;
  font-size: 1.2rem;
`;

const SDButton = () => {
  const [isMousedown, setIsMousedown] = useState(false);
  const onDown = () => setIsMousedown(true);
  const onUp = () => setIsMousedown(false);

  return (
    <Button buttonWidth='100px'>
      <SubmitButton type="submit" value={isMousedown ? '딱' : '쏙'} onMouseDown={onDown} onMouseUp={onUp} />
    </Button>
  );
};

export default SDButton;
