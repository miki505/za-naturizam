"use client";

import Link from "next/link";
import type { Place } from "@/types";
import { placeHref } from "@/lib/places";
import { CompactRatingBadge } from "./StarRating";
import { PlaceImage } from "./PlaceImage";
import { useLocale } from "./LocaleProvider";

export function PlaceCard({ place }: { place: Place }) {
  const { locale, dict } = useLocale();
  const name = locale === "hr" ? place.nameHr : place.name;
  const location = locale === "hr" ? place.locationHr : place.location;
  const desc = locale === "hr" ? place.shortDescriptionHr : place.shortDescription;
  const featuredLabel =
    place.featuredLabel === "Partner" ? dict.featured.partnerBadge : dict.featured.badge;

  return (
    <Link
      href={placeHref(place)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100/90 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/80"
    >
      <div className="relative h-40" aria-hidden={!place.imageUrl}>
        <PlaceImage
          src={place.imageUrl}
          gradient={place.imageGradient}
          className="absolute inset-0 h-full w-full"
          imgClassName="transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-950/35 via-sky-950/5 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {place.userAdded && (
            <span className="rounded-full border border-violet-300/80 bg-violet-500/95 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-sm backdrop-blur-sm">
              {dict.communityBadge}
            </span>
          )}
          {place.featured && (
            <span className="rounded-full border border-amber-300/80 bg-amber-400/95 px-2.5 py-0.5 text-[11px] font-bold text-amber-950 shadow-sm backdrop-blur-sm">
              {featuredLabel}
            </span>
          )}
          <span className="rounded-full border border-white/50 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-sky-900 shadow-sm backdrop-blur-sm">
            {dict.places.regions[place.region]}
          </span>
          <span className="rounded-full border border-white/50 bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 shadow-sm backdrop-blur-sm">
            {dict.places.types[place.type]}
          </span>
        </div>
        <span className="absolute right-3 top-3">
          <CompactRatingBadge placeId={place.id} seedRating={place.rating} />
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
        {place.imageCredit ? (
          <p className="line-clamp-1 text-[10px] text-slate-400">{place.imageCredit}</p>
        ) : null}
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
