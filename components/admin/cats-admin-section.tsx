"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

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
import type { CatsStoreData } from "@/lib/cats-store";

type CatsAdminSectionProps = {
  initialStore: CatsStoreData;
  onMessage: (message: string | null) => void;
  onError: (error: string | null) => void;
  onUnauthorized: () => void;
};

export function CatsAdminSection({
  initialStore,
  onMessage,
  onError,
  onUnauthorized,
}: CatsAdminSectionProps) {
  const [store, setStore] = useState<CatsStoreData>(initialStore);
  const [loading, setLoading] = useState(false);

  const loadStore = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/cats", {
        credentials: "same-origin",
      });
      if (response.status === 401) {
        onUnauthorized();
        return;
      }
      if (!response.ok) {
        onError("Could not load cats data. Please try again.");
        return;
      }
      const data = (await response.json()) as CatsStoreData;
      setStore(data);
    } catch {
      onError("Could not load cats data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [onError, onUnauthorized]);

  async function handleCatUpdate(
    id: string,
    updates: {
      name: string;
      breed: string;
      age: string;
      color: string;
      temperament: string;
      status: "coming-soon" | "available";
      imageAlt: string;
    },
  ) {
    onError(null);
    onMessage(null);
    const response = await fetch(`/api/admin/cats/${id}`, {
      method: "PUT",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      onError(data.error ?? "Could not save cat");
      return;
    }
    onMessage("Cat listing saved.");
    await loadStore();
  }

  async function handleImageUpload(id: string, file: File) {
    onError(null);
    onMessage(null);
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(`/api/admin/cats/${id}/image`, {
      method: "POST",
      credentials: "same-origin",
      body: formData,
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      onError(data.error ?? "Upload failed");
      return;
    }
    onMessage("Cat photo uploaded.");
    await loadStore();
  }

  async function handleImageDelete(id: string) {
    if (!confirm("Remove this cat's photo?")) return;
    onError(null);
    onMessage(null);
    const response = await fetch(`/api/admin/cats/${id}/image`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      onError(data.error ?? "Delete failed");
      return;
    }
    onMessage("Cat photo removed.");
    await loadStore();
  }

  async function handleCatDelete(id: string) {
    if (!confirm("Delete this cat listing entirely?")) return;
    onError(null);
    onMessage(null);
    const response = await fetch(`/api/admin/cats/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      onError(data.error ?? "Delete failed");
      return;
    }
    onMessage("Cat listing deleted.");
    await loadStore();
  }

  async function handleCreateCat(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onError(null);
    onMessage(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/cats", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: String(form.get("id")),
        name: String(form.get("name")),
        breed: String(form.get("breed")),
        age: String(form.get("age")),
        color: String(form.get("color")),
        temperament: String(form.get("temperament")),
        status: String(form.get("status") || "coming-soon"),
        imageAlt: String(form.get("imageAlt") || ""),
      }),
    });
    const data = (await response.json()) as { error?: string };
    if (!response.ok) {
      onError(data.error ?? "Could not create cat");
      return;
    }
    onMessage("Cat listing created.");
    event.currentTarget.reset();
    await loadStore();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-semibold">Cats for sale</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Upload, edit, or delete kitten photos and listings.
        </p>
        {loading && (
          <p className="text-muted-foreground mt-2 text-sm">
            Refreshing listings…
          </p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add new cat</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => void handleCreateCat(event)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <Label htmlFor="cat-id">ID (slug)</Label>
              <Input
                id="cat-id"
                name="id"
                placeholder="prince-oliver"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-name">Name</Label>
              <Input id="cat-name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-breed">Breed</Label>
              <Input
                id="cat-breed"
                name="breed"
                defaultValue="British Shorthair"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-age">Age</Label>
              <Input id="cat-age" name="age" placeholder="12 weeks" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-color">Colour</Label>
              <Input id="cat-color" name="color" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat-status">Status</Label>
              <select
                id="cat-status"
                name="status"
                defaultValue="coming-soon"
                className="border-input bg-background flex h-10 w-full rounded-xl border px-3 py-2 text-sm"
              >
                <option value="coming-soon">Coming soon</option>
                <option value="available">Available</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cat-temperament">Temperament</Label>
              <Textarea
                id="cat-temperament"
                name="temperament"
                required
                rows={3}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="cat-alt">Image alt text (optional)</Label>
              <Input id="cat-alt" name="imageAlt" />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Create cat listing</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {store.cats.length === 0 ? (
        <p className="text-muted-foreground text-sm">No cat listings yet.</p>
      ) : (
        store.cats.map((cat) => (
          <CatEditor
            key={cat.id}
            cat={cat}
            imageVersion={store.imageVersion}
            onSave={handleCatUpdate}
            onUpload={handleImageUpload}
            onDeleteImage={handleImageDelete}
            onDeleteCat={handleCatDelete}
          />
        ))
      )}
    </div>
  );
}

function CatEditor({
  cat,
  imageVersion,
  onSave,
  onUpload,
  onDeleteImage,
  onDeleteCat,
}: {
  cat: CatsStoreData["cats"][number];
  imageVersion: number;
  onSave: (
    id: string,
    updates: {
      name: string;
      breed: string;
      age: string;
      color: string;
      temperament: string;
      status: "coming-soon" | "available";
      imageAlt: string;
    },
  ) => Promise<void>;
  onUpload: (id: string, file: File) => Promise<void>;
  onDeleteImage: (id: string) => Promise<void>;
  onDeleteCat: (id: string) => Promise<void>;
}) {
  const [name, setName] = useState(cat.name);
  const [breed, setBreed] = useState(cat.breed);
  const [age, setAge] = useState(cat.age);
  const [color, setColor] = useState(cat.color);
  const [temperament, setTemperament] = useState(cat.temperament);
  const [status, setStatus] = useState(cat.status);
  const [imageAlt, setImageAlt] = useState(cat.imageAlt ?? "");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{cat.name}</CardTitle>
        <CardDescription>{cat.id}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <div className="space-y-3">
          <div className="bg-muted relative aspect-square overflow-hidden rounded-xl">
            {cat.imagePath ? (
              <Image
                src={`${cat.imagePath}?v=${imageVersion}`}
                alt={cat.imageAlt ?? cat.name}
                fill
                className="object-contain p-2"
                unoptimized
              />
            ) : (
              <div className="text-muted-foreground flex h-full items-center justify-center text-sm">
                No photo yet
              </div>
            )}
          </div>
          <Input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void onUpload(cat.id, file);
            }}
          />
          <div className="flex flex-wrap gap-2">
            {cat.imagePath && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void onDeleteImage(cat.id)}
              >
                Delete photo
              </Button>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => void onDeleteCat(cat.id)}
            >
              Delete listing
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Breed</Label>
              <Input value={breed} onChange={(e) => setBreed(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input value={age} onChange={(e) => setAge(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Colour</Label>
              <Input value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "coming-soon" | "available")
              }
              className="border-input bg-background flex h-10 w-full rounded-xl border px-3 py-2 text-sm"
            >
              <option value="coming-soon">Coming soon</option>
              <option value="available">Available</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Temperament</Label>
            <Textarea
              value={temperament}
              onChange={(e) => setTemperament(e.target.value)}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label>Image alt text</Label>
            <Input
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            />
          </div>
          <Button
            type="button"
            onClick={() =>
              void onSave(cat.id, {
                name,
                breed,
                age,
                color,
                temperament,
                status,
                imageAlt,
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
