import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import { decryptCMS } from "./decrypt.js";

const router = express.Router();

const TEMP_DIR = "./src/messages/incoming";

router.post(
  "/as2",
  express.raw({ type: "*/*" }),
  async (req, res) => {
    const messageId = req.headers["message-id"];

    console.log("\n========== AS2 MESSAGE ==========");

    console.log("AS2-From:", req.headers["as2-from"]);
    console.log("AS2-To:", req.headers["as2-to"]);
    console.log("Message-ID:", messageId);
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body.length, "bytes");

    try {
      await fs.mkdir(TEMP_DIR, {
        recursive: true,
      });

      const id = crypto.randomUUID();

      const encryptedPath = path.join(
        TEMP_DIR,
        `${id}.p7m`
      );

      const decryptedPath = path.join(
        TEMP_DIR,
        `${id}.mime`
      );

      await fs.writeFile(
        encryptedPath,
        req.body
      );

      console.log(
        "\nEncrypted message saved:",
        encryptedPath
      );

      await decryptCMS({
        encryptedPath,
        outputPath: decryptedPath,
        certificatePath:
          "./certs/drive/certificate.crt",
        privateKeyPath:
          "./certs/drive/private.key",
      });

      console.log(
        "CMS decryption successful!"
      );

      console.log(
        "Decrypted MIME:",
        decryptedPath
      );

      res
        .status(200)
        .send("AS2 message decrypted successfully");
    } catch (error) {
      console.error(
        "\nAS2 processing failed:"
      );

      console.error(error.message);

      res
        .status(500)
        .send("AS2 processing failed");
    }
  }
);

export default router;