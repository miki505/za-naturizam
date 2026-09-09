"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  displayRating,
  fetchMyPendingOrApprovedRating,
  fetchPlaceRatingStats,
  submitPendingRating,
} from "@/lib/ratings";
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
  const { user, loading: authLoading } = useAuth();
  const [entry, setEntry] = useState<PlaceRatingEntry | undefined>(undefined);
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const stats = await fetchPlaceRatingStats(placeId);
      if (!cancelled) setEntry(stats);
      if (user) {
        const mine = await fetchMyPendingOrApprovedRating(placeId, user.id);
        if (!cancelled && mine) {
          setUserRating(mine.rating);
          setPending(mine.status === "pending");
        }
      } else if (!cancelled) {
        setUserRating(undefined);
        setPending(false);
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [placeId, user]);

  const shown = displayRating(seedRating, entry);
  const active = hover ?? userRating ?? 0;

  const onRate = useCallback(
    async (stars: number) => {
      setError(null);
      setMessage(null);
      if (!user) {
        setError(dict.auth.loginRequired);
        return;
      }
      const { error: err, rating } = await submitPendingRating(placeId, user.id, stars);
      if (err) {
        setError(err.message);
        return;
      }
      setUserRating(rating);
      setPending(true);
      setMessage(dict.ratings.pendingApproval);
    },
    [placeId, user, dict],
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
          {ready && userRating ? (
            <p className="mt-1 text-xs text-amber-800/80">
              {dict.ratings.yourRating}: {userRating}/5
              {pending ? ` — ${dict.ratings.pendingApproval}` : ""}
            </p>
          ) : (
            <p className="mt-1 text-xs text-amber-800/70">{dict.ratings.rateHint}</p>
          )}
          {!authLoading && !user ? (
            <p className="mt-2 text-xs text-amber-900/80">
              <Link href="/login" className="font-semibold underline">
                {dict.auth.login}
              </Link>{" "}
              {dict.ratings.loginToRate}
            </p>
          ) : null}
          {message ? <p className="mt-2 text-xs font-medium text-emerald-800">{message}</p> : null}
          {error ? <p className="mt-2 text-xs font-medium text-rose-700">{error}</p> : null}
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
              aria-checked={userRating === n}
              aria-label={`${n}`}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(n)}
              onClick={() => void onRate(n)}
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
    let cancelled = false;
    void fetchPlaceRatingStats(placeId).then((stats) => {
      if (!cancelled) setEntry(stats);
    });
    return () => {
      cancelled = true;
    };
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
