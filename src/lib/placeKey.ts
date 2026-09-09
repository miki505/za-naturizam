import type { Place } from "@/types";

/** Consistent place_key for UGC: seed slug, community UUID/id string. */
export function placeKeyFor(place: Place): string {
  return place.userAdded ? place.id : place.slug;
}
