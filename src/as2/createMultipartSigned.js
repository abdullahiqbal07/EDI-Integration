import fs from "node:fs/promises";
import crypto from "node:crypto";

const entity =
  await fs.readFile(
    "./src/messages/signed-content.mime"
  );

const signature =
  await fs.readFile(
    "./src/messages/signature.p7s"
  );

const boundary =
  `----BeHopeAS2_${crypto.randomBytes(12).toString("hex")}`;

const body = Buffer.concat([
  Buffer.from(
    `--${boundary}\r\n`
  ),

  entity,

  Buffer.from(
    `\r\n--${boundary}\r\n` +
    `Content-Type: application/pkcs7-signature; ` +
    `name="smime.p7s"\r\n` +
    `Content-Transfer-Encoding: base64\r\n` +
    `Content-Disposition: attachment; ` +
    `filename="smime.p7s"\r\n` +
    `\r\n`
  ),

  Buffer.from(
    signature.toString("base64")
  ),

  Buffer.from(
    `\r\n--${boundary}--\r\n`
  ),
]);

await fs.writeFile(
  "./src/messages/multipart-signed.mime",
  body
);

console.log(
  "multipart/signed message created."
);

console.log(
  "Boundary:",
  boundary
);