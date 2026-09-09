"use client";

import { useLocale } from "@/components/LocaleProvider";

export function PlacesPageHeader() {
  const { dict } = useLocale();
  return (
    <div className="relative max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
        {dict.places.eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl sm:leading-[1.15]">
        {dict.places.title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
        {dict.places.subtitle}
      </p>
    </div>
  );
}
