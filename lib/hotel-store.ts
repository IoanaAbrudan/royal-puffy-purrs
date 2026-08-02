import { access } from "node:fs/promises";
import { mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import {
  hotelContent,
  type HotelSuite,
  type HotelSuiteRecord,
} from "@/content/hotel";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "hotel-suites.json");
const HOTEL_DIR = path.join(process.cwd(), "public", "hotel");
const BRAND_DIR = path.join(process.cwd(), "public", "brand");

export type HotelStoreData = {
  imageVersion: number;
  suites: HotelSuiteRecord[];
};

export type BrandImageKey = "logo" | "storefront";

const BRAND_FILES: Record<BrandImageKey, string> = {
  logo: "logo.png",
  storefront: "storefront.png",
};

function defaultStore(): HotelStoreData {
  return {
    imageVersion: hotelContent.imageVersion,
    suites: hotelContent.suites.map((suite) => ({
      id: suite.id,
      title: suite.title,
      description: suite.description,
      highlights: [...suite.highlights],
      imagePath: suite.imagePath,
      imageAlt: suite.imageAlt,
      objectPosition: suite.objectPosition,
      ...(suite.images ? { images: suite.images.map((image) => ({ ...image })) } : {}),
    })),
  };
}

async function ensureDataFile() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(defaultStore(), null, 2), "utf8");
  }
}

async function readStore(): Promise<HotelStoreData> {
  await ensureDataFile();
  const raw = await readFile(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw) as HotelStoreData;

  const seen = new Set<string>();
  parsed.suites = parsed.suites.filter((suite) => {
    if (seen.has(suite.id)) return false;
    seen.add(suite.id);
    return true;
  });

  return parsed;
}

async function suiteImageExists(imagePath: string) {
  const relative = imagePath.replace(/^\//, "");
  try {
    await access(path.join(process.cwd(), "public", relative));
    return true;
  } catch {
    return false;
  }
}

async function writeStore(data: HotelStoreData) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function toPublicSuite(
  suite: HotelSuiteRecord,
  imageVersion: number,
): HotelSuite {
  const imageSources =
    suite.images && suite.images.length > 0
      ? suite.images
      : [
          {
            imagePath: suite.imagePath,
            imageAlt: suite.imageAlt,
            objectPosition: suite.objectPosition,
          },
        ];

  const images = imageSources.map((item) => ({
    image: `${item.imagePath}?v=${imageVersion}`,
    imageAlt: item.imageAlt,
    objectPosition: item.objectPosition ?? suite.objectPosition,
  }));

  const primary = images[0];

  return {
    id: suite.id,
    title: suite.title,
    description: suite.description,
    highlights: suite.highlights,
    image: primary.image,
    imageAlt: primary.imageAlt,
    objectPosition: primary.objectPosition,
    images,
  };
}

export async function getHotelSuites(): Promise<{
  imageVersion: number;
  suites: HotelSuite[];
}> {
  const store = await readStore();
  const suites: HotelSuite[] = [];

  for (const suite of store.suites) {
    const imageSources =
      suite.images && suite.images.length > 0
        ? suite.images
        : [
            {
              imagePath: suite.imagePath,
              imageAlt: suite.imageAlt,
              objectPosition: suite.objectPosition,
            },
          ];

    const images = [];
    for (const item of imageSources) {
      if (await suiteImageExists(item.imagePath)) {
        images.push({
          image: `${item.imagePath}?v=${store.imageVersion}`,
          imageAlt: item.imageAlt,
          objectPosition: item.objectPosition ?? suite.objectPosition,
        });
      }
    }

    if (images.length === 0) continue;

    const primary = images[0];
    suites.push({
      id: suite.id,
      title: suite.title,
      description: suite.description,
      highlights: suite.highlights,
      image: primary.image,
      imageAlt: primary.imageAlt,
      objectPosition: primary.objectPosition,
      images,
    });
  }

  return {
    imageVersion: store.imageVersion,
    suites,
  };
}

export async function getHotelStore(): Promise<HotelStoreData> {
  return readStore();
}

export async function updateSuite(
  id: string,
  updates: Partial<Omit<HotelSuiteRecord, "id">>,
) {
  const store = await readStore();
  const index = store.suites.findIndex((suite) => suite.id === id);
  if (index === -1) throw new Error("Suite not found");

  store.suites[index] = { ...store.suites[index], ...updates };
  await writeStore(store);
  return store.suites[index];
}

export async function createSuite(
  suite: Omit<HotelSuiteRecord, "imagePath"> & { imagePath?: string },
) {
  const store = await readStore();
  if (store.suites.some((item) => item.id === suite.id)) {
    throw new Error("Suite id already exists");
  }

  const record: HotelSuiteRecord = {
    ...suite,
    imagePath: suite.imagePath ?? `/hotel/${suite.id}.jpg`,
    highlights: suite.highlights ?? [],
  };
  store.suites.push(record);
  await writeStore(store);
  return record;
}

export async function deleteSuite(id: string) {
  const store = await readStore();
  const suite = store.suites.find((item) => item.id === id);
  if (!suite) throw new Error("Suite not found");

  store.suites = store.suites.filter((item) => item.id !== id);
  await writeStore(store);

  const filename = path.basename(suite.imagePath);
  try {
    await unlink(path.join(HOTEL_DIR, filename));
  } catch {
    // file may not exist
  }
}

export async function uploadSuiteImage(id: string, file: File) {
  const store = await readStore();
  const index = store.suites.findIndex((suite) => suite.id === id);
  if (index === -1) throw new Error("Suite not found");

  await mkdir(HOTEL_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${id}.jpg`;
  const outputPath = path.join(HOTEL_DIR, filename);

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

  store.suites[index].imagePath = `/hotel/${filename}`;
  store.imageVersion += 1;
  await writeStore(store);

  return {
    suite: store.suites[index],
    imageVersion: store.imageVersion,
  };
}

export async function deleteSuiteImage(id: string) {
  const store = await readStore();
  const index = store.suites.findIndex((suite) => suite.id === id);
  if (index === -1) throw new Error("Suite not found");

  const filename = path.basename(store.suites[index].imagePath);
  try {
    await unlink(path.join(HOTEL_DIR, filename));
  } catch {
    // file may not exist
  }

  store.suites.splice(index, 1);
  store.imageVersion += 1;
  await writeStore(store);
  return store.imageVersion;
}

export async function uploadBrandImage(key: BrandImageKey, file: File) {
  await mkdir(BRAND_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = BRAND_FILES[key];
  const outputPath = path.join(BRAND_DIR, filename);

  const pipeline = sharp(buffer).rotate();
  if (key === "logo") {
    await pipeline.png({ quality: 92 }).toFile(outputPath);
  } else {
    await pipeline
      .resize(1920, undefined, { fit: "inside", withoutEnlargement: false })
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(outputPath);
  }

  const store = await readStore();
  store.imageVersion += 1;
  await writeStore(store);

  return `/brand/${filename}?v=${store.imageVersion}`;
}
