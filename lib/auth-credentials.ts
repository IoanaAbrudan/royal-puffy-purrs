import { timingSafeEqual } from "node:crypto";

export function verifyCredentials(email: string, password: string) {
  const adminEmail =
    process.env.ADMIN_EMAIL ?? "cattery@royalpuffypurrs.com";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) return false;
  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }

  const provided = Buffer.from(password);
  const expected = Buffer.from(adminPassword);
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}
