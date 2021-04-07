import React, { useReducer } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import 'styles/App.css';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';
import themeReducer from 'reducer/themeReducer';
import Context from 'context';
import wrapper from 'store/configureStore';
import PropTypes from 'prop-types';

const SsokDdak = ({ Component }) => {
	const [state, dispatch] = useReducer(themeReducer, {
		isDark: false,
	});
	return (
		<>
			<Context.Provider value={{ state, dispatch }}>
				<ThemeProvider theme={state.isDark ? theme.dark : theme.light}>
					<GlobalStyles />
					<Head>
						<title>ssok ddak</title>
					</Head>
					<Component />
				</ThemeProvider>
			</Context.Provider>
		</>
	);
};

export default wrapper.withRedux(SsokDdak);

SsokDdak.propTypes = {
	Component: PropTypes.elementType.isRequired,
};
