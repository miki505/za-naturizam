"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { PlaceDetailClient } from "@/app/places/[slug]/PlaceDetailClient";
import { PlaceImage } from "@/components/PlaceImage";
import { useLocale } from "@/components/LocaleProvider";
import { mapsUrl } from "@/lib/places";
import { getUserPlaceById } from "@/lib/userPlaces";
import type { Place } from "@/types";

export function CommunityPlaceClient({ id }: { id: string }) {
  const { dict } = useLocale();
  const [place, setPlace] = useState<Place | null | undefined>(undefined);

  useEffect(() => {
    setPlace(getUserPlaceById(id) ?? null);
  }, [id]);

  if (place === undefined) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">
        …
      </div>
    );
  }

  if (!place) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-sky-950">{dict.contribute.notFound}</h1>
        <p className="mt-2 text-sm text-slate-600">{dict.contribute.notFoundHint}</p>
        <Link
          href="/places"
          className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          {dict.nav.places} →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
      <div className="relative mb-8 h-52 overflow-hidden rounded-[2rem] shadow-lg shadow-sky-100/60 sm:h-64">
        <PlaceImage
          src={place.imageUrl}
          gradient={place.imageGradient}
          className="absolute inset-0 h-full w-full"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%),linear-gradient(to_top,rgba(15,23,42,0.35),transparent_55%)]"
        />
        <span className="absolute left-6 top-6 rounded-full border border-violet-300/90 bg-violet-500/95 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {dict.communityBadge}
        </span>
      </div>
      <PlaceDetailClient place={place} mapHref={mapsUrl(place)} />
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <AffiliateCTA place={place} />
          <a
            href={mapsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
          >
            Google Maps →
          </a>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-white/85 p-5 text-sm text-slate-600 shadow-sm">
          <p>
            <span className="font-semibold text-sky-900">GPS:</span> {place.lat}, {place.lng}
          </p>
          {place.imageCredit && (
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{place.imageCredit}</p>
          )}
          <p className="mt-3 text-xs text-violet-700">{dict.contribute.localOnly}</p>
        </div>
      </div>
    </div>
  );
}
