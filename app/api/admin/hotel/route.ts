import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createSuite, getHotelStore } from "@/lib/hotel-store";

const createSchema = z.object({
  id: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().min(2),
  description: z.string().min(10),
  highlights: z.array(z.string().min(1)).default([]),
  imageAlt: z.string().min(2),
  objectPosition: z.string().default("center"),
});

export async function GET() {
  const store = await getHotelStore();
  return NextResponse.json(store);
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
    return NextResponse.json({ error: "Invalid suite data" }, { status: 400 });
  }

  try {
    const suite = await createSuite(parsed.data);
    revalidatePath("/");
    return NextResponse.json({ suite }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create suite";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
