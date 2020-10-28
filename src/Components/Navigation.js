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
import device, { NavigationResponseWidth } from 'styles/deviceSize';

const NavWrap = styled.div`
  display: flex;
  width: 100%;
  ${NavigationResponseWidth}
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: inherit;
  height: 50px;
  z-index: 99;
  ${device.tablet} {
    top: 0;
    height: 100%;
  }
`;

const NaviListWrap = styled.ul`
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
  ${device.tablet} {
    padding: 30px 0;
    height: 100%;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    background: #fff;
    &:after {
      display: none;
    }
  }
  ${NavigationResponseWidth}
`;

const NaviList = styled.li`
  position: relative;
  width: 100%;
  padding: 0 10px;
  color: #000;
  transition: all 0.2s;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
  &:hover {
    opacity: 1;
  }
`;

const NaviLink = styled(Link)`
  display: flex;
  transition: all 0.3s;
  padding: 5px 0;
  &:hover {
    > div {
      background-color: #eee;
    }
  }
`;

const LinkText = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
  font-size: 1.5rem;
`;

const NaviText = styled.span`
  display: none;
  ${device.tablet} {
    display: block;
    font-size: 20px;
    font-weight: bold;
    margin: 0 10px;
  }
  ${device.laptop} {
    display: none;
  }
`;

const iconStyle = {
  width: '1.7rem',
  height: '1.7rem',
  color: '#000',
};

const Navigation = ({ userObject }) => {
  const { pathname } = useLocation();
  return (
    <NavWrap>
      <Nav>
        <NaviListWrap>
          <NaviList selected={pathname === '/'}>
            <NaviLink to="/">
              <LinkText>
                <FontAwesomeIcon icon={faHome} style={iconStyle} />
                <NaviText>홈</NaviText>
              </LinkText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/search'}>
            <NaviLink to="/search">
              <LinkText>
                <FontAwesomeIcon icon={faSearch} style={iconStyle} />
                <NaviText>글찾기</NaviText>
              </LinkText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/post'}>
            <NaviLink to="/post">
              <LinkText>
                <FontAwesomeIcon icon={faPlus} style={iconStyle} />
                <NaviText>글쓰기</NaviText>
              </LinkText>
            </NaviLink>
          </NaviList>
          <NaviList selected={pathname === '/profile'}>
            {/* <Link to="/profile">{userObject.displayName}의 Profile</Link> */}
            <NaviLink to="/profile">
              <LinkText>
                <FontAwesomeIcon icon={faUser} style={iconStyle} />
                <NaviText>프로필</NaviText>
              </LinkText>
            </NaviLink>
          </NaviList>
        </NaviListWrap>
      </Nav>
    </NavWrap>
  );
};

export default Navigation;
