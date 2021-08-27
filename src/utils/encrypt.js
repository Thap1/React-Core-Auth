export const aesPub = getAESKey();

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
