"use client";

import type { Place } from "@/types";
import { useLocale } from "@/components/LocaleProvider";

export function PlaceDetailClient({ place, mapHref }: { place: Place; mapHref: string }) {
  const { locale, dict } = useLocale();
  const name = locale === "hr" ? place.nameHr : place.name;
  const location = locale === "hr" ? place.locationHr : place.location;
  const guide = locale === "hr" ? place.guideHr : place.guide;
  const amenities = locale === "hr" ? place.amenitiesHr : place.amenities;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-sky-900">
            {dict.places.regions[place.region]}
          </span>
          <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
            {dict.places.types[place.type]}
          </span>
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
            {dict.places.dress[place.dressCode]}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-200/80 bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-900">
            <span aria-hidden className="text-amber-500">
              ★
            </span>
            {place.rating.toFixed(1)}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl sm:leading-[1.15]">
          {name}
        </h1>
        <p className="mt-2 text-slate-500">{location}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ${
              place.petsAllowed
                ? "bg-emerald-50 text-emerald-800"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <span aria-hidden>🐾</span>
            {place.petsAllowed ? dict.detail.petsYes : dict.detail.petsNo}
          </span>
          {place.nearBeach && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 font-medium text-cyan-800">
              <span aria-hidden>🏖️</span>
              {dict.detail.nearBeach}
            </span>
          )}
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-sky-100 bg-white px-2.5 py-1 font-medium text-sky-700 transition hover:border-sky-200 hover:bg-sky-50"
          >
            {dict.detail.map}
          </a>
        </div>
      </div>

      <section className="rounded-2xl border border-sky-100/90 bg-white/80 p-5 shadow-sm sm:p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-700/90">
          {dict.detail.guide}
        </p>
        <p className="max-w-3xl text-[15px] leading-relaxed text-slate-700">{guide}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-sky-950">{dict.detail.amenities}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {amenities.map((a) => (
            <li
              key={a}
              className="rounded-full border border-sky-100 bg-white px-3.5 py-1.5 text-sm text-slate-700 shadow-sm"
            >
              {a}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
