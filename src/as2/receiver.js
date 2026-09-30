import express from "express";

const router = express.Router();

router.post(
  "/as2",
  express.raw({ type: "*/*" }),
  (req, res) => {
    console.log("\n========== AS2 MESSAGE ==========");

    console.log("\nAS2-From:");
    console.log(req.headers["as2-from"]);

    console.log("\nAS2-To:");
    console.log(req.headers["as2-to"]);

    console.log("\nMessage-ID:");
    console.log(req.headers["message-id"]);

    console.log("\nAS2-Version:");
    console.log(req.headers["as2-version"]);

    console.log("\nContent-Type:");
    console.log(req.headers["content-type"]);

    console.log("\nBody:");
    console.log(req.body.toString());

    console.log("\n=================================\n");

    res.status(200).send("Message received");
  }
);

export default router;