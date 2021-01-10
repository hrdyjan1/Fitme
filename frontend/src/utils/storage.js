const AUTH_KEY = 'auth';

function setStorage(state, item = AUTH_KEY, isObjectType = true) {
  return window.localStorage
    ? window.localStorage.setItem(
        item,
        isObjectType ? JSON.stringify(state) : state
      )
    : undefined;
}

function getStorage(state, item = AUTH_KEY) {
  if (!window.localStorage) {
    return state;
  }

  const rawData = window.localStorage.getItem(item);
  if (!rawData) {
    return state;
  }

  try {
    return JSON.parse(rawData);
  } catch (error) {
    return rawData || state;
  }
}

export { setStorage, getStorage };
