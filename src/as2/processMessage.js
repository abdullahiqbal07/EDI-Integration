import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { decryptCMS } from "./decrypt.js";
import { calculateMIC } from "./mic.js";
import { createMdn } from "./createMdn.js";

const INCOMING_DIR =
  "./src/messages/incoming";

export async function processMessage({
  body,
  headers,
}) {
  await fs.mkdir(INCOMING_DIR, {
    recursive: true,
  });

  const id = crypto.randomUUID();

  const encryptedPath = path.join(
    INCOMING_DIR,
    `${id}.p7m`
  );

  const decryptedPath = path.join(
    INCOMING_DIR,
    `${id}.mime`
  );

  /*
   * 1. Save encrypted AS2 payload
   */
  await fs.writeFile(
    encryptedPath,
    body
  );

  console.log(
    "Encrypted message saved:",
    encryptedPath
  );

  /*
   * 2. Decrypt CMS
   */
  await decryptCMS({
    encryptedPath,
    outputPath: decryptedPath,

    certificatePath:
      "./certs/drive/certificate.crt",

    privateKeyPath:
      "./certs/drive/private.key",
  });

  console.log(
    "CMS decryption successful"
  );

  /*
   * 3. Read decrypted message
   */
  const decrypted = await fs.readFile(
    decryptedPath
  );

  /*
   * 4. Calculate MIC
   *
   * For this lab we calculate it over
   * the decrypted signed MIME entity.
   */
  const mic = calculateMIC(
    decrypted
  );

  console.log(
    "MIC:",
    mic
  );

  /*
   * 5. Generate MDN
   */
  const mdn = createMdn({
    messageId:
      headers["message-id"],

    recipient:
      headers["as2-from"],

    mic,
  });

  return {
    messageId:
      headers["message-id"],

    mic,

    mdn,
  };
}