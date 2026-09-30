import fs from "node:fs/promises";
import crypto from "node:crypto";

const message = await fs.readFile(
  "./src/messages/test-message.txt"
);

// Drive's public certificate
const driveCertificate = await fs.readFile(
  "./certs/drive/certificate.crt"
);

// Create a random AES key
const aesKey = crypto.randomBytes(32);

// Create a random IV
const iv = crypto.randomBytes(16);

// Encrypt the message with AES
const cipher = crypto.createCipheriv(
  "aes-256-cbc",
  aesKey,
  iv
);

const encryptedMessage = Buffer.concat([
  cipher.update(message),
  cipher.final(),
]);

// Encrypt the AES key using Drive's public key
const drivePublicKey =
  crypto.createPublicKey(driveCertificate);

const encryptedKey = crypto.publicEncrypt(
  {
    key: drivePublicKey,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },
  aesKey
);

await fs.writeFile(
  "./src/messages/encrypted-message.bin",
  encryptedMessage
);

await fs.writeFile(
  "./src/messages/encrypted-key.bin",
  encryptedKey
);

await fs.writeFile(
  "./src/messages/iv.bin",
  iv
);

console.log("Message encrypted successfully.");