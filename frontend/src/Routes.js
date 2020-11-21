import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { route } from 'src/constants/routes';

import { TopBar } from 'src/components/organisms/header/TopBar';
import { Navbar } from 'src/components/organisms/header/navbar';
import {
  HomePage, PageNotFound, SignInPage, UserProfilePage, UploadImagePage,
} from './pages';

export function Routes() {
  return (
    <>
      <Navbar />
      <TopBar />
      <div className="app-wrapper">
        <Switch>
          <Route path={route.home()} exact component={HomePage} />
          <Route path={route.signin()} exact component={SignInPage} />
          <Route path={route.profile()} exact component={UserProfilePage} />
          <Route path={route.uploadImage()} exact component={UploadImagePage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}
