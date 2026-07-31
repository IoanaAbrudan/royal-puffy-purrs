import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assetsDir =
  "C:\\Users\\ioana\\.cursor\\projects\\c-Users-ioana-royal-puffy-purrs\\assets";
const hotelDir = path.join(root, "public", "hotel");
const outDir = hotelDir;

const images = [
  {
    pattern: "52f06675-0d0b-4483-a7a7-20595d570257",
    fallback: null,
    output: "garden-suite.jpg",
  },
  {
    pattern: "4b635eb0-ca59-4aad-b1e7-3d80656d7f79-71295a7a",
    fallback: "deluxe-suite.png",
    output: "deluxe-suite.jpg",
  },
  {
    pattern: "9bcc6989-b9fc-4c59-a9e4-9d87b3c3554d-da34ac32",
    fallback: "suites-hallway.png",
    output: "suites-hallway.jpg",
  },
  {
    pattern: "c3bdacaf-d4e2-4e9d-8d8b-339692e070a4-9190292a",
    fallback: "guests-cubby-2.png",
    output: "cozy-cubby.jpg",
  },
  {
    pattern: "f6a5b944-a2e6-4fd0-a19e-41d25297cd77-48515ddd",
    fallback: "guests-cubby-1.png",
    output: "wall-cubby.jpg",
  },
  {
    pattern: "dd8609f3-b332-4ad2-8615-dd07e8850950-94d32b2f",
    fallback: null,
    output: "suite-gallery.jpg",
  },
];

async function listFiles(dir) {
  try {
    return await readdir(dir);
  } catch {
    return [];
  }
}

async function findAsset(pattern, fallback) {
  const assetFiles = await listFiles(assetsDir);
  const matches = assetFiles.filter((file) => file.includes(pattern));

  if (matches.length > 0) {
    matches.sort((a, b) => b.length - a.length);
    return { input: path.join(assetsDir, matches[0]), source: "assets" };
  }

  if (fallback) {
    const fallbackPath = path.join(hotelDir, fallback);
    try {
      await stat(fallbackPath);
      return { input: fallbackPath, source: "public/hotel fallback" };
    } catch {
      // continue to error below
    }
  }

  throw new Error(`Source image not found for pattern: ${pattern}`);
}

async function enhance(inputPath, outputPath) {
  await sharp(inputPath)
    .rotate()
    .resize(1920, undefined, {
      fit: "inside",
      withoutEnlargement: false,
      kernel: sharp.kernel.lanczos3,
    })
    .median(3)
    .normalize()
    .gamma(1.04)
    .modulate({ brightness: 1.06, saturation: 1.14 })
    .linear(1.12, -(128 * 0.1))
    .sharpen({ sigma: 1.8, m1: 2.2, m2: 0.55, x1: 2, y2: 10, y3: 20 })
    .jpeg({ quality: 90, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(outputPath);
}

await mkdir(outDir, { recursive: true });

for (const { pattern, fallback, output } of images) {
  const { input, source } = await findAsset(pattern, fallback);
  const dest = path.join(outDir, output);
  await enhance(input, dest);
  const meta = await sharp(dest).metadata();
  console.log(`✓ ${output} (${meta.width}x${meta.height}) ← ${source}`);
}
