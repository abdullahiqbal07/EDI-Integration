import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function verifyCMS({
  signaturePath,
  contentPath,
  certificatePath,
  outputPath,
}) {
  await execFileAsync("openssl", [
    "cms",
    "-verify",
    "-binary",
    "-inform",
    "DER",
    "-in",
    signaturePath,
    "-content",
    contentPath,
    "-noverify",
    "-out",
    outputPath,
  ]);

  return outputPath;
}