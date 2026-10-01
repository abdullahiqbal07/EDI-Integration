import fs from "node:fs/promises";
import { calculateMIC } from "./mic.js";

const content = await fs.readFile(
  "./src/messages/signed-content.mime"
);

const mic = calculateMIC(content);

console.log("MIC:");
console.log(mic);