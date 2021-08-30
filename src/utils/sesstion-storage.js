import { AUTH_TOKEN } from "../constans";

export const getToken = () => {
  return window.sessionStorage.getItem(AUTH_TOKEN) ?? null;
};
