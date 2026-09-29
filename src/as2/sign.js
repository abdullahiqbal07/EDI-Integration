import fs from "node:fs/promises";
import crypto from "node:crypto";

const message = await fs.readFile(
  "./src/messages/test-message.txt"
);

const privateKey = await fs.readFile(
  "./certs/behope/private.key"
);

const signer = crypto.createSign("SHA256");

signer.update(message);
signer.end();

const signature = signer.sign(privateKey, "base64");

console.log("\n===== ORIGINAL MESSAGE =====");
console.log(message.toString());

console.log("\n===== SIGNATURE =====");
console.log(signature);