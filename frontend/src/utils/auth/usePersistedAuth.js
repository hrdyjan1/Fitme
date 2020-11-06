import React from 'react';
import { getStorage, setStorage } from '../storage';

function usePersistedAuth(defaultState, item) {
  const [state, setStateRaw] = React.useState(() => getStorage(defaultState, item));

  const setState = React.useCallback((_state) => {
    setStateRaw(_state);
    setStorage(_state);
  }, []);

  return [state, setState];
}

export { usePersistedAuth };
