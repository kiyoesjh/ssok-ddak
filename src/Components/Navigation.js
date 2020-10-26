import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faSearch,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import device from 'styles/deviceSize';

const NavWrap = styled.div`
  display: flex;
  /* flex-grow: 1; */
  width: 100%;
  @media ${device.tablet} {
    width: 200px;
  }
  @media ${device.laptop} {
    width: 80px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  z-index: 99;
  @media ${device.tablet} {
    width: 200px;
    height: 100%;
  }
  @media ${device.laptop} {
    width: 80px;
  }
`;

const NaviListWrap = styled.ul`
  position: fixed;
  bottom: 0;
  /* left: 0; */
  display: flex;
  width: inherit;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  &:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    opacity: 0.8;
    z-index: -1;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    content: '';
  }
  @media ${device.tablet} {
    top: 0;
    /* left: 0; */
    padding-left: 30px;
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const NaviList = styled.li`
  position: relative;
  color: #000;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`;

const NaviLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NaviText = styled.span`
  display: none;
  @media ${device.tablet} {
    display: block;
    font-size: 20px;
    font-weight: bold;
    padding-left: 10px;
  }
  @media ${device.laptop} {
    display: none;
  }
`;

const Navigation = ({ userObject }) => {
  const { pathname } = useLocation();
  return (
    <NavWrap>
      <Nav>
        <NaviListWrap>
          <NaviList selected={pathname === '/'}>
            <NaviLink to="/">
              <FontAwesomeIcon icon={faHome} size="lg" color="#000" />
              <NaviText>홈</NaviText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/search'}>
            <NaviLink to="/search">
              <FontAwesomeIcon icon={faSearch} size="lg" color="#000" />
              <NaviText>글찾기</NaviText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/post'}>
            <NaviLink to="/post">
              <FontAwesomeIcon icon={faPlus} size="lg" color="#000" />
              <NaviText>글쓰기</NaviText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/profile'}>
            {/* <Link to="/profile">{userObject.displayName}의 Profile</Link> */}
            <NaviLink to="/profile">
              <FontAwesomeIcon icon={faUser} size="lg" color="#000" />
              <NaviText>프로필</NaviText>
            </NaviLink>
          </NaviList>
        </NaviListWrap>
      </Nav>
    </NavWrap>
  );
};

export default Navigation;
