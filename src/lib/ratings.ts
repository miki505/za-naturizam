import type { PlaceRatingEntry, RatingsStore } from "@/types";

export const RATINGS_KEY = "zn-ratings";

export function readRatings(): RatingsStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(RATINGS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as RatingsStore;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function writeRatings(store: RatingsStore): void {
  window.localStorage.setItem(RATINGS_KEY, JSON.stringify(store));
}

/** Community average when count>0, else seed rating. */
export function displayRating(seed: number, entry?: PlaceRatingEntry): {
  value: number;
  count: number;
  fromCommunity: boolean;
} {
  if (entry && entry.count > 0) {
    return {
      value: entry.sum / entry.count,
      count: entry.count,
      fromCommunity: true,
    };
  }
  return { value: seed, count: 0, fromCommunity: false };
}

export function setUserRating(
  store: RatingsStore,
  placeId: string,
  stars: number,
): RatingsStore {
  const clamped = Math.min(5, Math.max(1, Math.round(stars)));
  const prev = store[placeId] ?? { sum: 0, count: 0 };
  let sum = prev.sum;
  let count = prev.count;
  if (typeof prev.userRating === "number") {
    sum = sum - prev.userRating + clamped;
  } else {
    sum += clamped;
    count += 1;
  }
  return {
    ...store,
    [placeId]: { sum, count, userRating: clamped },
  };
}
