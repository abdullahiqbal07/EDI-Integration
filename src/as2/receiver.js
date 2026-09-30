import express from "express";

const router = express.Router();

router.post(
  "/as2",
  express.raw({ type: "*/*" }),
  async (req, res) => {
    console.log("\n========== AS2 MESSAGE ==========");

    console.log("AS2-From:");
    console.log(req.headers["as2-from"]);

    console.log("\nAS2-To:");
    console.log(req.headers["as2-to"]);

    console.log("\nMessage-ID:");
    console.log(req.headers["message-id"]);

    console.log("\nAS2-Version:");
    console.log(req.headers["as2-version"]);

    console.log("\nContent-Type:");
    console.log(req.headers["content-type"]);

    console.log("\nEncrypted body:");
    console.log(`${req.body.length} bytes`);

    console.log("\n=================================");

    res.status(200).send("AS2 message received");
  }
);

export default router;