import fs from "node:fs/promises";
import { extractBoundary } from "./mimeParser.js";

const content = await fs.readFile(
  "./src/messages/decrypted-entity.mime"
);

const text = content.toString("utf8");

const contentType =
  "multipart/signed; boundary=\"----BeHopeSigned_example\"";

const boundary =
  extractBoundary(contentType);

const parts = text.split(
  `--${boundary}`
);

console.log(
  "Parts found:",
  parts.length
);

for (const [index, part] of parts.entries()) {
  console.log(
    `\n===== PART ${index} =====`
  );

  console.log(part);
}