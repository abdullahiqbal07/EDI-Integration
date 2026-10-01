import fs from "node:fs/promises";
import crypto from "node:crypto";

export async function buildSignedEntity(ediPath) {
  const edi = await fs.readFile(ediPath);

  const boundary =
    `----BeHopeSigned_${crypto.randomBytes(12).toString("hex")}`;

  const headers = [
    "Content-Type: application/edi-x12",
    "Content-Transfer-Encoding: binary",
  ].join("\r\n");

  const entity = Buffer.concat([
    Buffer.from(
      `${headers}\r\n\r\n`
    ),
    edi,
  ]);

  return {
    boundary,
    entity,
  };
}