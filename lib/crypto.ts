// Encrypting and decrypting bookingId for safer ticket approval
import crypto from "crypto";

const SECRET_SALT = process.env.TICKET_ENCRYPTION_KEY!;
const ALGORITHM = "aes-128-ecb";

/**
 * ECB Mode: The smallest possible size.
 * No IV and No Tag. Best for high-speed QR scanning.
 */
export function encrypt(text: string): string {
  const key = Buffer.from(SECRET_SALT.substring(0, 16));

  // ECB does not use an IV, so we pass null
  const cipher = crypto.createCipheriv(ALGORITHM, key, null);

  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  // Make URL-safe
  return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decrypt(text: string): string {
  let base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) base64 += "=";

  const key = Buffer.from(SECRET_SALT.substring(0, 16));

  const decipher = crypto.createDecipheriv(ALGORITHM, key, null);

  let decrypted = decipher.update(base64, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
