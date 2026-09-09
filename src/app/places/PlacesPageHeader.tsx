"use client";

import { useLocale } from "@/components/LocaleProvider";

export function PlacesPageHeader() {
  const { dict } = useLocale();
  return (
    <div>
      <h1 className="text-3xl font-bold text-sky-950">{dict.places.title}</h1>
      <p className="mt-2 text-slate-600">{dict.places.subtitle}</p>
    </div>
  );
}
