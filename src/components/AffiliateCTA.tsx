"use client";

import type { Place } from "@/types";
import { useLocale } from "./LocaleProvider";

export function AffiliateCTA({ place }: { place: Place }) {
  const { dict } = useLocale();
  return (
    <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4 shadow-sm">
      <p className="text-sm font-semibold text-amber-950">{dict.detail.book}</p>
      <p className="mt-1 text-xs text-amber-800/80">{dict.detail.affiliateNote}</p>
      <a
        href={place.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="mt-3 inline-flex items-center justify-center rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-amber-600"
      >
        {place.affiliateLabel} →
      </a>
    </div>
  );
}
