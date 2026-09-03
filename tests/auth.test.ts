import { afterEach, describe, expect, it, vi } from "vitest";

import { isSessionSecretConfigured } from "@/lib/auth-session";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("isSessionSecretConfigured", () => {
  it("allows a dev fallback secret outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("AUTH_SECRET", "");

    expect(isSessionSecretConfigured()).toBe(true);
  });

  it("reports a missing production secret", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AUTH_SECRET", "");

    expect(isSessionSecretConfigured()).toBe(false);
  });

  it("reports a production secret that is too short", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AUTH_SECRET", "too-short");

    expect(isSessionSecretConfigured()).toBe(false);
  });

  it("accepts a long enough production secret", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AUTH_SECRET", "a".repeat(32));

    expect(isSessionSecretConfigured()).toBe(true);
  });
});
