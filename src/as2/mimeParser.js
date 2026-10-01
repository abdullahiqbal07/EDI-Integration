export function getBoundary(contentType) {
    const match = contentType.match(
      /boundary="?([^";]+)"?/i
    );
  
    if (!match) {
      throw new Error("MIME boundary not found");
    }
  
    return match[1];
  }