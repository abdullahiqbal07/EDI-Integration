import fs from "node:fs/promises";
import crypto from "node:crypto";

const encryptedBody = await fs.readFile(
  "./src/messages/encrypted.p7m"
);

const messageId =
  `<${crypto.randomUUID()}@behope.com>`;

const headers = {
  "AS2-Version": "1.1",
  "AS2-From": "BEHOPE",
  "AS2-To": "DRIVE",
  "Message-ID": messageId,
  "MIME-Version": "1.0",
  "Content-Type":
    'application/pkcs7-mime; smime-type=enveloped-data',
};

console.log("\n===== AS2 REQUEST =====");

console.log("POST /webhooks/as2");

console.log("\nHeaders:");
console.log(headers);

console.log("\nBody:");
console.log(`Encrypted CMS: ${encryptedBody.length} bytes`);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const response = await fetch(
  "https://localhost:3000/webhooks/as2",
  {
    method: "POST",
    headers: {
      ...headers,
      "Content-Length": encryptedBody.length.toString(),
    },
    body: encryptedBody,
  }
);

console.log("\n===== RESPONSE =====");

console.log("Status:", response.status);

console.log("Body:", await response.text());