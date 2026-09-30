import crypto from "node:crypto";

export function buildAS2Message({
  edi,
  as2From,
  as2To,
  messageId,
}) {
  const boundary = `----BeHopeAS2_${crypto
    .randomBytes(12)
    .toString("hex")}`;

  const body = [
    `--${boundary}`,
    "Content-Type: application/edi-x12",
    "Content-Disposition: attachment; filename=\"document.edi\"",
    "",
    edi,
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const headers = {
    "AS2-Version": "1.1",
    "AS2-From": as2From,
    "AS2-To": as2To,
    "Message-ID": messageId,
    "MIME-Version": "1.0",
    "Content-Type": `multipart/mixed; boundary="${boundary}"`,
  };

  return {
    headers,
    body,
  };
}