import { access } from "node:fs/promises";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import {
  catsContent,
  type CatListing,
  type CatListingRecord,
} from "@/content/cats";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "cats.json");
const CATS_DIR = path.join(process.cwd(), "public", "cats");

export type CatsStoreData = {
  imageVersion: number;
  cats: CatListingRecord[];
};

function defaultStore(): CatsStoreData {
  return {
    imageVersion: catsContent.imageVersion,
    cats: catsContent.cats.map((cat) => ({ ...cat })),
  };
}

async function readStore(): Promise<CatsStoreData> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as CatsStoreData;

    const seen = new Set<string>();
    parsed.cats = parsed.cats.filter((cat) => {
      if (seen.has(cat.id)) return false;
      seen.add(cat.id);
      return true;
    });

    return parsed;
  } catch {
    const defaults = defaultStore();
    try {
      await mkdir(DATA_DIR, { recursive: true });
      await writeFile(DATA_FILE, JSON.stringify(defaults, null, 2), "utf8");
    } catch {
      // Vercel and other read-only environments use bundled defaults in memory.
    }
    return defaults;
  }
}

async function ensureDataFile() {
  await readStore();
}

async function writeStore(data: CatsStoreData) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

async function catImageExists(imagePath?: string) {
  if (!imagePath) return false;
  const relative = imagePath.replace(/^\//, "");
  try {
    await access(path.join(process.cwd(), "public", relative));
    return true;
  } catch {
    return false;
  }
}

export function toPublicCat(
  cat: CatListingRecord,
  imageVersion: number,
): CatListing {
  return {
    id: cat.id,
    name: cat.name,
    breed: cat.breed,
    age: cat.age,
    temperament: cat.temperament,
    color: cat.color,
    status: cat.status,
    ...(cat.imagePath
      ? {
          image: `${cat.imagePath}?v=${imageVersion}`,
          imageAlt: cat.imageAlt ?? `${cat.name} — ${cat.breed}`,
        }
      : {}),
  };
}

export async function getCats(): Promise<{
  imageVersion: number;
  cats: CatListing[];
}> {
  const store = await readStore();
  return {
    imageVersion: store.imageVersion,
    cats: store.cats.map((cat) => toPublicCat(cat, store.imageVersion)),
  };
}

export async function getCatsStore(): Promise<CatsStoreData> {
  return readStore();
}

export async function updateCat(
  id: string,
  updates: Partial<Omit<CatListingRecord, "id">>,
) {
  const store = await readStore();
  const index = store.cats.findIndex((cat) => cat.id === id);
  if (index === -1) throw new Error("Cat not found");

  store.cats[index] = { ...store.cats[index], ...updates };
  await writeStore(store);
  return store.cats[index];
}

export async function createCat(cat: CatListingRecord) {
  const store = await readStore();
  if (store.cats.some((item) => item.id === cat.id)) {
    throw new Error("Cat id already exists");
  }

  store.cats.push(cat);
  await writeStore(store);
  return cat;
}

export async function deleteCat(id: string) {
  const store = await readStore();
  const cat = store.cats.find((item) => item.id === id);
  if (!cat) throw new Error("Cat not found");

  store.cats = store.cats.filter((item) => item.id !== id);
  await writeStore(store);

  if (cat.imagePath) {
    try {
      await unlink(path.join(CATS_DIR, path.basename(cat.imagePath)));
    } catch {
      // file may not exist
    }
  }
}

export async function uploadCatImage(id: string, file: File) {
  const store = await readStore();
  const index = store.cats.findIndex((cat) => cat.id === id);
  if (index === -1) throw new Error("Cat not found");

  await mkdir(CATS_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${id}.jpg`;
  const outputPath = path.join(CATS_DIR, filename);

  await sharp(buffer)
    .rotate()
    .resize(2560, 2560, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .sharpen({ sigma: 0.8 })
    .jpeg({ quality: 94, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);

  store.cats[index].imagePath = `/cats/${filename}`;
  if (!store.cats[index].imageAlt) {
    store.cats[index].imageAlt = `${store.cats[index].name} — ${store.cats[index].breed}`;
  }
  store.imageVersion += 1;
  await writeStore(store);

  return {
    cat: store.cats[index],
    imageVersion: store.imageVersion,
  };
}

export async function deleteCatImage(id: string) {
  const store = await readStore();
  const index = store.cats.findIndex((cat) => cat.id === id);
  if (index === -1) throw new Error("Cat not found");

  const imagePath = store.cats[index].imagePath;
  if (imagePath) {
    try {
      await unlink(path.join(CATS_DIR, path.basename(imagePath)));
    } catch {
      // file may not exist
    }
    delete store.cats[index].imagePath;
    delete store.cats[index].imageAlt;
  }

  store.imageVersion += 1;
  await writeStore(store);
  return store.imageVersion;
}

export async function catHasImage(id: string) {
  const store = await readStore();
  const cat = store.cats.find((item) => item.id === id);
  if (!cat?.imagePath) return false;
  return catImageExists(cat.imagePath);
}
