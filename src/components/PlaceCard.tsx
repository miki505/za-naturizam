"use client";

import Link from "next/link";
import type { Place } from "@/types";
import { useLocale } from "./LocaleProvider";

export function PlaceCard({ place }: { place: Place }) {
  const { locale, dict } = useLocale();
  const name = locale === "hr" ? place.nameHr : place.name;
  const location = locale === "hr" ? place.locationHr : place.location;
  const desc = locale === "hr" ? place.shortDescriptionHr : place.shortDescription;

  return (
    <Link
      href={`/places/${place.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`relative h-36 bg-gradient-to-br ${place.imageGradient}`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_50%)]" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-sky-900">
            {dict.places.regions[place.region]}
          </span>
          <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-teal-800">
            {dict.places.types[place.type]}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 group-hover:text-sky-800">{name}</h3>
          <span className="shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 text-xs font-bold text-amber-800">
            ★ {place.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-xs text-slate-500">{location}</p>
        <p className="line-clamp-2 text-sm text-slate-600">{desc}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-800">
            {dict.places.dress[place.dressCode]}
          </span>
          {place.petsAllowed && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-800">
              {dict.places.pets}
            </span>
          )}
          {place.nearBeach && (
            <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] text-cyan-800">
              {dict.places.nearBeach}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
