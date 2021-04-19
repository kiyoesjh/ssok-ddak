import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import device, { NavigationResponseWidth } from 'styles/deviceSize';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import SettingPop from './Layer/SettingPop';

const Navigation = () => {
	const router = useRouter();
	const { me } = useSelector(state => state.user);
	const id = me?.id;
	return (
		<NavWrap>
			<Nav>
				<NaviListWrap>
					<NaviList selected={router.pathname === '/'}>
						<NaviLink href="/">
							<a>
								<LinkText>
									<FontAwesomeIcon icon={faHome} fixedWidth />
									<NaviText>홈</NaviText>
								</LinkText>
							</a>
						</NaviLink>
					</NaviList>
					<NaviList selected={router.pathname === '/search'}>
						<NaviLink href="/search">
							<a>
								<LinkText>
									<FontAwesomeIcon icon={faSearch} fixedWidth />
									<NaviText>글찾기</NaviText>
								</LinkText>
							</a>
						</NaviLink>
					</NaviList>
					<NaviList selected={router.pathname === '/write'}>
						<NaviLink href="/write">
							<a>
								<LinkText>
									<FontAwesomeIcon icon={faPlus} fixedWidth />
									<NaviText>글쓰기</NaviText>
								</LinkText>
							</a>
						</NaviLink>
					</NaviList>
					<NaviList selected={router.pathname === `/user/${id}`}>
						<NaviLink href={id ? `/user/${id}` : '/login'}>
							<a>
								<LinkText>
									<FontAwesomeIcon icon={faUser} fixedWidth />
									<NaviText>프로필</NaviText>
								</LinkText>
							</a>
						</NaviLink>
					</NaviList>
				</NaviListWrap>
				<ProfileWrap>
					<SettingPop position="bottom: 100%; left: 10px;">
						<NaviText>설정</NaviText>
					</SettingPop>
				</ProfileWrap>
			</Nav>
		</NavWrap>
	);
};

export default Navigation;

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
	border-top: 1px solid ${({ theme }) => theme.borderColor};
	${device.tablet} {
		flex-direction: column;
		background-color: ${({ theme }) => theme.backgroundColor};
		top: 0;
		height: 100%;
		border-top: 0;
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
		background: ${({ theme }) => theme.backgroundColor};
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
		background: ${({ theme }) => theme.backgroundColor};
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
	color: ${({ theme }) => theme.boldColor};
	transition: all 0.2s;
	opacity: ${({ selected }) => (selected ? 1 : 0.5)};
	&:hover {
		opacity: 1;
	}
`;

const NaviLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	padding: 5px 0;
	&:hover {
		> div {
			background-color: ${({ theme }) => theme.lightColor};
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
	${device.laptop} {
		display: block;
		font-size: 20px;
		font-weight: bold;
		margin: 0 10px;
	}
`;

const ProfileWrap = styled.div`
	display: none;
	${device.tablet} {
		display: block;
		width: 100%;
	}
`;
