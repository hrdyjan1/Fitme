import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { route, pages } from 'src/constants/routes';

import { Footer } from 'src/components/spec/Footer';
import { Navbar } from 'src/components/organisms/header/navbar';
import {
  HomePage,
  PageNotFound,
  UserProfilePage,
  SportPlacesPage,
} from './pages';
import Account from './components/organisms/account';

export function Routes() {
  return (
    <>
      <Navbar />
      <div className="app-wrapper">
        <Switch>
          <Route path={route.home()} exact component={HomePage} />
          <Route path={route.profile()} exact component={UserProfilePage} />
          <Route path={route.sportPlaces()} exact component={SportPlacesPage} />
          <Route path={route.editSportPlace()} exact component={Account} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
      <Footer pages={pages} />
    </>
  );
}
