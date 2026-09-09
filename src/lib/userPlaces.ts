import type { Place, UserPlaceInput } from "@/types";
import { osmMapCredit, osmStaticMapUrl } from "@/lib/maps";

export const USER_PLACES_KEY = "zn-user-places";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

export function readUserPlaces(): Place[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USER_PLACES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Place[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((p) => p && typeof p.id === "string" && p.userAdded);
  } catch {
    return [];
  }
}

export function writeUserPlaces(places: Place[]): void {
  window.localStorage.setItem(USER_PLACES_KEY, JSON.stringify(places));
}

export function addUserPlace(input: UserPlaceInput): Place {
  const id = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const baseSlug = slugify(input.nameHr || input.name || "mjesto") || "mjesto";
  const slug = `community-${baseSlug}-${id.slice(-6)}`;
  const lat = typeof input.lat === "number" && !Number.isNaN(input.lat) ? input.lat : 45.1;
  const lng = typeof input.lng === "number" && !Number.isNaN(input.lng) ? input.lng : 14.5;
  const name = (input.name || input.nameHr).trim();
  const nameHr = input.nameHr.trim();
  const location = input.location.trim();
  const locationHr = (input.locationHr || input.location).trim();
  const shortDescriptionHr = input.shortDescriptionHr.trim();
  const shortDescription = (input.shortDescription || input.shortDescriptionHr).trim();
  const amenities = input.amenities?.length ? input.amenities : ["Community"];
  const amenitiesHr = input.amenitiesHr?.length ? input.amenitiesHr : ["Zajednica"];
  const imageUrl =
    input.imageUrl.trim() ||
    osmStaticMapUrl(lat, lng);
  const imageCredit =
    input.imageCredit?.trim() ||
    (input.imageUrl.trim()
      ? "Photo: community submission / user-provided URL"
      : osmMapCredit(nameHr));

  const place: Place = {
    id,
    slug,
    name,
    nameHr,
    region: input.region,
    type: input.type,
    dressCode: input.dressCode,
    petsAllowed: input.petsAllowed,
    nearBeach: input.nearBeach,
    location,
    locationHr,
    lat,
    lng,
    rating: 0,
    shortDescription,
    shortDescriptionHr,
    guide: shortDescription,
    guideHr: shortDescriptionHr,
    amenities,
    amenitiesHr,
    relatedSlugs: [],
    affiliateLabel: "Explore nearby",
    affiliateUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(location)}`,
    imageGradient: "from-violet-400 via-sky-300 to-amber-200",
    imageUrl,
    imageCredit,
    officialUrl: input.officialUrl?.trim() || undefined,
    userAdded: true,
  };

  const existing = readUserPlaces();
  writeUserPlaces([place, ...existing]);
  return place;
}

export function getUserPlaceById(id: string): Place | undefined {
  return readUserPlaces().find((p) => p.id === id || p.slug === id);
}
