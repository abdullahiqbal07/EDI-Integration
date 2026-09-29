import express from "express";
import https from "node:https";
import fs from "node:fs";
import "dotenv/config";

import as2Receiver from "./as2/receiver.js";

const app = express();

app.get("/", (req, res) => {
  res.send("BeHope EDI Lab is running");
});

app.use("/webhooks", as2Receiver);

const PORT = process.env.PORT || 3000;

const httpsOptions = {
  key: fs.readFileSync("./certs/server.key"),
  cert: fs.readFileSync("./certs/server.crt"),
};

https.createServer(httpsOptions, app).listen(PORT, () => {
  console.log(`BeHope EDI Lab running on https://localhost:${PORT}`);
});