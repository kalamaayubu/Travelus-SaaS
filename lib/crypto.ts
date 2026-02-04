// Encrypting and decrypting bookingId for safer ticket approval
import crypto from "crypto";
const ALGORITHM = "aes-256-cbc";
// Convert the hex string from .env into a raw 32-byte buffer
const KEY = Buffer.from(process.env.TICKET_ENCRYPTION_KEY!, "hex");
const IV_LENGTH = 16;

export function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv); // Use the Buffer KEY
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string) {
  const textParts = text.split(":");
  const iv = Buffer.from(textParts.shift()!, "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv); // Use the Buffer KEY
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
