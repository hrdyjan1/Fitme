import React from 'react';

import { createContextValue, Context, initialState } from 'src/utils/auth/context';
import { usePersistedAuth } from 'src/utils/auth/usePersistedAuth';

function AuthProvider({ children }) {
  const [state, setState] = usePersistedAuth(initialState);

  const contextValue = React.useMemo(() => createContextValue({ token: state.token, setState }),
    [state.token, setState]);

  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
}

function useAuth() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
}

export { useAuth, AuthProvider };
