import fs from "node:fs/promises";
import crypto from "node:crypto";
import {
  buildSignedAS2Message,
} from "./signedMessageBuilder.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const edi = await fs.readFile(
  "./src/messages/test-850.edi",
  "utf8"
);

const messageId = `<${crypto.randomUUID()}@behope.com>`;

const as2Message =
  await buildSignedAS2Message({
    ediPath: "./src/messages/test-850.edi",
    signaturePath: "./src/messages/signature.p7s",
    as2From: "BEHOPE",
    as2To: "DRIVE",
  });

// console.log("\n===== AS2 HEADERS =====");

console.log(as2Message.headers);

// console.log("\n===== AS2 BODY =====");

console.log(as2Message.body.toString());
const response = await fetch(
  "https://localhost:3000/webhooks/as2",
  {
    method: "POST",
    headers: as2Message.headers,
    body: as2Message.body,
  }
);

console.log("\n===== RESPONSE =====");

console.log("Status:", response.status);

console.log(await response.text());