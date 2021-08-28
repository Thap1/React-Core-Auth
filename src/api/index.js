import axios from "axios";
import BuildConfig from "../config";
import { aesPub, processRequest } from "../utils/encrypt";

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
    axios
      .request(requestObj)
      .then((res) => {
        console.log("response::", res);
        resolve(res);
      })
      .catch((err) => {
        console.log("err::", err);
        reject(err);
      })
      .finally(() => {
        // hiddenLoading
      });
  });
}
