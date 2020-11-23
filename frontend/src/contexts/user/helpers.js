import { noop } from 'src/constants/functions/basic';

const initialState = {
  fullName: null,
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
  },
  login: noop,
  logout: noop,
};

export { initialState };
