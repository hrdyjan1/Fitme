import { route } from 'src/constants/routes';

const ICON = {
  close: {
    style: 'fas fa-times',
  },
  menu: {
    style: 'fas fa-bars',
  },
};

const NAV = {
  active: {
    style: 'nav-menu active',
  },
  inactive: {
    style: 'nav-menu',
  },
};

const LINKS = [
  {
    name: 'O nas',
    path: route.about(),
  },
  {
    name: 'Sportoviste',
    path: route.sportPlaces(),
  },
];

export { ICON, NAV, LINKS };
