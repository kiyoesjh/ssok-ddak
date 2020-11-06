import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from 'fbase';
import styled, { css } from 'styled-components';
import ThemeButton from 'components/ThemeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCog } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import device from 'styles/deviceSize';

const Wrap = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

const MoreButton = styled.button`
  display: flex;
  width: 100%;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  outline: none;
  font-size: 1.7rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

const PopList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 210px;
  ${({ position }) => position};
  background-color: #eee;
  border-radius: 5px;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 21;
  ${device.tablet} {
    margin: 10px 0;
    &:before {
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: -5px;
      left: 50px;
      background-color: #eee;
      transform: rotate(45deg) translate(-50%, 50%);
      box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
      z-index: -1;
      content: '';
    }
  }
  ${device.laptop} {
    &:before {
      left: 50%;
    }
  }
`;

const ButtonList = styled.div`
  width: 100%;
  padding: 15px;
  border-top: 1px solid #ccc;
  background-color: #eee;
  ${({ first }) => first && buttonListFirstChild};
  ${({ last }) => last && buttonListLastChild};
`;

const buttonListFirstChild = css`
  border: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const buttonListLastChild = css`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const SettingPop = ({ children, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const togglePop = () => setIsOpen((prev) => !prev);

  const logOutHandle = async () => {
    await authService.signOut();
    history.push('/');
  };

  return (
    <Wrap>
      <MoreButton onClick={togglePop}>
        <FontAwesomeIcon icon={faCog} />
        {children}
      </MoreButton>
      {isOpen && (
        <>
          <Overlay onClick={() => setIsOpen(false)} />
          <PopList position={position}>
            <ButtonList first>
              <ThemeButton />
            </ButtonList>
            <ButtonList last>
              <button type="button" onClick={logOutHandle}>
                계정에서 로그아웃
              </button>
            </ButtonList>
          </PopList>
        </>
      )}
    </Wrap>
  );
};

export default SettingPop;
