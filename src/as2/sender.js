import fs from "node:fs/promises";

const message = await fs.readFile(
  "./src/messages/test-message.txt"
);

const response = await fetch(
  "http://localhost:3000/webhooks/as2",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/edi-x12",
      "AS2-From": "BEHOPE",
      "AS2-To": "DRIVE",
      "Message-ID": "<test-message-001@behope.com>"
    },
    body: message
  }
);

console.log("Status:", response.status);
console.log("Response:", await response.text());