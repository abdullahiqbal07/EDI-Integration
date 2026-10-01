import crypto from "node:crypto";

export function calculateMIC(buffer) {
  const digest = crypto
    .createHash("sha256")
    .update(buffer)
    .digest("base64");

  return `${digest}, sha-256`;
}