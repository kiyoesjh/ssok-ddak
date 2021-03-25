import React from 'react';
import styled from 'styled-components';
import device from 'styles/deviceSize';
import Navigation from './Navigation';

const AppLayout = ({ children }) => {
	return (
		<Wrap>
			<Navigation />
			{children}
		</Wrap>
	);
};

export default AppLayout;

const Wrap = styled.div`
	min-height: 100vh;
	${device.tablet} {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
`;
