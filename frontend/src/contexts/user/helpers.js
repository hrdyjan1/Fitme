import { noop } from 'src/constants/functions';

const initialState = {
  fullName: null,
  user: {
    email: null,
    firstName: null,
    lastName: null,
  },
  login: noop,
  logout: noop,
};

export { initialState };
