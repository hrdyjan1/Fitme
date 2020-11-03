import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { PageNotFound } from './pages/PageNotFound';

export const route = {
  home: () => '/',
};

export function Routes() {
  return (
    <Switch>
      <Route path={route.home()} exact component={HomePage} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  );
}
