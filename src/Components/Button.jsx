import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

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

const Loading = styled.span`
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 3px solid rgba(255, 255, 255, 0.3);
	border-radius: 50%;
	border-top-color: #fff;
	animation: spin 1s ease-in-out infinite;
	-webkit-animation: spin 1s ease-in-out infinite;

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
	@-webkit-keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
`;
