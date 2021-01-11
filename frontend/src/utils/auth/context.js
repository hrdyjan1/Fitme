import React from 'react';
import { noop } from 'src/constants/functions/basic';

const initialState = {
  token: null,
};

function createContextValue({ token: t, setState }) {
  return {
    token: t,
    signin: ({ token }) => setState({ token }),
    signout: () => setState({ token: null }),
  };
}

const Context = React.createContext(
  createContextValue({ token: initialState.token, setState: noop }),
);

export { Context, createContextValue, initialState };
