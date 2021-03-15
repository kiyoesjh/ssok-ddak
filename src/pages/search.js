import React from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
// import { Link, useRouteMatch } from 'react-router-dom';
import Container from 'components/Container';
import device from 'styles/deviceSize';
import tags from 'category';

const Search = () => {
	return (
		<>
			<Container>
				<Header headText="검색" />
				<Content>
					<ListWrap>
						{Object.keys(tags).map(tag => (
							<List key={tag}>
								<ListLink category={tag} type="button" to={`/search/${tag}`} value={tag}>
									{tags[tag]}
								</ListLink>
							</List>
						))}
					</ListWrap>
				</Content>
			</Container>
		</>
	);
};

export default Search;

const Content = styled.div`
	display: flex;
	width: 100%;
	padding: 10px 0 60px;
	${device.tablet} {
		height: 100%;
		align-items: center;
		justify-content: center;
	}
`;

const ListWrap = styled.ul`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(200px, auto));
	grid-auto-rows: minmax(200px, auto);
	gap: 10px;
	width: 90%;
	margin: 0 auto;
	${device.tablet} {
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, minmax(200px, auto));
	}
`;

const List = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ListLink = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: ${({ theme, category }) => theme.categoryColor[category]};
	border-radius: 5px;
	box-shadow: ${({ theme }) => theme.boxShadow};
	color: #fff;
	font-family: 'RIDIBatang';
	font-size: 1.5rem;
`;
