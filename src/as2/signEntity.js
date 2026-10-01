import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function signEntity({
  entityPath,
  signaturePath,
}) {
  await execFileAsync("openssl", [
    "cms",
    "-sign",
    "-binary",
    "-in",
    entityPath,
    "-signer",
    "./certs/behope/certificate.crt",
    "-inkey",
    "./certs/behope/private.key",
    "-out",
    signaturePath,
    "-outform",
    "DER",
    "-md",
    "sha256",
  ]);

  return signaturePath;
}