import { EncryptConstants } from "../constans";
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt";
import moment from "moment";
export const aesPub = getAESKey();

export function processRequest(data) {
  if (!data) {
    return null;
  }
  const now = new Date();
  const timestamp = now.getTime();
  let result = {};
  let requestData = null;
  let encodeKey = null;

  const dataWithAESKey = { ...data, aesKey: aesPub };
  requestData = encryptAES(
    JSON.stringify(Object.assign({}, dataWithAESKey)),
    aesPub
  );
  encodeKey = encryptRSA(aesPub);

  Object.assign(result, EncryptConstants.params, {
    requestId: `${timestamp}`,
    timestamp: moment(now).format("yyyyMMDDhhmmss"),
    requestData,
    encodeKey,
  });
  result.sign = addSign(result);
  return result;
}

function addSign(params) {
  let source = "";
  Object.keys(params)
    .sort()
    .forEach((key) => {
      source += `${key}=${params[key]}, `;
    });

  source = source.slice(0, -2);
  return CryptoJS.SHA256(`{${source}}`).toString(CryptoJS.enc.Hex);
}

function encryptRSA(params) {
  const encryptObj = new JSEncrypt();
  encryptObj.setPublicKey(EncryptConstants.publicKey);
  return encryptObj.encrypt(params);
}

function encryptAES(dataKey, aesPub) {
  const result = CryptoJS.enc.Base64.stringify(
    CryptoJS.AES.encrypt(dataKey, CryptoJS.enc.Utf8.parse(aesPub), {
      iv: CryptoJS.enc.Utf8.parse(EncryptConstants.ivKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    }).ciphertext
  );
  return result;
}
function getAESKey() {
  let key = [];
  for (let i = 0; i < 16; i++) {
    let num = Math.floor(Math.random() * 26);
    let charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  const result = key.join("");
  return result;
}

export function processResponse(response) {
  const { responseData, responseCode, responseMessage } = response;
  console.log("responseData:::", responseData);
  if (typeof responseData === "string" && responseData !== "") {
    return {
      responseCode: responseCode,
      data: JSON.parse(decodeAES(responseData, aesPub)),
      responseMessage: responseMessage,
    };
  } else return responseData;
}

function decodeAES(responseData, aesPub) {
  const aesKey = CryptoJS.enc.Utf8.parse(aesPub);
  const decrypted = CryptoJS.AES.decrypt(responseData, aesKey, {
    iv: CryptoJS.enc.Utf8.parse(EncryptConstants.ivKey),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  });
  return CryptoJS.enc.stringify(decrypted).trim();
}
