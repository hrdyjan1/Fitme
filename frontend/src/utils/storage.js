import { isObject } from 'src/constants/object';

const AUTH_KEY = 'app-auth';

function setStorage(state, item = AUTH_KEY, isObjectType = true) {
  return window.localStorage
    ? window.localStorage.setItem(item, isObjectType ? JSON.stringify(state) : state)
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
    const data = isObject(rawData) ? JSON.parse(rawData) : rawData;
    return data || state;
  } catch (error) {
    console.warn(error, 'getStorageState');
  }

  return state;
}

export { setStorage, getStorage };
