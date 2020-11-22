import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { route } from 'src/constants/routes';

import { Footer } from 'src/components/spec/Footer';
import { Navbar } from 'src/components/organisms/header/navbar';
import {
  HomePage, PageNotFound, SignInPage, UserProfilePage, UploadImagePage,
} from './pages';

const pages = {
  web: {
    id: 'web-pages',
    title: 'Web',
    children: {
      profile: {
        groupTitle: 'Profil',
        pages: [
          {
            title: 'Coworking',
            href: '/coworking',
          },
          {
            title: 'Rental',
            href: '/rental',
          },
        ],
      },
      sportPlaces: {
        groupTitle: 'Sportoviste',
        pages: [
          {
            title: 'Desktop App',
            href: '/desktop-app',
          },
          {
            title: 'Mobile App',
            href: '/mobile-app',
          },
        ],
      },
      web: {
        groupTitle: 'Web',
        pages: [
          {
            title: 'Overview',
            href: '/home',
          },
          {
            title: 'Basic',
            href: '/web-basic',
          },
          {
            title: 'Service',
            href: '/service',
          },
        ],
      },
      external: {
        groupTitle: 'Externi',
        pages: [
          {
            title: 'Github',
            href: 'https://github.com/hrdyjan1/Fitme',
          },

        ],
      },
    },
  },
};

export function Routes() {
  return (
    <>
      <Navbar />
      {/* <TopBar /> */}
      <div className="app-wrapper">
        <Switch>
          <Route path={route.home()} exact component={HomePage} />
          <Route path={route.signin()} exact component={SignInPage} />
          <Route path={route.profile()} exact component={UserProfilePage} />
          <Route path={route.uploadImage()} exact component={UploadImagePage} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
      <Footer pages={pages} />
    </>
  );
}
