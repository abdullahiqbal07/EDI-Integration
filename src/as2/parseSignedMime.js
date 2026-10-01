import fs from "node:fs/promises";
import { getBoundary } from "./mimeParser.js";

export async function parseSignedMime(
  filePath,
  contentType
) {
  const raw = await fs.readFile(filePath);

  const boundary = getBoundary(contentType);

  const delimiter = Buffer.from(
    `--${boundary}`
  );

  const parts = splitBuffer(raw, delimiter);

  const parsedParts = [];

  for (const part of parts) {
    if (part.length === 0) {
      continue;
    }

    const separator = Buffer.from(
      "\r\n\r\n"
    );

    const headerEnd = part.indexOf(separator);

    if (headerEnd === -1) {
      continue;
    }

    const headerBuffer =
      part.subarray(0, headerEnd);

    const bodyBuffer =
      part.subarray(
        headerEnd + separator.length
      );

    const headers =
      parseHeaders(
        headerBuffer.toString("utf8")
      );

    parsedParts.push({
      headers,
      body: bodyBuffer,
    });
  }

  return parsedParts;
}

function splitBuffer(buffer, delimiter) {
  const parts = [];

  let start = 0;

  while (true) {
    const index = buffer.indexOf(
      delimiter,
      start
    );

    if (index === -1) {
      break;
    }

    if (index > start) {
      parts.push(
        buffer.subarray(start, index)
      );
    }

    start =
      index + delimiter.length;
  }

  return parts;
}

function parseHeaders(rawHeaders) {
  const headers = {};

  for (const line of rawHeaders.split("\r\n")) {
    const separator = line.indexOf(":");

    if (separator === -1) {
      continue;
    }

    const name = line
      .slice(0, separator)
      .trim()
      .toLowerCase();

    const value = line
      .slice(separator + 1)
      .trim();

    headers[name] = value;
  }

  return headers;
}