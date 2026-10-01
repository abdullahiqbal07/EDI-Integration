export function createMdn({
    messageId,
    recipient,
    mic,
  }) {
    const boundary = "----BeHopeMDNBoundary";
  
    const humanReadable = [
      "Your AS2 message was received successfully.",
      "",
      `Original-Message-ID: ${messageId}`,
      `Received-content-MIC: ${mic}`,
    ].join("\r\n");
  
    const dispositionNotification = [
      "Reporting-UA: BeHope-AS2",
      `Original-Recipient: rfc822; ${recipient}`,
      `Final-Recipient: rfc822; ${recipient}`,
      `Original-Message-ID: ${messageId}`,
      "Disposition: automatic-action/MDN-sent-automatically; processed",
      `Received-content-MIC: ${mic}`,
    ].join("\r\n");
  
    const body = [
      `--${boundary}`,
      "Content-Type: text/plain",
      "",
      humanReadable,
  
      `--${boundary}`,
      "Content-Type: message/disposition-notification",
      "",
      dispositionNotification,
  
      `--${boundary}--`,
      "",
    ].join("\r\n");
  
    return {
      contentType:
        `multipart/report; ` +
        `report-type=disposition-notification; ` +
        `boundary="${boundary}"`,
  
      body,
    };
  }