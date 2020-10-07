import React, { memo } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Auth from '../routes/Auth';

const Router = ({ user, updateUser }) => {
  return (
    <HashRouter>
      {user && <Navigation user={user} />}
      <Switch>
        {user ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile user={user} updateUser={updateUser} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default memo(Router);
