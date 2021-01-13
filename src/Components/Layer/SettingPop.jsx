import React from 'react';
import styled, { css } from 'styled-components';
import ThemeButton from 'components/ThemeButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
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
  color: ${({ theme }) => theme.boldColor};
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

const PopList = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 210px;
  ${({ position }) => position};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 99;
  ${device.tablet} {
    margin: 10px 0;
    &:before {
      position: absolute;
      width: 10px;
      height: 10px;
      bottom: -5px;
      left: 50px;
      background-color: ${({ theme }) => theme.backgroundColor};
      transform: rotate(45deg) translate(-50%, 50%);
      box-shadow: ${({ theme }) => theme.boxShadow};
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
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.boldColor};
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

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  outline: none;
  padding: 15px;
  color: inherit;
`;

const SettingPop = ({ children, position }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const history = useHistory();
  const togglePop = () => setIsOpen((prev) => !prev);

  const logOutHandle = async () => {
    // await authService.signOut();
    // history.push('/');
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
              <ThemeButton setIsOpen={setIsOpen} />
            </ButtonList>
            <ButtonList last>
              <LogoutButton type="button" onClick={logOutHandle}>
                계정에서 로그아웃
              </LogoutButton>
            </ButtonList>
          </PopList>
        </>
      )}
    </Wrap>
  );
};

export default React.memo(SettingPop);
