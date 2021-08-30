import { makeRequset } from "./index";
import { LOGIN_URL } from "./requestPath";

export function login(data = {}) {
  const url = LOGIN_URL;
  return makeRequset({ url, method: "POST", data });
}
