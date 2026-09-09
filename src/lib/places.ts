import { places } from "@/data/places";
import type { DressCode, Place, PlaceType, Region } from "@/types";

export function getAllPlaces(): Place[] {
  return places;
}

export function getPlaceBySlug(slug: string): Place | undefined {
  return places.find((p) => p.slug === slug);
}

export function getRelatedPlaces(place: Place): Place[] {
  return place.relatedSlugs
    .map((slug) => getPlaceBySlug(slug))
    .filter((p): p is Place => Boolean(p));
}

export interface PlaceFilters {
  q?: string;
  region?: Region | "all";
  type?: PlaceType | "all";
  dressCode?: DressCode | "all";
  pets?: boolean;
  nearBeach?: boolean;
}

export function filterPlaces(filters: PlaceFilters): Place[] {
  const q = filters.q?.trim().toLowerCase() ?? "";
  return places.filter((p) => {
    if (filters.region && filters.region !== "all" && p.region !== filters.region) return false;
    if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
    if (filters.dressCode && filters.dressCode !== "all" && p.dressCode !== filters.dressCode)
      return false;
    if (filters.pets && !p.petsAllowed) return false;
    if (filters.nearBeach && !p.nearBeach) return false;
    if (q) {
      const hay = `${p.name} ${p.nameHr} ${p.location} ${p.locationHr} ${p.shortDescription} ${p.shortDescriptionHr}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function mapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
}
