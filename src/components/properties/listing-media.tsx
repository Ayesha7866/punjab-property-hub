import { isVideoMime } from "@/lib/media";

export function ListingMedia({
  items,
  title,
}: {
  items: { id: string; mimeType: string }[];
  title: string;
}) {
  if (items.length === 0) {
    return <div className="relative h-72 overflow-hidden rounded-[1.6rem] bg-cream" />;
  }
  return (
    <div className="grid gap-3">
      {items.map((item) =>
        isVideoMime(item.mimeType) ? (
          <video
            key={item.id}
            className="h-72 w-full rounded-[1.6rem] bg-black object-contain"
            controls
            playsInline
            preload="metadata"
            src={`/api/media/${item.id}`}
          >
            Your browser cannot play this video.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.id}
            src={`/api/media/${item.id}`}
            alt={title}
            className="h-72 w-full rounded-[1.6rem] object-cover"
          />
        ),
      )}
    </div>
  );
}

export function ListingMediaThumb({
  item,
}: {
  item: { id: string; mimeType?: string };
}) {
  if (item.mimeType && isVideoMime(item.mimeType)) {
    return (
      <video
        className="h-24 w-full rounded-md bg-black object-cover"
        muted
        playsInline
        preload="metadata"
        src={`/api/media/${item.id}`}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/api/media/${item.id}`} alt="" className="h-24 w-full rounded-md object-cover" />
  );
}
