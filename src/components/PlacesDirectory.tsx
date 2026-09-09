"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchCommunityPlaces } from "@/lib/communityPlaces";
import { filterPlaces } from "@/lib/places";
import { readUserPlaces } from "@/lib/userPlaces";
import type { Place } from "@/types";
import { PlaceCard } from "./PlaceCard";
import { PlaceFilters, type FilterState } from "./PlaceFilters";
import { useLocale } from "./LocaleProvider";

export function PlacesDirectory() {
  const { dict } = useLocale();
  const [extraPlaces, setExtraPlaces] = useState<Place[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    region: "all",
    type: "all",
    dressCode: "all",
    pets: false,
    nearBeach: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const fromSupabase = await fetchCommunityPlaces();
      const legacy = readUserPlaces();
      const byId = new Map<string, Place>();
      for (const p of [...fromSupabase, ...legacy]) {
        if (!byId.has(p.id)) byId.set(p.id, p);
      }
      if (!cancelled) setExtraPlaces([...byId.values()]);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(
    () =>
      filterPlaces(
        {
          q: filters.q,
          region: filters.region,
          type: filters.type,
          dressCode: filters.dressCode,
          pets: filters.pets || undefined,
          nearBeach: filters.nearBeach || undefined,
        },
        extraPlaces,
      ),
    [filters, extraPlaces],
  );

  return (
    <div className="space-y-7">
      <PlaceFilters value={filters} onChange={setFilters} />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-600">
          <span className="font-semibold text-sky-900">{results.length}</span>{" "}
          {dict.places.results}
        </p>
        <Link
          href="/contribute"
          className="text-sm font-semibold text-violet-700 transition hover:text-violet-900 hover:underline"
        >
          {dict.nav.contribute} →
        </Link>
      </div>
      {results.length === 0 ? (
        <div className="rounded-[1.5rem] border border-dashed border-sky-200/90 bg-gradient-to-b from-white/90 to-sky-50/50 px-6 py-14 text-center shadow-sm">
          <p className="text-base font-semibold text-sky-950">{dict.places.noResults}</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            {dict.places.emptyHint}
          </p>
          <Link
            href="/assistant"
            className="mt-5 inline-flex rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200/70 transition hover:bg-sky-700"
          >
            {dict.nav.assistant} →
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
