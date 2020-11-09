import React, { useContext } from 'react';
import Context from 'context';
import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
  padding: 15px;
  color: inherit;
`;

const ThemeButton = ({ setIsOpen }) => {
  const { state, dispatch } = useContext(Context);

  const handleToggleClick = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
    setIsOpen(false);
  };
  return (
    <>
      <Button type="button" onClick={handleToggleClick}>
        {state.isDark ? '라이트모드' : '다크모드'}로 변경하기
      </Button>
    </>
  );
};

export default ThemeButton;
