import { makeRequset } from "./index";

export function login(data = {}) {
  const url = "sat/app/api/v1/admin/login";
  return makeRequset({ url, method: "POST", data });
}
