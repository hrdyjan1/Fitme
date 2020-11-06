import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';
import { SignInPage } from './pages/SignInPage';

export const route = {
  home: () => '/',
  signin: () => '/signin',
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path={route.signin()} exact component={SignInPage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
