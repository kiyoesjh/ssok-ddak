import React, { useCallback } from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import { useSelector } from 'react-redux';
import UserSsok from './UserSsok';

const UserSsoks = () => {
	const {
		user: {
			me: { Posts },
		},
		post,
	} = useSelector(state => state);

	const filterPost = useCallback(postId => {
		return post.ssoks.filter(({ id }) => id === postId);
	});
	return (
		<Container>
			{Posts.map(({ id }) => filterPost(id).map(ssok => <UserSsok key={ssok.id} ssok={ssok} />))}
		</Container>
	);
};

export default React.memo(UserSsoks);

const Container = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	grid-template-rows: repeat(auto-fill, minmax(200px, auto));
	grid-auto-rows: minmax(200px, auto);
	gap: 10px;
	margin: 20px 0;
	${device.custom('630px')} {
		grid-template-columns: repeat(3, 1fr);
	}
`;
