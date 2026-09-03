import { NextResponse } from "next/server";
import { z } from "zod";

import {
  SESSION_COOKIE,
  createSession,
  isSessionSecretConfigured,
  sessionCookieOptions,
} from "@/lib/auth-session";
import { verifyCredentials } from "@/lib/auth-credentials";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 400 },
    );
  }

  const missingConfig = [
    !process.env.ADMIN_PASSWORD ? "ADMIN_PASSWORD" : null,
    !isSessionSecretConfigured() ? "AUTH_SECRET" : null,
  ].filter(Boolean);

  if (missingConfig.length > 0) {
    console.error(
      `Admin sign-in unavailable: missing or invalid server configuration for ${missingConfig.join(", ")}`,
    );
    return NextResponse.json(
      {
        error:
          "Sign-in is not configured on the server. Please contact the site administrator.",
      },
      { status: 503 },
    );
  }

  const { email, password } = parsed.data;
  if (!verifyCredentials(email, password)) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = await createSession(email);
  const response = NextResponse.json({ success: true });
  response.cookies.set(
    SESSION_COOKIE,
    token,
    sessionCookieOptions(60 * 60 * 8),
  );
  return response;
}
