import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { route } from './constants/routes';

import {
  HomePage, PageNotFound, SignInPage, UserProfilePage,
} from './pages';

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signin()} exact component={SignInPage} />
      <Route path={route.profile()} exact component={UserProfilePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
