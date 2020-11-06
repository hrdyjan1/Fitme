import { noop } from 'src/constants/functions';

const initialState = {
  user: {
    email: null,
    firstName: null,
    lastName: null,
  },
  setUser: noop,
};

export { initialState };
