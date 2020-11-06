import React from 'react';
import { getStorageState, setStorage } from '../storage';

function usePersistedAuth(defaultState) {
  const [state, setStateRaw] = React.useState(() => getStorageState(defaultState));

  const setState = React.useCallback((s) => {
    setStateRaw(s);
    setStorage(s);
  }, []);

  return [state, setState];
}

export { usePersistedAuth };
