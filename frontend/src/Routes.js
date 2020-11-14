import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';

import { TopBar } from 'src/organisms/header/TopBar'
import { HomePage, SignInPage, PageNotFound, UserProfilePage } from './pages';

export const route = {
  home: () => '/',
  signin: () => '/signin',
  profile: () => '/profile'
};

export function Routes() {
  return (
    <Fragment>
      <TopBar/>
        <div className="app-wrapper">
          <Switch>
            <Route path={route.home()} exact component={HomePage} />
            <Route path={route.signin()} exact component={SignInPage} />
            <Route path={route.profile()} exact component={UserProfilePage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </div>
    </Fragment>
  );
}
