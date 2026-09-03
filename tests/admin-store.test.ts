import { describe, expect, it } from "vitest";

import { getCatsStore } from "@/lib/cats-store";
import { getHotelStore } from "@/lib/hotel-store";

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
});
