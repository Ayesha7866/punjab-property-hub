import { punjabPlaces } from "@/data/punjab-locations";

export function CityTicker() {
  const places = punjabPlaces;
  const loop = [...places.slice(0, 36), ...places.slice(0, 36)];
  const reverse = [...places.slice(36, 72), ...places.slice(36, 72)];

  return (
    <section className="border-y border-brand/10 bg-brand-deep py-4" aria-label="Punjab cities in the search directory">
      <h2 className="sr-only">Punjab cities and towns indexed for search</h2>
      <ul className="sr-only">
        {places.map((place) => (
          <li key={place.slug}>
            {place.name}, {place.district}
          </li>
        ))}
      </ul>
      <div className="overflow-hidden" aria-hidden="true">
        <div className="animate-marquee flex w-max gap-10 py-1 text-sm font-medium tracking-wide text-gold/80">
          {loop.map((place, index) => (
            <span key={`a-${place.slug}-${index}`} className="uppercase">
              {place.name}
              <span className="mx-4 text-terracotta">✦</span>
            </span>
          ))}
        </div>
        <div className="animate-marquee-reverse mt-1 flex w-max gap-10 py-1 text-xs tracking-[0.2em] text-white/35">
          {reverse.map((place, index) => (
            <span key={`b-${place.slug}-${index}`}>{place.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
