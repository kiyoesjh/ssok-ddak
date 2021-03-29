import React, { useEffect } from 'react';
import Home from 'components/Home';
import Auth from 'components/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from 'reducers/user';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch({
			type: LOAD_MY_INFO_REQUEST,
		});
	}, []);
	const { userInfo } = useSelector(state => state.user);
	return <>{userInfo ? <Home /> : <Auth />}</>;
};

export default App;
