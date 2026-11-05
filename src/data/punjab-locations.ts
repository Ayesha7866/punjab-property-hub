/**
 * Punjab, Pakistan location catalogue for search and navigation.
 * One file is the source for selectors — do not copy city names into random pages.
 * Names are districts, tehsils, and commonly searched cities/towns. Not village-level
 * and not invented housing societies or map pins.
 */

export type PunjabPlace = {
  slug: string;
  name: string;
  district: string;
  districtSlug: string;
};

export type PopularCity = PunjabPlace & {
  blurb: string;
  imageSrc: string;
  imageAlt: string;
  imageCredit: string;
};

type DistrictSeed = {
  name: string;
  places: string[];
};

const DISTRICT_SEEDS: DistrictSeed[] = [
  {
    name: "Attock",
    places: [
      "Attock",
      "Fateh Jang",
      "Hasan Abdal",
      "Hazro",
      "Jand",
      "Pindi Gheb",
      "Sanjwal",
    ],
  },
  {
    name: "Bahawalnagar",
    places: [
      "Bahawalnagar",
      "Chishtian",
      "Fort Abbas",
      "Haroonabad",
      "Minchinabad",
      "Dunga Bunga",
      "Faqirwali",
    ],
  },
  {
    name: "Bahawalpur",
    places: [
      "Bahawalpur",
      "Ahmadpur East",
      "Hasilpur",
      "Khairpur Tamewali",
      "Yazman",
      "Uch Sharif",
    ],
  },
  {
    name: "Bhakkar",
    places: ["Bhakkar", "Darya Khan", "Kallur Kot", "Mankera", "Jandanwala"],
  },
  {
    name: "Chakwal",
    places: [
      "Chakwal",
      "Choa Saidan Shah",
      "Kallar Kahar",
      "Talagang",
      "Lawa",
      "Balkassar",
    ],
  },
  {
    name: "Chiniot",
    places: ["Chiniot", "Bhowana", "Lalian", "Chenab Nagar"],
  },
  {
    name: "Dera Ghazi Khan",
    places: [
      "Dera Ghazi Khan",
      "Kot Chutta",
      "Taunsa",
      "Vehoa",
      "Sakhi Sarwar",
    ],
  },
  {
    name: "Faisalabad",
    places: [
      "Faisalabad",
      "Chak Jhumra",
      "Jaranwala",
      "Samundri",
      "Tandlianwala",
      "Khurrianwala",
      "Dijkot",
      "Mamukanjan",
      "Satiana",
      "Aminpur",
    ],
  },
  {
    name: "Gujranwala",
    places: [
      "Gujranwala",
      "Kamoke",
      "Nowshera Virkan",
      "Wazirabad",
      "Qila Didar Singh",
      "Ghakhar Mandi",
      "Alipur Chatha",
      "Rahwali",
      "Eminabad",
    ],
  },
  {
    name: "Gujrat",
    places: [
      "Gujrat",
      "Kharian",
      "Sarai Alamgir",
      "Jalalpur Jattan",
      "Lalamusa",
      "Dinga",
      "Kunjah",
    ],
  },
  {
    name: "Hafizabad",
    places: [
      "Hafizabad",
      "Pindi Bhattian",
      "Sukheke",
      "Jalalpur Bhattian",
    ],
  },
  {
    name: "Jhang",
    places: [
      "Jhang",
      "Shorkot",
      "Ahmadpur Sial",
      "Athara Hazari",
      "Garh Maharaja",
      "Mandi Shah Jeewna",
    ],
  },
  {
    name: "Jhelum",
    places: [
      "Jhelum",
      "Dina",
      "Pind Dadan Khan",
      "Sohawa",
      "Khewra",
      "Jalalpur Sharif",
    ],
  },
  {
    name: "Kasur",
    places: [
      "Kasur",
      "Chunian",
      "Kot Radha Kishan",
      "Pattoki",
      "Phool Nagar",
      "Raja Jang",
      "Mustafabad",
      "Khudian",
    ],
  },
  {
    name: "Khanewal",
    places: [
      "Khanewal",
      "Jahanian",
      "Kabirwala",
      "Mian Channu",
      "Abdul Hakim",
    ],
  },
  {
    name: "Khushab",
    places: [
      "Jauharabad",
      "Khushab",
      "Noorpur Thal",
      "Quaidabad",
      "Naushera",
      "Hadali",
      "Mitha Tiwana",
    ],
  },
  {
    name: "Lahore",
    places: [
      "Lahore",
      "Raiwind",
      "Kahna Nau",
      "Shahdara",
      "Wagah",
      "Chung",
      "Manga Mandi",
      "Jia Bagga",
    ],
  },
  {
    name: "Layyah",
    places: [
      "Layyah",
      "Chaubara",
      "Karor Lal Esan",
      "Chowk Azam",
      "Fatehpur",
      "Kot Sultan",
    ],
  },
  {
    name: "Lodhran",
    places: ["Lodhran", "Dunyapur", "Kahror Pacca", "Gogran"],
  },
  {
    name: "Mandi Bahauddin",
    places: [
      "Mandi Bahauddin",
      "Malakwal",
      "Phalia",
      "Qadirabad",
      "Miana Gondal",
    ],
  },
  {
    name: "Mianwali",
    places: [
      "Mianwali",
      "Isa Khel",
      "Piplan",
      "Kundian",
      "Kalabagh",
      "Daud Khel",
      "Wan Bhachran",
    ],
  },
  {
    name: "Multan",
    places: [
      "Multan",
      "Shujabad",
      "Jalalpur Pirwala",
      "Qadirpur Ran",
      "Budhla Sant",
      "Makhdoom Rashid",
    ],
  },
  {
    name: "Muzaffargarh",
    places: [
      "Muzaffargarh",
      "Alipur",
      "Jatoi",
      "Kot Addu",
      "Shehr Sultan",
      "Khangarh",
    ],
  },
  {
    name: "Nankana Sahib",
    places: [
      "Nankana Sahib",
      "Sangla Hill",
      "Shahkot",
      "Warburton",
      "Bucheki",
    ],
  },
  {
    name: "Narowal",
    places: ["Narowal", "Shakargarh", "Zafarwal", "Baddomalhi"],
  },
  {
    name: "Okara",
    places: [
      "Okara",
      "Depalpur",
      "Renala Khurd",
      "Haveli Lakha",
      "Hujra Shah Muqeem",
      "Basirpur",
    ],
  },
  {
    name: "Pakpattan",
    places: ["Pakpattan", "Arifwala", "Qabula", "Malka Hans"],
  },
  {
    name: "Rahim Yar Khan",
    places: [
      "Rahim Yar Khan",
      "Khanpur",
      "Liaquatpur",
      "Sadiqabad",
      "Zahir Pir",
    ],
  },
  {
    name: "Rajanpur",
    places: [
      "Rajanpur",
      "Jampur",
      "Rojhan",
      "Fazilpur",
      "Kot Mithan",
    ],
  },
  {
    name: "Rawalpindi",
    places: [
      "Rawalpindi",
      "Gujar Khan",
      "Kahuta",
      "Kallar Syedan",
      "Kotli Sattian",
      "Murree",
      "Taxila",
      "Wah Cantt",
      "Rawat",
      "Daultala",
    ],
  },
  {
    name: "Sahiwal",
    places: ["Sahiwal", "Chichawatni", "Noorshah", "Kassowal", "Harappa"],
  },
  {
    name: "Sargodha",
    places: [
      "Sargodha",
      "Bhalwal",
      "Bhera",
      "Kot Momin",
      "Shahpur",
      "Sillanwali",
      "Sahiwal",
      "Phularwan",
      "Farooka",
    ],
  },
  {
    name: "Sheikhupura",
    places: [
      "Sheikhupura",
      "Ferozewala",
      "Muridke",
      "Safdarabad",
      "Sharqpur",
      "Farooqabad",
      "Manawala",
      "Narang Mandi",
    ],
  },
  {
    name: "Sialkot",
    places: [
      "Sialkot",
      "Daska",
      "Pasrur",
      "Sambrial",
      "Chawinda",
      "Jamke Cheema",
      "Begowala",
      "Kotli Loharan",
    ],
  },
  {
    name: "Toba Tek Singh",
    places: [
      "Toba Tek Singh",
      "Gojra",
      "Kamalia",
      "Pir Mahal",
      "Rajana",
      "Sandhilianwali",
    ],
  },
  {
    name: "Vehari",
    places: [
      "Vehari",
      "Burewala",
      "Mailsi",
      "Gaggo",
      "Luddan",
      "Tibba Sultanpur",
    ],
  },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildPlaces(seeds: DistrictSeed[]): PunjabPlace[] {
  const used = new Set<string>();
  const places: PunjabPlace[] = [];

  for (const district of seeds) {
    const districtSlug = slugify(district.name);
    for (const name of district.places) {
      let slug = slugify(name);
      if (used.has(slug)) {
        slug = `${districtSlug}-${slug}`;
      }
      used.add(slug);
      places.push({
        slug,
        name,
        district: district.name,
        districtSlug,
      });
    }
  }

  return places;
}

export const punjabPlaces: PunjabPlace[] = buildPlaces(DISTRICT_SEEDS);

export const punjabDistricts = DISTRICT_SEEDS.map((district) => ({
  name: district.name,
  slug: slugify(district.name),
}));

const placesBySlug = new Map(punjabPlaces.map((place) => [place.slug, place]));
const placesByDistrictSlug = new Map<string, PunjabPlace[]>();
for (const place of punjabPlaces) {
  const list = placesByDistrictSlug.get(place.districtSlug) ?? [];
  list.push(place);
  placesByDistrictSlug.set(place.districtSlug, list);
}

export function getPlaceBySlug(slug: string): PunjabPlace | undefined {
  return placesBySlug.get(slug);
}

export function getDistrictBySlug(slug: string) {
  return punjabDistricts.find((district) => district.slug === slug);
}

export function placesInDistrict(districtSlug: string): PunjabPlace[] {
  return placesByDistrictSlug.get(districtSlug) ?? [];
}

export const punjabPlaceCount = punjabPlaces.length;
export const punjabDistrictCount = punjabDistricts.length;

const POPULAR_SLUGS = [
  "lahore",
  "faisalabad",
  "rawalpindi",
  "multan",
  "gujranwala",
  "sialkot",
  "bahawalpur",
  "sargodha",
] as const;

const popularCopy: Record<
  (typeof POPULAR_SLUGS)[number],
  Pick<PopularCity, "blurb" | "imageSrc" | "imageAlt" | "imageCredit">
> = {
  lahore: {
    blurb: "Provincial capital — DHA, Bahria, Model Town, and Walled City catchments.",
    imageSrc: "/images/cities/lahore.jpg",
    imageAlt: "Historic brick gateway and courtyard architecture in Lahore",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  faisalabad: {
    blurb: "Industrial hub with growing residential societies around the clock tower city.",
    imageSrc: "/images/cities/faisalabad.jpg",
    imageAlt: "Tree-lined urban street typical of a Punjab city centre",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  rawalpindi: {
    blurb: "Garrison city adjoining Islamabad, with Bahria, DHA, and satellite towns.",
    imageSrc: "/images/cities/rawalpindi.jpg",
    imageAlt: "Hill-city residential rooftops under a clear sky",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  multan: {
    blurb: "South Punjab commercial centre — Cantonment, New Multan, and Bosan Road.",
    imageSrc: "/images/cities/multan.jpg",
    imageAlt: "Sunlit brick and tile architecture in southern Punjab",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  gujranwala: {
    blurb: "Manufacturing city with demand for houses, plots, and warehouse space.",
    imageSrc: "/images/cities/gujranwala.jpg",
    imageAlt: "Quiet residential street with mature trees",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  sialkot: {
    blurb: "Export city with Cantonment, Defence, and Sambrial industrial corridors.",
    imageSrc: "/images/cities/sialkot.jpg",
    imageAlt: "Modern low-rise buildings along a city road",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  bahawalpur: {
    blurb: "Cholistan gateway with Model Town, Satellite Town, and university catchments.",
    imageSrc: "/images/cities/bahawalpur.jpg",
    imageAlt: "Warm-toned masonry building in afternoon light",
    imageCredit: "Unsplash — licensed for commercial use",
  },
  sargodha: {
    blurb: "Citrus belt city with family housing and agricultural land on the outskirts.",
    imageSrc: "/images/cities/sargodha.jpg",
    imageAlt: "Open orchard landscape under a wide sky",
    imageCredit: "Unsplash — licensed for commercial use",
  },
};

export const popularPunjabCities: PopularCity[] = POPULAR_SLUGS.map((slug) => {
  const place = getPlaceBySlug(slug);
  if (!place) {
    throw new Error(`Popular city missing from catalogue: ${slug}`);
  }
  return { ...place, ...popularCopy[slug] };
});
