import { AUTH_SESSION_KEY, AUTH_TOKEN } from "../constans";

export const getToken = () => {
  return window.sessionStorage.getItem(AUTH_TOKEN) ?? null;
};

export const setAuth = (params) => {
  const stringifyParam = JSON.stringify(params || {});
  const { userInfo } = params;
  window.sessionStorage.setItem(AUTH_SESSION_KEY, stringifyParam);
  window.sessionStorage.setItem(AUTH_TOKEN, userInfo?.authToken);
  return Promise.resolve();
};

export const getUserInfo = () => {
  const authSession = window.sessionStorage.getItem(AUTH_SESSION_KEY);
  if (authSession) {
    const data = JSON.parse(authSession);
    return data?.userInfo ?? null;
  }
  return null;
};

export const getRoleName = () => {
  const authSession = window.sessionStorage.getItem(AUTH_SESSION_KEY);
  if (authSession) {
    const data = JSON.parse(authSession);
    return data?.userInfo?.roleName ?? null;
  }
  return null;
};
