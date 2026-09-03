import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SESSION_HOURS = 8;

const MIN_SECRET_LENGTH = 16;

export function isSessionSecretConfigured() {
  if (process.env.NODE_ENV !== "production") return true;
  const secret = process.env.AUTH_SECRET;
  return Boolean(secret) && secret!.length >= MIN_SECRET_LENGTH;
}

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        `AUTH_SECRET must be set in production (min ${MIN_SECRET_LENGTH} characters)`,
      );
    }
    return new TextEncoder().encode("dev-only-auth-secret");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_HOURS}h`)
    .sign(getSecret());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
