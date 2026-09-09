import { places } from "@/data/places";
import type { DressCode, Place, PlaceType, Region } from "@/types";

/** Featured first (by featuredRank ascending), then by rating descending. */
export function sortPlaces(list: Place[]): Place[] {
  return list.slice().sort((a, b) => {
    const aFeat = a.featured ? 1 : 0;
    const bFeat = b.featured ? 1 : 0;
    if (aFeat !== bFeat) return bFeat - aFeat;
    if (a.featured && b.featured) {
      return (a.featuredRank ?? 999) - (b.featuredRank ?? 999);
    }
    return b.rating - a.rating;
  });
}

export function getAllPlaces(): Place[] {
  return sortPlaces(places);
}

export function getFeaturedPlaces(): Place[] {
  return sortPlaces(places.filter((p) => p.featured));
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

export function filterPlaces(filters: PlaceFilters, extra: Place[] = []): Place[] {
  const q = filters.q?.trim().toLowerCase() ?? "";
  const pool = [...places, ...extra];
  const filtered = pool.filter((p) => {
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
  return sortPlaces(filtered);
}

export function mapsUrl(place: Place): string {
  return `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`;
}

export function placeHref(place: Place): string {
  if (place.userAdded) return `/places/community/${place.id}`;
  return `/places/${place.slug}`;
}
