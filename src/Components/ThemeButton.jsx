import React, { useContext } from 'react';
import Context from 'context';

const ThemeButton = () => {
  const { state, dispatch } = useContext(Context);

  const handleToggleClick = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
  return (
    <>
      <button type="button" onClick={handleToggleClick}>
        {state.isDark ? '라이트모드' : '다크모드'}로 변경하기
      </button>
    </>
  );
};

export default ThemeButton;
