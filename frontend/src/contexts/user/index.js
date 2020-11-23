import React from 'react';
import { compose } from 'src/constants/functions/basic';

import { initialState } from 'src/contexts/user/helpers';
import { useAuth } from 'src/utils/auth';
import { usePersistedAuth } from 'src/utils/auth/usePersistedAuth';

const Context = React.createContext(initialState);

function UserProvider({ children }) {
  const { signout, signin } = useAuth();
  const [user, setUser] = usePersistedAuth(initialState, 'user');

  const fullName = React.useMemo(
    () => (user?.firstName + user?.lastName),
    [user.firstName, user.lastName],
  );

  const reset = React.useCallback(() => setUser(initialState), [setUser]);

  const login = React.useCallback((t, u) => {
    setUser(u);
    signin({ token: t });
  }, [setUser, signin]);

  const logout = React.useCallback(() => compose(signout, reset)(),
    [reset, signout]);

  const value = React.useMemo(() => ({
    user, setUser, fullName, login, logout,
  }), [user, setUser, fullName, login, logout]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useUser() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useUser must be used within a User.Provider');
  }
  return context;
}

export { UserProvider, useUser };
