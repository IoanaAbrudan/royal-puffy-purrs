import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

import { uploadBrandImage, type BrandImageKey } from "@/lib/hotel-store";

const brandSchema = z.object({
  key: z.enum(["logo", "storefront"]),
});

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
]);

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  const keyRaw = formData.get("key");

  const parsedKey = brandSchema.safeParse({ key: keyRaw });
  if (!parsedKey.success) {
    return NextResponse.json({ error: "Invalid brand image key" }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, or WebP images are allowed" },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image must be smaller than 8MB" },
      { status: 400 },
    );
  }

  try {
    const path = await uploadBrandImage(parsedKey.data.key as BrandImageKey, file);
    revalidatePath("/");
    return NextResponse.json({ path });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
