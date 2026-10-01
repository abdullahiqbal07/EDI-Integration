import fs from "node:fs/promises";
import { buildSignedEntity } from "./buildSignedEntity.js";
import { signEntity } from "./signEntity.js";

const { entity } =
  await buildSignedEntity(
    "./src/messages/test-850.edi"
  );

await fs.writeFile(
  "./src/messages/signed-content.mime",
  entity
);

await signEntity({
  entityPath:
    "./src/messages/signed-content.mime",

  signaturePath:
    "./src/messages/signature.p7s",
});

console.log(
  "Exact MIME entity created."
);

console.log(
  "CMS signature created."
);