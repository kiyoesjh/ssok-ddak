import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Loading from './Loading';

const Button = ({ children, buttonWidth, isFullButton = false, gap, loading }) => {
	return (
		<StyledButton
			buttonWidth={buttonWidth}
			isFullButton={isFullButton}
			gap={gap}
			disabled={loading}
		>
			{loading ? <Loading /> : children}
		</StyledButton>
	);
};

export default Button;

Button.propTypes = {
	children: PropTypes.element.isRequired,
	buttonWidth: PropTypes.string.isRequired,
	isFullButton: PropTypes.bool,
	gap: PropTypes.string,
	loading: PropTypes.bool,
};

const widthStyles = css`
	width: ${({ buttonWidth }) => buttonWidth};
`;

const disabledStyles = css`
	background-color: ${({ theme }) => theme.borderColor};
	border: ${({ theme }) => theme.borderColor};
`;

const StyledButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 30px;
	color: ${({ theme }) => theme.mainColor(1)};
	border: 1px solid ${({ theme }) => theme.mainColor(1)};
	${({ isFullButton, theme }) =>
		isFullButton &&
		`
      background-color: ${theme.mainColor(1)};
      color: #fff;
    `};
	transition: 0.3s;
	${({ gap }) => gap && `margin: ${gap}`};
	${({ disabled }) => disabled && disabledStyles};
	${widthStyles};
`;
