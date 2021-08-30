import axios from "axios";
import BuildConfig from "../config";
import { ResponseStatusCode } from "../constans";
import { aesPub, processRequest, processResponse } from "../utils/encrypt";
import { handleError } from "../utils/handleError";
import { getToken } from "../utils/sesstion-storage";
import { FORGOT_PASSWORD, LOGIN_URL } from "./requestPath";

axios.defaults.timeout = 5 * 60 * 1000;

axios.interceptors.request.use((request) => {
  if (request.url !== LOGIN_URL && request.url !== FORGOT_PASSWORD) {
    request.headers.Authorization = `Bearer ${getToken()}`;
    return request;
  }
  return request;
});

axios.interceptors.response.use((response) => {
  const { data } = response;
  console.log("data::::", data);
  if (data?.respnseCode === ResponseStatusCode.success) {
    return processResponse(data);
  } else {
    handleError(data?.respnseCode ?? "", data?.responseMessage);
    return Promise.reject({ responseCode: data?.responseCode });
  }
});

function processRequestData(method, data = {}, headers) {
  if (["GET", "DELETE"].includes(method)) {
    return {
      ...method,
      ...data,
      headers: { ...headers, aesKey: aesPub },
    };
  } else {
    return { data: BuildConfig.IS_MOCK ? data : processRequest(data) };
  }
}

export function makeRequset(requset) {
  // showLoading();
  return new Promise((resolve, reject) => {
    const { url, method, data, headers } = requset;
    if (!url || url === ``) {
      reject(`Invalid Requset URL !`);
      return;
    }

    // config herder axios
    axios.defaults.baseURL = BuildConfig.BASE_URL || "";
    axios.defaults.method = "POST";
    axios.defaults.headers.common[`Content-Type`] =
      "application/x-www-form-urlencoded";

    const requestObj = {
      url,
      method,
      headers,
      ...processRequestData(method, data, headers),
    };

    // request axios
    console.log("requestObj:::", requestObj);

    axios
      .request(requestObj)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log("errRequest ::", err);
        reject(err);
      })
      .finally(() => {
        // hiddenLoading
      });
  });
}
