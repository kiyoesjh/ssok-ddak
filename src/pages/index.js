import React from 'react';
import Home from 'components/Home';
import Auth from 'components/Auth';
import { useSelector } from 'react-redux';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return <>{isLoggedIn ? <Home /> : <Auth />}</>;
};

export default App;
