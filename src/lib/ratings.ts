import { createClient } from "@/lib/supabase/client";
import type { PlaceRatingEntry, RatingsStore } from "@/types";

export const RATINGS_KEY = "zn-ratings";

/** @deprecated localStorage path kept for legacy CompactRatingBadge fallback only */
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

export async function fetchPlaceRatingStats(placeKey: string): Promise<PlaceRatingEntry | undefined> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("place_rating_stats")
    .select("rating_sum, rating_count")
    .eq("place_key", placeKey)
    .maybeSingle();
  if (error || !data || !data.rating_count) return undefined;
  return { sum: Number(data.rating_sum) || 0, count: Number(data.rating_count) || 0 };
}

export async function submitPendingRating(placeKey: string, userId: string, stars: number) {
  const clamped = Math.min(5, Math.max(1, Math.round(stars)));
  const supabase = createClient();
  const { error } = await supabase.from("rating_submissions").upsert(
    {
      user_id: userId,
      place_key: placeKey,
      rating: clamped,
      status: "pending",
      reviewed_at: null,
      reviewed_by: null,
    },
    { onConflict: "user_id,place_key" },
  );
  return { error, rating: clamped };
}

export async function fetchMyPendingOrApprovedRating(placeKey: string, userId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("rating_submissions")
    .select("rating, status")
    .eq("place_key", placeKey)
    .eq("user_id", userId)
    .in("status", ["pending", "approved"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as { rating: number; status: string } | null;
}
