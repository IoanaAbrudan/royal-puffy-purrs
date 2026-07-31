"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  inquiryType: z.enum(["hotel", "sale", "general"], {
    message: "Please select an inquiry type",
  }),
  message: z
    .string()
    .min(10, "Please share a few more details (at least 10 characters)"),
  website: z.string().max(0, "Invalid submission").optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inquiryParam = searchParams.get("inquiry");
  const catParam = searchParams.get("cat");
  const suiteParam = searchParams.get("suite");
  const defaultInquiry =
    inquiryParam === "sale" || inquiryParam === "hotel" || inquiryParam === "general"
      ? inquiryParam
      : "hotel";
  const defaultMessage =
    suiteParam && inquiryParam === "hotel"
      ? `I would like to book ${suiteParam}. Please let me know availability and next steps.`
      : catParam && inquiryParam === "sale"
        ? `I would like to join the waitlist${catParam ? ` for ${catParam}` : ""}.`
        : inquiryParam === "sale"
          ? "I would like to join the waitlist for your upcoming kittens."
          : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: defaultInquiry,
      message: defaultMessage,
      website: "",
    },
  });

  useEffect(() => {
    reset({
      inquiryType: defaultInquiry,
      message: defaultMessage,
      website: "",
    });
  }, [defaultInquiry, defaultMessage, reset]);

  async function onSubmit(data: ContactFormValues) {
    if (data.website) return;
    setSubmitError(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        inquiryType: data.inquiryType,
        message: data.message,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;
      setSubmitError(
        payload?.error ??
          "We could not send your message. Please try again or email us directly.",
      );
      return;
    }

    setSubmitted(true);
    reset({ inquiryType: "hotel", website: "" });
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="rounded-xl border border-border bg-secondary/40 p-6"
      >
        <p className="font-medium">Thank you — we received your message.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our concierge team will reply within one business day.
        </p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="sr-only" aria-hidden>
        <Label htmlFor="website">Website</Label>
        <Input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" {...register("name")} />
          {errors.name && (
            <p className="text-sm text-red-600" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="inquiryType">I&apos;m interested in</Label>
          <select
            id="inquiryType"
            className="flex h-11 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            {...register("inquiryType")}
          >
            <option value="hotel">Cat hotel booking</option>
            <option value="sale">Cats for sale — waitlist</option>
            <option value="general">General enquiry</option>
          </select>
          {errors.inquiryType && (
            <p className="text-sm text-red-600" role="alert">
              {errors.inquiryType.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your cat, preferred hotel dates, or that you'd like to join the kitten waitlist..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-sm text-red-600" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <Button type="submit" variant="accent" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
