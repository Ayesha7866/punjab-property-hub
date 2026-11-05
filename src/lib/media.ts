export const MEDIA_LIMITS = {
  maxPhotos: 20,
  maxVideos: 2,
  maxPhotoBytes: 5 * 1024 * 1024,
  maxVideoBytes: 32 * 1024 * 1024,
};

export function isVideoMime(mime: string) {
  return mime.startsWith("video/");
}

export function countPhotos(items: { mimeType: string }[]) {
  return items.filter((item) => !isVideoMime(item.mimeType)).length;
}

export function countVideos(items: { mimeType: string }[]) {
  return items.filter((item) => isVideoMime(item.mimeType)).length;
}
