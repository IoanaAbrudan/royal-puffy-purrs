import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { deleteSuite, updateSuite } from "@/lib/hotel-store";

const updateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  highlights: z.array(z.string().min(1)).optional(),
  imageAlt: z.string().min(2).optional(),
  objectPosition: z.string().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid suite data" }, { status: 400 });
  }

  try {
    const suite = await updateSuite(id, parsed.data);
    revalidatePath("/");
    return NextResponse.json({ suite });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update suite";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    await deleteSuite(id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete suite";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
