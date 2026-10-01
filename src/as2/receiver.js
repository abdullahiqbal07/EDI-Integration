import express from "express";

import { processMessage } from "./processMessage.js";

const router = express.Router();

router.post(
  "/as2",
  express.raw({ type: "*/*" }),

  async (req, res) => {
    console.log(
      "\n========== AS2 MESSAGE =========="
    );

    console.log(
      "AS2-From:",
      req.headers["as2-from"]
    );

    console.log(
      "AS2-To:",
      req.headers["as2-to"]
    );

    console.log(
      "Message-ID:",
      req.headers["message-id"]
    );

    console.log(
      "AS2-Version:",
      req.headers["as2-version"]
    );

    console.log(
      "Content-Type:",
      req.headers["content-type"]
    );

    console.log(
      "Body:",
      req.body.length,
      "bytes"
    );

    try {
      const result =
        await processMessage({
          body: req.body,
          headers: req.headers,
        });

      console.log(
        "\nAS2 processing successful"
      );

      console.log(
        "Message-ID:",
        result.messageId
      );

      console.log(
        "MIC:",
        result.mic
      );

      res
        .status(200)
        .set(
          "Content-Type",
          result.mdn.contentType
        )
        .send(result.mdn.body);

    } catch (error) {
      console.error(
        "\nAS2 processing failed:"
      );

      console.error(error);

      res
        .status(500)
        .send(
          "AS2 processing failed"
        );
    }
  }
);

export default router;