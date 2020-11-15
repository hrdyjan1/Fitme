import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom';
import { route } from './constants/routes';

import {
  HomePage, PageNotFound, SignInPage, UserProfilePage, UploadImagePage,
} from './pages';

export function Routes() {
  return (
    <Fragment>
      <TopBar/>
      <div className="app-wrapper">
        <Switch>
          <Route path={route.home()} exact component={HomePage} />
          <Route path={route.signin()} exact component={SignInPage} />
          <Route path={route.profile()} exact component={UserProfilePage} />
          <Route path={route.uploadImage()} exact component={UploadImagePage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </Fragment>
  );
}
