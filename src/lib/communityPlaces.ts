import { createClient } from "@/lib/supabase/client";
import { osmMapCredit, osmStaticMapUrl } from "@/lib/maps";
import type { DressCode, Place, PlaceType, Region } from "@/types";

export interface CommunityPlaceRow {
  id: string;
  submission_id: string | null;
  slug: string;
  name: string;
  name_hr: string;
  region: Region;
  type: PlaceType;
  dress_code: DressCode;
  pets_allowed: boolean;
  near_beach: boolean;
  location: string;
  location_hr: string;
  lat: number | null;
  lng: number | null;
  short_description: string;
  short_description_hr: string;
  image_url: string | null;
  image_credit: string | null;
  official_url: string | null;
  created_at: string;
}

export function communityRowToPlace(row: CommunityPlaceRow): Place {
  const lat = typeof row.lat === "number" && !Number.isNaN(row.lat) ? row.lat : 45.1;
  const lng = typeof row.lng === "number" && !Number.isNaN(row.lng) ? row.lng : 14.5;
  const imageUrl = row.image_url?.trim() || osmStaticMapUrl(lat, lng);
  const imageCredit =
    row.image_credit?.trim() ||
    (row.image_url?.trim()
      ? "Photo: community submission / user-provided URL"
      : osmMapCredit(row.name_hr || row.name));

  return {
    id: row.id,
    slug: row.slug,
    name: row.name || row.name_hr,
    nameHr: row.name_hr || row.name,
    region: row.region,
    type: row.type,
    dressCode: row.dress_code,
    petsAllowed: Boolean(row.pets_allowed),
    nearBeach: Boolean(row.near_beach),
    location: row.location,
    locationHr: row.location_hr || row.location,
    lat,
    lng,
    rating: 0,
    shortDescription: row.short_description || row.short_description_hr,
    shortDescriptionHr: row.short_description_hr || row.short_description,
    guide: row.short_description || row.short_description_hr,
    guideHr: row.short_description_hr || row.short_description,
    amenities: ["Community"],
    amenitiesHr: ["Zajednica"],
    relatedSlugs: [],
    affiliateLabel: "Explore nearby",
    affiliateUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(row.location)}`,
    imageGradient: "from-violet-400 via-sky-300 to-amber-200",
    imageUrl,
    imageCredit,
    officialUrl: row.official_url?.trim() || undefined,
    userAdded: true,
  };
}

export async function fetchCommunityPlaces(): Promise<Place[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("community_places")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as CommunityPlaceRow[]).map(communityRowToPlace);
}

export async function fetchCommunityPlaceById(idOrSlug: string): Promise<Place | null> {
  const supabase = createClient();
  const byId = await supabase.from("community_places").select("*").eq("id", idOrSlug).maybeSingle();
  if (byId.data) return communityRowToPlace(byId.data as CommunityPlaceRow);
  const bySlug = await supabase
    .from("community_places")
    .select("*")
    .eq("slug", idOrSlug)
    .maybeSingle();
  if (bySlug.data) return communityRowToPlace(bySlug.data as CommunityPlaceRow);
  return null;
}
