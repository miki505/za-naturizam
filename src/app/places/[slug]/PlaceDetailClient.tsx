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
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-900">
            {dict.places.regions[place.region]}
          </span>
          <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-800">
            {dict.places.types[place.type]}
          </span>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800">
            {dict.places.dress[place.dressCode]}
          </span>
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-800">
            ★ {place.rating.toFixed(1)}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-bold text-sky-950 sm:text-4xl">{name}</h1>
        <p className="mt-1 text-slate-500">{location}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-800">
            {place.petsAllowed ? dict.detail.petsYes : dict.detail.petsNo}
          </span>
          {place.nearBeach && (
            <span className="rounded-full bg-cyan-50 px-2 py-1 text-cyan-800">
              {dict.detail.nearBeach}
            </span>
          )}
          <a href={mapHref} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white px-2 py-1 text-sky-700 underline-offset-2 hover:underline">
            {dict.detail.map}
          </a>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold text-sky-900">{dict.detail.guide}</h2>
        <p className="mt-2 max-w-3xl leading-relaxed text-slate-700">{guide}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-sky-900">{dict.detail.amenities}</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {amenities.map((a) => (
            <li key={a} className="rounded-full border border-sky-100 bg-white px-3 py-1 text-sm text-slate-700">
              {a}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
