var CryptoJS = require("crypto-js");

let secret_key = 'uI2ooxtwHeI6q69PS98fx9SWVGbpQohO';

// encrypted text
export const to_Encrypt = (text) => {
     // Encrypt
  var encrypted = CryptoJS.AES.encrypt(text, secret_key).toString();
    return encrypted;
  };

  export const to_Decrypt = (cipher, username) => {
    console.log("cipher",cipher);	
    if (cipher.startsWith('Welcome')) {
      return cipher;
    }
  
    if (cipher.startsWith(username)) {
      return cipher;
    }
    //decrypted message
    var bytes  = CryptoJS.AES.decrypt(cipher, secret_key);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  };