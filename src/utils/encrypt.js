import { EncryptConstants } from "../constans";
import CryptoJS from 'crypto-js'
export const aesPub = getAESKey();

export function processRequest(data) {
  if (!data) {
    return null;
  }
  const now = new Date();
  const timestamlp = now.getTime();
  let result = {};
  let requestData = null;
  let encodeKey = null;

  const dataWithAESKey = { ...data, aesKey: aesPub }
  requestData = encryptAES(JSON.stringify(Object.assign({}, dataWithAESKey)), aesPub)
  console.log("requestData::::", requestData);
  return;
}

function encryptAES(dataKey, aesPub) {
  return CryptoJS.enc.Base64.stringify(
    CryptoJS.AES.encrypt(dataKey, CryptoJS.enc.parse(aesPub), {
      iv: CryptoJS.enc.Utf8.parse(EncryptConstants.ivKey),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding
    }).ciphertext)
}
function getAESKey() {
  let key = [];
  for (let i = 0; i < 10; i++) {
    let num = Math.floor(Math.random() * 26);
    let charStr = String.fromCharCode(97 + num);
    key.push(charStr.toUpperCase());
  }
  const result = key.join("");
  return result;
}
