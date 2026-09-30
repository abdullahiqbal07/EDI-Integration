import fs from "node:fs/promises";
import crypto from "node:crypto";

const edi = await fs.readFile(
  "./src/messages/test-850.edi"
);

const signature = await fs.readFile(
  "./src/messages/signature.p7s"
);

const boundary =
  `----BeHopeSigned_${crypto.randomBytes(12).toString("hex")}`;

const body = Buffer.concat([
  Buffer.from(
    `--${boundary}\r\n` +
    `Content-Type: application/edi-x12\r\n` +
    `Content-Transfer-Encoding: binary\r\n` +
    `\r\n`
  ),

  edi,

  Buffer.from(
    `\r\n--${boundary}\r\n` +
    `Content-Type: application/pkcs7-signature; name="smime.p7s"\r\n` +
    `Content-Transfer-Encoding: base64\r\n` +
    `Content-Disposition: attachment; filename="smime.p7s"\r\n` +
    `\r\n`
  ),

  Buffer.from(signature.toString("base64")),

  Buffer.from(
    `\r\n--${boundary}--\r\n`
  ),
]);

await fs.writeFile(
  "./src/messages/signed-entity.mime",
  body
);

console.log("Signed MIME entity created.");
console.log("Boundary:", boundary);