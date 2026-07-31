import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { deleteCat, updateCat } from "@/lib/cats-store";

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  breed: z.string().min(2).optional(),
  age: z.string().min(2).optional(),
  temperament: z.string().min(5).optional(),
  color: z.string().min(2).optional(),
  status: z.enum(["coming-soon", "available"]).optional(),
  imageAlt: z.string().optional(),
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
    return NextResponse.json({ error: "Invalid cat data" }, { status: 400 });
  }

  try {
    const cat = await updateCat(id, parsed.data);
    revalidatePath("/");
    return NextResponse.json({ cat });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update cat";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  try {
    await deleteCat(id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not delete cat";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}
