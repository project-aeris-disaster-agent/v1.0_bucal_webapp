import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicMedia = path.join(root, "public", "media");

await mkdir(path.join(publicMedia, "ads"), { recursive: true });

await sharp(path.join(root, "media", "bucal_background.svg"))
  .resize(1024, null, { withoutEnlargement: true })
  .webp({ quality: 72 })
  .toFile(path.join(publicMedia, "bucal_background.webp"));

await sharp(path.join(root, "media", "bucal_background.svg"))
  .resize(512, null, { withoutEnlargement: true })
  .webp({ quality: 65 })
  .toFile(path.join(publicMedia, "bucal_background_mobile.webp"));

await sharp(path.join(root, "media", "ads", "ads_v1_2026.gif"), {
  animated: false,
  page: 0,
})
  .webp({ quality: 80 })
  .toFile(path.join(publicMedia, "ads", "ads_v1_2026.webp"));

await sharp(path.join(root, "media", "bucal_logo.svg"))
  .resize(128, null, { withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(path.join(publicMedia, "favicon.webp"));

console.log("Optimized images written to public/media/");

const schoolLogos = ["9", "10", "11", "12", "13", "14"];
for (const id of schoolLogos) {
  await sharp(path.join(publicMedia, "school_logo", `${id}.svg`))
    .resize(128, 128, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85 })
    .toFile(path.join(publicMedia, "school_logo", `${id}.webp`));
}

console.log("School logo WebP thumbnails written.");
