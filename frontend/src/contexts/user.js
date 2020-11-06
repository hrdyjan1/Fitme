import React from 'react';

function noop() {}

const Context = React.createContext({
  user: null,
  token: null,
  set: noop,
  logout: noop,
});

function User({ children }) {
  const [state, setState] = React.useState({ user: null, token: null });
  const fullName = React.useMemo(
    () => ((state.user?.firstName && state.user?.lastName)
      ? `${state.user?.firstName} ${state.user?.lastName}`
      : null),
    [state.user],
  );

  const logout = React.useCallback(
    () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setState({ user: null, token: null });
    },
    [],
  );

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && token) setState({ token, user });
  }, []);

  const value = {
    ...state, fullName, set: setState, logout,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useUserContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a User');
  }
  return context;
}

export { User, useUserContext };
