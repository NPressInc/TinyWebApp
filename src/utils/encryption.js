const crypto = require('crypto');
const ecdh = crypto.createECDH('secp256k1');
const { deserializePublicKey } = require('./Packages/Serialization/keySerialization');

class Encryption {
  static TWDataHeader = Buffer.from("::TWDataHeader::");

  static decryptDataFromPrivateKey(myPrivateKey, senderPublicKeyString, data, iv) {
    const senderPublicKey = deserializePublicKey(senderPublicKeyString);

    // Set the private key for ECDH
    ecdh.setPrivateKey(Buffer.from(myPrivateKey, 'hex'));

    // Compute the shared secret
    const sameSharedKey = ecdh.computeSecret(senderPublicKey);

    // Perform key derivation using HKDF
    const key = Encryption.getDigest(sameSharedKey);

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptedData = decipher.update(data, 'base64', 'utf8');
    decryptedData += decipher.final('utf8');

    if (!decryptedData) {
      console.log("Invalid Key");
    } else {
      return decryptedData;
    }
  }

  static encryptDataForPublicKey(myPrivateKey, recipientPublicKeyString, data) {
    const recipientPublicKey = deserializePublicKey(recipientPublicKeyString);

    // Set the private key for ECDH
    ecdh.setPrivateKey(Buffer.from(myPrivateKey, 'hex'));

    // Compute the shared secret
    const sharedKey = ecdh.computeSecret(recipientPublicKey);

    // Perform key derivation using HKDF
    const key = Encryption.getDigest(sharedKey);

    const [encryptedData, iv] = Encryption.AESEncrypt(key, data);

    return { encryptedData, iv };
  }

  static encryptDataForMultiplePublicKeys(privateKey, recipientPublicKeyStrings, data, generatedKey = null) {
    const encryptedKeys = [];
    const ivs = [];

    if (generatedKey === null) {
      generatedKey = crypto.randomBytes(32);
    }

    const [encryptedData, masterIv] = Encryption.AESEncrypt(generatedKey, data);

    for (const recipientPublicKeyString of recipientPublicKeyStrings) {
      const recipientPublicKey = deserializePublicKey(recipientPublicKeyString);

      // Set the private key for ECDH
      ecdh.setPrivateKey(Buffer.from(privateKey, 'hex'));

      // Compute the shared secret
      const sharedKey = ecdh.computeSecret(recipientPublicKey);

      // Perform key derivation using HKDF
      const key = Encryption.getDigest(sharedKey);

      const [cipherText, iv] = Encryption.AESEncrypt(key, generatedKey);

      encryptedKeys.push(cipherText);
      ivs.push(iv);
    }

    return { EncryptedData: encryptedData, iv: masterIv, EncryptedKeys: encryptedKeys, ivs: ivs };
  }

  static decryptDataFromMultiEncryptedData(myPrivateKey, senderPublicKeyString, encryptedKeys, data, iv, ivs) {
    const SenderPublicKey = deserializePublicKey(senderPublicKeyString);

    // Set the private key for ECDH
    ecdh.setPrivateKey(Buffer.from(myPrivateKey, 'hex'));

    // Compute the shared secret
    const sameSharedKey = ecdh.computeSecret(SenderPublicKey);

    // Perform key derivation using HKDF
    const key = Encryption.getDigest(sameSharedKey);

    let decryptedKey = null;

    for (let i = 0; i < encryptedKeys.length; i++) {
      decryptedKey = Encryption.AESDecrypt(key, encryptedKeys[i], ivs[i]);
      if (decryptedKey !== null) {
        break;
      }
    }

    if (decryptedKey === null) {
      throw new Error("No Encrypted Keys Matched. No access given");
    }

    const finalData = Encryption.AESDecrypt(decryptedKey, data, iv);

    return finalData;
  }

  static AESEncrypt(key, data) {
    const iv = crypto.randomBytes(16);
    data = Encryption.addTWHeader(data);
    const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
    let ciphertext = cipher.update(data, 'utf8', 'base64');
    ciphertext += cipher.final('base64');
    return [ciphertext, iv];
  }

  static AESDecrypt(key, data, iv) {
    const decipher = crypto.createDecipheriv('aes-256-ctr', key, iv);
    let res = decipher.update(data, 'base64', 'utf8');
    res += decipher.final('utf8');
    if (Encryption.checkForHeader(res)) {
      res = Encryption.removeTWHeader(res);
    } else {
      return null;
    }
    return res;
  }

  static checkForHeader(data) {
    if (data.length > 16) {
      if (data.slice(0, 16).equals(Encryption.TWDataHeader)) {
        return true;
      }
    }
    return false;
  }

  static removeTWHeader(data) {
    if (data.length > 16) {
      return data.slice(16);
    } else {
      throw new Error("Data Length not sufficient");
    }
  }

  static addTWHeader(data) {
    return Buffer.concat([Encryption.TWDataHeader, Buffer.from(data)]);
  }

  static getDigest(inputBytes) {
    const kdf = crypto.pbkdf2Sync(inputBytes, 'null', 15000, 32, 'sha256');
    return kdf;
  }
}

// Usage example:
const myPrivateKey = 'yourPrivateKeyInHexFormat';
const senderPublicKeyString = 'senderPublicKeyInStringFormat';
const data = 'encryptedDataInBase64Format';
const iv = Buffer.from('yourInitializationVectorInHexFormat', 'hex');

const decryptedData = Encryption.decryptDataFromPrivateKey(myPrivateKey, senderPublicKeyString, data, iv);
console.log('Decrypted Data:', decryptedData);
