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
      className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100/90 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/80"
    >
      <div
        className={`relative h-40 bg-gradient-to-br ${place.imageGradient}`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
        <div className="absolute inset-0 opacity-0 transition duration-200 group-hover:opacity-100 bg-gradient-to-t from-sky-950/20 to-transparent" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-white/50 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-sky-900 shadow-sm backdrop-blur-sm">
            {dict.places.regions[place.region]}
          </span>
          <span className="rounded-full border border-white/50 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 shadow-sm backdrop-blur-sm">
            {dict.places.types[place.type]}
          </span>
        </div>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50/95 px-2 py-0.5 text-xs font-bold text-amber-900 shadow-sm backdrop-blur-sm">
          <span aria-hidden className="text-amber-500">
            ★
          </span>
          {place.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[15px] font-semibold leading-snug text-slate-900 transition group-hover:text-sky-800">
            {name}
          </h3>
        </div>
        <p className="text-xs font-medium text-slate-500">{location}</p>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{desc}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-800">
            {dict.places.dress[place.dressCode]}
          </span>
          {place.petsAllowed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
              <span aria-hidden>🐾</span>
              {dict.places.pets}
            </span>
          )}
          {place.nearBeach && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-[11px] font-medium text-cyan-800">
              <span aria-hidden>🏖️</span>
              {dict.places.nearBeach}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
