"use client";

import { useCallback, useEffect, useState } from "react";
import { displayRating, readRatings, setUserRating, writeRatings } from "@/lib/ratings";
import type { PlaceRatingEntry } from "@/types";
import { useLocale } from "./LocaleProvider";

export function StarRating({
  placeId,
  seedRating,
}: {
  placeId: string;
  seedRating: number;
  compact?: boolean;
}) {
  const { dict } = useLocale();
  const [entry, setEntry] = useState<PlaceRatingEntry | undefined>(undefined);
  const [hover, setHover] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEntry(readRatings()[placeId]);
    setReady(true);
  }, [placeId]);

  const shown = displayRating(seedRating, entry);
  const active = hover ?? entry?.userRating ?? 0;

  const onRate = useCallback(
    (stars: number) => {
      const next = setUserRating(readRatings(), placeId, stars);
      writeRatings(next);
      setEntry(next[placeId]);
    },
    [placeId],
  );

  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
            {dict.ratings.title}
          </p>
          <p className="mt-1 text-2xl font-bold text-amber-950">
            {shown.value.toFixed(1)}
            <span className="ml-2 text-sm font-medium text-amber-800/80">
              {shown.fromCommunity
                ? dict.ratings.count.replace("{n}", String(shown.count))
                : dict.ratings.seedOnly}
            </span>
          </p>
          {ready && entry?.userRating ? (
            <p className="mt-1 text-xs text-amber-800/80">
              {dict.ratings.yourRating}: {entry.userRating}/5
            </p>
          ) : (
            <p className="mt-1 text-xs text-amber-800/70">{dict.ratings.rateHint}</p>
          )}
        </div>
        <div
          className="flex gap-1"
          role="radiogroup"
          aria-label={dict.ratings.title}
          onMouseLeave={() => setHover(null)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={entry?.userRating === n}
              aria-label={`${n}`}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onClick={() => onRate(n)}
              className={`text-2xl transition ${
                n <= active ? "text-amber-500" : "text-amber-200 hover:text-amber-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CompactRatingBadge({
  placeId,
  seedRating,
}: {
  placeId: string;
  seedRating: number;
}) {
  const [entry, setEntry] = useState<PlaceRatingEntry | undefined>(undefined);

  useEffect(() => {
    setEntry(readRatings()[placeId]);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "zn-ratings") setEntry(readRatings()[placeId]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [placeId]);

  const shown = displayRating(seedRating, entry);
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50/95 px-2 py-0.5 text-xs font-bold text-amber-900 shadow-sm backdrop-blur-sm">
      <span aria-hidden className="text-amber-500">
        ★
      </span>
      {shown.value.toFixed(1)}
      {shown.fromCommunity ? (
        <span className="font-medium text-amber-800/80">({shown.count})</span>
      ) : null}
    </span>
  );
}
