// src/as2/decrypt.js

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function decryptCMS({
  encryptedPath,
  outputPath,
  certificatePath,
  privateKeyPath,
}) {
  await execFileAsync("openssl", [
    "cms",
    "-decrypt",
    "-binary",
    "-inform",
    "DER",
    "-in",
    encryptedPath,
    "-recip",
    certificatePath,
    "-inkey",
    privateKeyPath,
    "-out",
    outputPath,
  ]);

  return outputPath;
}