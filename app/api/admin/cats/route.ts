import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createCat, getCatsStore } from "@/lib/cats-store";

const createSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  name: z.string().min(2),
  breed: z.string().min(2),
  age: z.string().min(2),
  temperament: z.string().min(5),
  color: z.string().min(2),
  status: z.enum(["coming-soon", "available"]).default("coming-soon"),
  imageAlt: z.string().optional(),
});

export async function GET() {
  try {
    const store = await getCatsStore();
    return NextResponse.json(store);
  } catch (error) {
    console.error("GET /api/admin/cats failed", error);
    return NextResponse.json(
      { error: "Could not load cats data. Please try again." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cat data" }, { status: 400 });
  }

  try {
    const cat = await createCat(parsed.data);
    revalidatePath("/");
    return NextResponse.json({ cat }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not create cat";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
