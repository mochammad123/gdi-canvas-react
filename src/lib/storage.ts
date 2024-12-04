import { LOCAL_STORAGE_KEY } from './variables/example';

const env = import.meta.env.VITE_ENVIRONTMENT;
export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(`${env}-${key}`, value);
}

export function getLocalStorage<TValue = string>(key: string): TValue {
  return localStorage.getItem(`${env}-${key}`) as TValue;
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(`${env}-${key}`);
}

export function removeLocalStorageUserLogin() {
  removeLocalStorage(LOCAL_STORAGE_KEY.User);
}
