const CryptoJS = require('./crypto-js.js')

const key = CryptoJS.enc.Utf8.parse('0123456789abcedf0123456789abcedf')
const iv = CryptoJS.enc.Utf8.parse("0123456789abcedf")
// 加密方法
function Encrypt (data) {
  data = JSON.stringify(data)
  const baseArray = CryptoJS.enc.Utf8.parse(data.toString())
  const base64one = CryptoJS.enc.Base64.stringify(baseArray)
  var encrypted = CryptoJS.AES.encrypt(base64one, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  var aesArray = CryptoJS.enc.Utf8.parse(encrypted.ciphertext.toString())
  const base64Tow = CryptoJS.enc.Base64.stringify(aesArray)
  return base64Tow.toString()
}

export default {
  Encrypt
}