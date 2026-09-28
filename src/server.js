import express from "express";
import "dotenv/config";

import as2Receiver from "./as2/receiver.js";

const app = express();

app.get("/", (req, res) => {
  res.send("BeHope EDI Lab is running");
});

app.use("/webhooks", as2Receiver);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`BeHope EDI Lab running on http://localhost:${PORT}`);
});