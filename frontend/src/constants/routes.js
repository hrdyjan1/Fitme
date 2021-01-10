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

const userProfileRoute = (userType) => {
  switch (userType) {
    case 'athlete': return route.profile();
    case 'place': return route.editSportPlace();
    case 'trainer': return route.trainerProfile();
  }
};

const route = {
  home: () => '/',
  profile: () => '/profile',
  sportPlaces: () => '/sportPlaces',
  editSportPlace: () => '/editSportPlace',
  trainerProfile: () => '/trainerProfile',
  sportPlaceDetail: () => '/sportPlaceDetailPage/:id',
  userProfileRoute,
};

export { route, pages };
