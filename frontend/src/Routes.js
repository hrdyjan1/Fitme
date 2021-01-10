import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { route, pages } from 'src/constants/routes';

import { Footer } from 'src/components/molecules';
import { Navbar } from 'src/components/organisms/header/navbar';
import {
  HomePage,
  PageNotFound,
  UserProfilePage,
  SportPlacesPage,
  TrainerDetailPage,
  TrainerProfilePage,
  PlaceProfilePage,
  SportPlaceDetailPage,
} from 'src/pages';

export function Routes() {
  return (
    <>
      <Navbar />
      <div className="app-wrapper">
        <Switch>
          <Route path={route.home()} exact component={HomePage} />
          <Route path={route.profile()} exact component={UserProfilePage} />
          <Route path={route.sportPlaces()} exact component={SportPlacesPage} />
          <Route path={route.editSportPlace()} exact component={PlaceProfilePage} />
          <Route path={route.trainerDetail()} exact component={TrainerDetailPage} />
          <Route path={route.trainerProfile()} exact component={TrainerProfilePage} />
          <Route path={route.sportPlaceDetail()} exact component={SportPlaceDetailPage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
      <Footer pages={pages} />
    </>
  );
}
