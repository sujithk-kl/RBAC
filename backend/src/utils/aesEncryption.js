  const crypto = require("crypto");

  const algorithm = "aes-256-cbc";
  const key = Buffer.from(process.env.AES_SECRET_KEY, "hex"); // 32 bytes key
  const iv = Buffer.from(process.env.AES_IV, "hex"); // 16 bytes IV

  /**
   * Encrypts a given plain text
   * @param {string} text - The plain text to encrypt
   * @returns {string} Encrypted text in base64 format
   */
  const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  };

  /**
   * Decrypts an encrypted text
   * @param {string} encryptedText - The encrypted text in base64 format
   * @returns {string} Decrypted plain text
   */
  const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  };

  module.exports = { encrypt, decrypt };
