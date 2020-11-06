import React from 'react';

import { initialState } from 'src/contexts/user/helpers';
import { usePersistedAuth } from 'src/utils/auth/usePersistedAuth';

const Context = React.createContext(initialState);

function UserProvider({ children }) {
  const [user, setUser] = usePersistedAuth(initialState, 'user');

  const value = React.useMemo(() => ({ user, setUser }), [user, setUser]);
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
