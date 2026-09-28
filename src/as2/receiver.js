import express from "express";

const router = express.Router();

router.post("/as2", express.raw({ type: "*/*" }), (req, res) => {
  console.log("\n========== AS2 MESSAGE RECEIVED ==========");

  console.log("Headers:");
  console.log(req.headers);

  console.log("\nBody:");

  const body = req.body.toString();

  console.log(body);

  console.log("===========================================\n");

  res.status(200).send("Message received");
});

export default router;