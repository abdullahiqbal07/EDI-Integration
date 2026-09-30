import crypto from "node:crypto";
import fs from "node:fs/promises";

export async function buildSignedAS2Message({
  ediPath,
  signaturePath,
  as2From,
  as2To,
}) {
  const edi = await fs.readFile(ediPath);
  const signature = await fs.readFile(signaturePath);

  const boundary =
    `----BeHopeAS2_${crypto.randomBytes(12).toString("hex")}`;

  const messageId =
    `<${crypto.randomUUID()}@behope.com>`;

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

  const headers = {
    "AS2-Version": "1.1",
    "AS2-From": as2From,
    "AS2-To": as2To,
    "Message-ID": messageId,
    "MIME-Version": "1.0",
    "Content-Type":
      `multipart/signed; ` +
      `protocol="application/pkcs7-signature"; ` +
      `micalg="sha-256"; ` +
      `boundary="${boundary}"`,
  };

  return {
    headers,
    body,
  };
}