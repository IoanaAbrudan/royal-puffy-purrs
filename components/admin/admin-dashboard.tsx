"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { CatsAdminSection } from "@/components/admin/cats-admin-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HotelStoreData } from "@/lib/hotel-store";

export function AdminDashboard() {
  const router = useRouter();
  const [store, setStore] = useState<HotelStoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/hotel", { credentials: "same-origin" });
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Could not load admin data. Please try again.");
        return;
      }
      const data = (await response.json()) as HotelStoreData;
      setStore(data);
    } catch {
      setError("Could not load admin data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadStore();
  }, [loadStore]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
    router.push("/admin/login");
    router.refresh();
  }

  async function handleSuiteUpdate(
    id: string,
    updates: {
      title: string;
      description: string;
      highlights: string;
      imageAlt: string;
      objectPosition: string;
    },
  ) {
    setError(null);
    setMessage(null);
    const response = await fetch(`/api/admin/hotel/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updates,
        highlights: updates.highlights
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Could not save suite");
      return;
    }
    setMessage("Suite saved.");
    await loadStore();
  }

  async function handleImageUpload(id: string, file: File) {
    setError(null);
    setMessage(null);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/admin/hotel/${id}/image`, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Upload failed");
      return;
    }
    setMessage("Image uploaded.");
    await loadStore();
  }

  async function handleImageDelete(id: string) {
    if (!confirm("Remove this suite and its photo from the website?")) return;
    setError(null);
    setMessage(null);
    const response = await fetch(`/api/admin/hotel/${id}/image`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Delete failed");
      return;
    }
    setMessage("Suite removed from website.");
    await loadStore();
  }

  async function handleSuiteDelete(id: string) {
    if (!confirm("Delete this entire suite?")) return;
    setError(null);
    setMessage(null);
    const response = await fetch(`/api/admin/hotel/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Delete failed");
      return;
    }
    setMessage("Suite deleted.");
    await loadStore();
  }

  async function handleBrandUpload(key: "logo" | "storefront", file: File) {
    setError(null);
    setMessage(null);
    const formData = new FormData();
    formData.append("key", key);
    formData.append("file", file);
    const response = await fetch("/api/admin/brand", {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Upload failed");
      return;
    }
    setMessage(`${key} updated.`);
    router.refresh();
  }

  async function handleCreateSuite(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/hotel", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(form.get("id")),
        title: String(form.get("title")),
        description: String(form.get("description")),
        imageAlt: String(form.get("imageAlt")),
        objectPosition: String(form.get("objectPosition") || "center"),
        highlights: String(form.get("highlights"))
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
      }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      setError(data.error ?? "Could not create suite");
      return;
    }
    setMessage("Suite created.");
    event.currentTarget.reset();
    await loadStore();
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading admin…</p>;
  }

  if (!store) {
    return (
      <div className="space-y-4">
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error ?? "Could not load admin data. Please try again."}
        </p>
        <Button variant="outline" onClick={() => void loadStore()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Picture manager</h1>
          <p className="mt-1 text-muted-foreground">
            Upload, edit, or delete hotel, brand, and cats for sale photos.
          </p>
        </div>
        <Button variant="outline" onClick={() => void handleLogout()}>
          Sign out
        </Button>
      </div>

      {(message || error) && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            error
              ? "bg-destructive/10 text-destructive"
              : "bg-secondary text-foreground"
          }`}
        >
          {error ?? message}
        </p>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Brand images</CardTitle>
          <CardDescription>Logo and homepage storefront photo</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          {(["logo", "storefront"] as const).map((key) => (
            <div key={key} className="space-y-3 rounded-2xl border border-border p-4">
              <p className="text-sm font-medium capitalize">{key}</p>
              <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
                <Image
                  src={`/brand/${key === "logo" ? "logo.png" : "storefront.png"}?v=${store.imageVersion}`}
                  alt={key}
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
              <Input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void handleBrandUpload(key, file);
                }}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add new suite</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => void handleCreateSuite(event)} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-id">ID (slug)</Label>
              <Input id="new-id" name="id" placeholder="sunset-suite" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-title">Title</Label>
              <Input id="new-title" name="title" required />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea id="new-description" name="description" required rows={3} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="new-highlights">Highlights (one per line)</Label>
              <Textarea id="new-highlights" name="highlights" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-alt">Image alt text</Label>
              <Input id="new-alt" name="imageAlt" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-position">Object position</Label>
              <Input id="new-position" name="objectPosition" defaultValue="center" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Create suite</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h2 className="font-display text-2xl font-semibold">Hotel suites</h2>
        {store.suites.map((suite) => (
          <SuiteEditor
            key={suite.id}
            suite={suite}
            imageVersion={store.imageVersion}
            onSave={handleSuiteUpdate}
            onUpload={handleImageUpload}
            onDeleteImage={handleImageDelete}
            onDeleteSuite={handleSuiteDelete}
          />
        ))}
      </div>

      <CatsAdminSection
        onMessage={setMessage}
        onError={setError}
        onUnauthorized={() => router.push("/admin/login")}
      />
    </div>
  );
}

function SuiteEditor({
  suite,
  imageVersion,
  onSave,
  onUpload,
  onDeleteImage,
  onDeleteSuite,
}: {
  suite: HotelStoreData["suites"][number];
  imageVersion: number;
  onSave: (
    id: string,
    updates: {
      title: string;
      description: string;
      highlights: string;
      imageAlt: string;
      objectPosition: string;
    },
  ) => Promise<void>;
  onUpload: (id: string, file: File) => Promise<void>;
  onDeleteImage: (id: string) => Promise<void>;
  onDeleteSuite: (id: string) => Promise<void>;
}) {
  const [title, setTitle] = useState(suite.title);
  const [description, setDescription] = useState(suite.description);
  const [highlights, setHighlights] = useState(suite.highlights.join("\n"));
  const [imageAlt, setImageAlt] = useState(suite.imageAlt);
  const [objectPosition, setObjectPosition] = useState(suite.objectPosition);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{suite.title}</CardTitle>
        <CardDescription>{suite.id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
            <Image
              src={`${suite.imagePath}?v=${imageVersion}`}
              alt={suite.imageAlt}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onUpload(suite.id, file);
            }}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void onDeleteImage(suite.id)}
            >
              Remove from site
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void onDeleteSuite(suite.id)}
            >
              Delete suite
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Highlights (one per line)</Label>
            <Textarea
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Image alt text</Label>
              <Input value={imageAlt} onChange={(e) => setImageAlt(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Object position</Label>
              <Input
                value={objectPosition}
                onChange={(e) => setObjectPosition(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={() =>
              void onSave(suite.id, {
                title,
                description,
                highlights,
                imageAlt,
                objectPosition,
              })
            }
          >
            Save changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
