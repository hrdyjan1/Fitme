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
    name: 'Sportoviště',
    path: route.sportPlaces(),
  },
  {
    name: 'Editace sportoviště',
    path: route.editSportPlace(),
  },
];

export { ICON, NAV, LINKS };
