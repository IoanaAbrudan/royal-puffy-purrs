import { NextResponse } from "next/server";
import { z } from "zod";

const contactPayloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiryType: z.enum(["hotel", "sale", "general"]),
  message: z.string().min(10),
});

const inquiryLabels = {
  hotel: "Cat hotel booking",
  sale: "Cats for sale",
  general: "General enquiry",
} as const;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 400 },
    );
  }

  const contactEmail =
    process.env.CONTACT_EMAIL ?? "cattery@royalpuffypurrs.com";
  const { name, email, phone, inquiryType, message } = parsed.data;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: siteUrl,
        Referer: `${siteUrl}/contact`,
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone ?? "Not provided",
        inquiryType: inquiryLabels[inquiryType],
        message,
        _subject: `Royal Puffy Purrs — ${inquiryLabels[inquiryType]} from ${name}`,
        _captcha: "false",
        _template: "table",
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 },
    );
  }

  try {
    const result = (await response.json()) as {
      success?: string | boolean;
      message?: string;
    };

    if (result.success === "false" || result.success === false) {
      return NextResponse.json(
        {
          error:
            result.message ??
            "Could not send your message. Please try again later.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, result });
  } catch {
    return NextResponse.json({ success: true });
  }
}
