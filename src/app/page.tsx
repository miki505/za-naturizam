"use client";

import Link from "next/link";
import { PlaceCard } from "@/components/PlaceCard";
import { useLocale } from "@/components/LocaleProvider";
import { getAllPlaces } from "@/lib/places";

export default function HomePage() {
  const { dict } = useLocale();
  const featured = getAllPlaces()
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="space-y-6">
            <p className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-900">
              {dict.community}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-sky-950 sm:text-5xl">
              {dict.hero.title}
            </h1>
            <p className="max-w-xl text-lg text-slate-600">{dict.hero.subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/places"
                className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700"
              >
                {dict.hero.ctaPlaces}
              </Link>
              <Link
                href="/assistant"
                className="rounded-full border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-sky-800 shadow-sm transition hover:bg-sky-50"
              >
                {dict.hero.ctaAssistant}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-sky-400 via-cyan-300 to-amber-200 shadow-xl shadow-sky-200/50">
              <div className="absolute inset-6 rounded-[1.5rem] border border-white/40 bg-white/15 backdrop-blur-[2px]" />
              <div className="absolute bottom-10 left-10 right-10 rounded-2xl bg-white/90 p-4 shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                  {dict.brand}
                </p>
                <p className="mt-1 text-sm text-slate-600">{dict.brandTagline}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-bold text-sky-950">{dict.features.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { t: dict.features.directory, d: dict.features.directoryDesc, href: "/places" },
            { t: dict.features.ai, d: dict.features.aiDesc, href: "/assistant" },
            {
              t: dict.features.communityTitle,
              d: dict.features.communityDesc,
              href: "/community",
            },
          ].map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="rounded-2xl border border-sky-100 bg-white/80 p-5 shadow-sm transition hover:border-sky-200 hover:shadow-md"
            >
              <h3 className="font-semibold text-sky-900">{f.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.d}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="mb-6 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-sky-950">{dict.nav.places}</h2>
          <Link href="/places" className="text-sm font-medium text-sky-700 hover:underline">
            {dict.hero.ctaPlaces} →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>
    </div>
  );
}
