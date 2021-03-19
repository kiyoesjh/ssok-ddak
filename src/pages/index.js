import React from 'react';
import Home from 'components/Home';
import Auth from 'components/Auth';
import { useSelector } from 'react-redux';

const App = () => {
	const { userInfo } = useSelector(state => state.user);
	return <>{userInfo ? <Home /> : <Auth />}</>;
};

export default App;
