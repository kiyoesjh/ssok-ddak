import React from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Post from 'routes/Post';
import Profile from 'routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObject, refreshUserObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile">
              <Profile
                userObject={userObject}
                refreshUserObj={refreshUserObj}
              />
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

export default AppRouter;
