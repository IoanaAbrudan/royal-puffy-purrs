import { describe, expect, it } from "vitest";

import { getCatsStore, getCatsStoreSafe } from "@/lib/cats-store";
import { getHotelStore, getHotelStoreSafe } from "@/lib/hotel-store";

describe("admin stores", () => {
  it("loads hotel suites from bundled defaults", async () => {
    const store = await getHotelStore();

    expect(store.suites.length).toBeGreaterThan(0);
    expect(store.suites.some((suite) => suite.id === "garden-suite")).toBe(
      true,
    );
  });

  it("loads cat listings from bundled defaults", async () => {
    const store = await getCatsStore();

    expect(store.cats.length).toBeGreaterThan(0);
    expect(store.cats.some((cat) => cat.id === "duchess-mabel")).toBe(true);
  });

  it("always returns hotel data for the dashboard", async () => {
    const store = await getHotelStoreSafe();

    expect(store.suites.length).toBeGreaterThan(0);
    expect(typeof store.imageVersion).toBe("number");
  });

  it("always returns cat data for the dashboard", async () => {
    const store = await getCatsStoreSafe();

    expect(store.cats.length).toBeGreaterThan(0);
    expect(typeof store.imageVersion).toBe("number");
  });
});
