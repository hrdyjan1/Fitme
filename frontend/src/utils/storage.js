const AUTH_KEY = 'app-auth';

function setStorage(state) {
  return window.localStorage
    ? window.localStorage.setItem(AUTH_KEY, JSON.stringify(state))
    : undefined;
}

function getStorageState(state) {
  if (!window.localStorage) {
    return state;
  }

  const rawData = window.localStorage.getItem(AUTH_KEY);
  if (!rawData) {
    return state;
  }

  try {
    const { token } = JSON.parse(rawData);
    return token ? { token } : state;
  } catch (error) {
    console.warn(error, 'getStorageState');
  }

  return state;
}

export { setStorage, getStorageState };
