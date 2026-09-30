import fs from "node:fs/promises";
import crypto from "node:crypto";

const encryptedMessage = await fs.readFile(
  "./src/messages/encrypted-message.bin"
);

const encryptedKey = await fs.readFile(
  "./src/messages/encrypted-key.bin"
);

const iv = await fs.readFile(
  "./src/messages/iv.bin"
);

// Drive's private key
const drivePrivateKey = await fs.readFile(
  "./certs/drive/private.key"
);

// Recover the AES key
const aesKey = crypto.privateDecrypt(
  {
    key: drivePrivateKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  encryptedKey
);

// Decrypt the message
const decipher = crypto.createDecipheriv(
  "aes-256-cbc",
  aesKey,
  iv
);

const decryptedMessage = Buffer.concat([
  decipher.update(encryptedMessage),
  decipher.final(),
]);

console.log("\n===== DECRYPTED MESSAGE =====");
console.log(decryptedMessage.toString());