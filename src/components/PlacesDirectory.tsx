"use client";

import { useMemo, useState } from "react";
import { filterPlaces } from "@/lib/places";
import { PlaceCard } from "./PlaceCard";
import { PlaceFilters, type FilterState } from "./PlaceFilters";
import { useLocale } from "./LocaleProvider";

export function PlacesDirectory() {
  const { dict } = useLocale();
  const [filters, setFilters] = useState<FilterState>({
    q: "",
    region: "all",
    type: "all",
    dressCode: "all",
    pets: false,
    nearBeach: false,
  });

  const results = useMemo(
    () =>
      filterPlaces({
        q: filters.q,
        region: filters.region,
        type: filters.type,
        dressCode: filters.dressCode,
        pets: filters.pets || undefined,
        nearBeach: filters.nearBeach || undefined,
      }),
    [filters],
  );

  return (
    <div className="space-y-6">
      <PlaceFilters value={filters} onChange={setFilters} />
      <p className="text-sm text-slate-500">
        {results.length} {dict.places.results}
      </p>
      {results.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-8 text-center text-slate-600">
          {dict.places.noResults}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
}
