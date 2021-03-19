import React from 'react';
import Button from 'components/Button';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const SDButton = () => {
	const { addPostLoading } = useSelector(state => state.post);
	return (
		<Button buttonWidth="100px" isFullButton loading={addPostLoading}>
			<SubmitButton type="submit" value="쏙닥" disabled={addPostLoading} />
		</Button>
	);
};

export default SDButton;

const SubmitButton = styled.input`
	width: 100%;
	height: 100%;
	color: inherit;
	outline: none;
	font-size: 1.2rem;
`;
