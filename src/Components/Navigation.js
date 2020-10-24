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

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 99;
`;

const NaviListWrap = styled.ul`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
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
    content: '';
  }
`;

const NaviList = styled.li`
  position: relative;
  width: 30px;
  height: 30px;
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
  width: 100%;
  height: 100%;
`;

const Navigation = ({ userObject }) => {
  const { pathname } = useLocation();
  return (
    <Nav>
      <NaviListWrap>
        <NaviList selected={pathname === '/'}>
          <NaviLink to="/">
            <FontAwesomeIcon icon={faHome} size="lg" color="#000" />
          </NaviLink>
        </NaviList>
        <NaviList>
          <NaviLink to="/search">
            <FontAwesomeIcon icon={faSearch} size="lg" color="#000" />
          </NaviLink>
        </NaviList>
        <NaviList>
          <NaviLink to="/post">
            <FontAwesomeIcon icon={faPlus} size="lg" color="#000" />
          </NaviLink>
        </NaviList>
        <NaviList selected={pathname === '/profile'}>
          {/* <Link to="/profile">{userObject.displayName}의 Profile</Link> */}
          <NaviLink to="/profile">
            <FontAwesomeIcon icon={faUser} size="lg" color="#000" />
          </NaviLink>
        </NaviList>
      </NaviListWrap>
    </Nav>
  );
};

export default Navigation;
