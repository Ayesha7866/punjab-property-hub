import { mkdir, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import { MEDIA_LIMITS } from "@/lib/media";

export { MEDIA_LIMITS, countPhotos, countVideos, isVideoMime } from "@/lib/media";

function sniff(buffer: Buffer): { ext: string; mime: string } | null {
  if (buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: "jpg", mime: "image/jpeg" };
  }
  if (
    buffer.length > 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return { ext: "png", mime: "image/png" };
  }
  if (
    buffer.length > 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return { ext: "webp", mime: "image/webp" };
  }
  if (buffer.length > 12 && buffer.subarray(4, 8).toString("ascii") === "ftyp") {
    return { ext: "mp4", mime: "video/mp4" };
  }
  if (
    buffer.length > 4 &&
    buffer[0] === 0x1a &&
    buffer[1] === 0x45 &&
    buffer[2] === 0xdf &&
    buffer[3] === 0xa3
  ) {
    return { ext: "webm", mime: "video/webm" };
  }
  return null;
}

export function uploadDir() {
  const configured = process.env.UPLOAD_DIR;
  if (configured) {
    return path.resolve(/* turbopackIgnore: true */ configured);
  }
  return path.join(process.cwd(), "storage", "uploads");
}

export async function savePropertyMedia(
  files: File[],
  already: { photos: number; videos: number } = { photos: 0, videos: 0 },
) {
  const usable = files.filter((file) => file.size > 0);
  await mkdir(uploadDir(), { recursive: true });
  const saved: { fileName: string; mimeType: string }[] = [];
  let photos = already.photos;
  let videos = already.videos;

  for (const [index, file] of usable.entries()) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const kind = sniff(buffer);
    if (!kind) {
      throw new Error("Use JPEG, PNG, or WebP photos, and MP4 or WebM video.");
    }
    const video = kind.mime.startsWith("video/");
    if (video) {
      if (file.size > MEDIA_LIMITS.maxVideoBytes) {
        throw new Error("Each video must be 32 MB or smaller.");
      }
      videos += 1;
      if (videos > MEDIA_LIMITS.maxVideos) {
        throw new Error(`You can add at most ${MEDIA_LIMITS.maxVideos} videos.`);
      }
    } else {
      if (file.size > MEDIA_LIMITS.maxPhotoBytes) {
        throw new Error("Each photo must be 5 MB or smaller.");
      }
      photos += 1;
      if (photos > MEDIA_LIMITS.maxPhotos) {
        throw new Error(`You can add at most ${MEDIA_LIMITS.maxPhotos} photos.`);
      }
    }
    const fileName = `${Date.now()}-${index}-${Math.random().toString(16).slice(2)}.${kind.ext}`;
    await writeFile(path.join(uploadDir(), fileName), buffer);
    saved.push({ fileName, mimeType: kind.mime });
  }
  return saved;
}

export async function deleteStoredFile(fileName: string) {
  const safe = path.basename(fileName);
  await unlink(path.join(/* turbopackIgnore: true */ uploadDir(), safe)).catch(
    () => undefined,
  );
}
