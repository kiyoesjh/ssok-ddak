import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Auth from 'pages/auth';
import Home from 'pages/home';
import Post from 'pages/post';
import Profile from 'pages/profile';
import ResultSearch from 'pages/resultSearch';
import Search from 'pages/search';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObject, refreshUserObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Navigation userObject={userObject} />
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route path="/profile">
              <Profile
                userObject={userObject}
                refreshUserObj={refreshUserObj}
              />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path={`/search/:tag`}>
              <ResultSearch userObject={userObject} />
            </Route>
            <Route exact path="/post">
              <Post userObject={userObject} />
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            <Redirect from="*" to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
};

export default React.memo(AppRouter);
