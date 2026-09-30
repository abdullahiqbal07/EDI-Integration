import fs from "node:fs/promises";
import crypto from "node:crypto";

const message = await fs.readFile(
  "./src/messages/test-message.txt"
);

const certificate = await fs.readFile(
  "./certs/behope/certificate.crt"
);

// For this lab, we'll get the signature
// from the signing step by generating it again.
const privateKey = await fs.readFile(
  "./certs/behope/private.key"
);

const signer = crypto.createSign("SHA256");

signer.update(message);
signer.end();

const signature = await fs.readFile(
  "./src/messages/signature.txt",
  "utf8"
);

const verifier = crypto.createVerify("SHA256");

verifier.update(message);
verifier.end();

const isValid = verifier.verify(
  certificate,
  signature,
  "base64"
);

console.log("Signature valid:", isValid);