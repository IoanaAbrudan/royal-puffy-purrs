import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with accessible label", () => {
    render(<Button>Book a suite</Button>);
    expect(
      screen.getByRole("button", { name: "Book a suite" }),
    ).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it("renders status text", () => {
    render(<Badge>Available</Badge>);
    expect(screen.getByText("Available")).toBeInTheDocument();
  });
});
