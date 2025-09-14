// src/lib/encryption.js

import CryptoJS from 'crypto-js';

// Encrypts text using AES encryption
export const encryptData = (text, secretKey) => {
  if (!text) return null;
  try {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return null; // Or handle the error as needed
  }
};

// Decrypts text that was encrypted with AES
export const decryptData = (ciphertext, secretKey) => {
  if (!ciphertext) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    // If the decrypted text is empty, it might mean the key is wrong
    // or the data was corrupted.
    return originalText || null;
  } catch (error) {
    console.error("Decryption failed. This might be due to a wrong key or corrupted data.", error);
    return null; // Return null or a specific error message
  }
};