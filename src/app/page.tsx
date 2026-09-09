"use client";

import Link from "next/link";
import { PlaceCard } from "@/components/PlaceCard";
import { useLocale } from "@/components/LocaleProvider";
import { getAllPlaces } from "@/lib/places";

const PLACE_PILLS = ["Valalta", "Koversada", "Bunculuka"] as const;

export default function HomePage() {
  const { dict } = useLocale();
  const featured = getAllPlaces()
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const trustItems = [
    dict.trust.places,
    dict.trust.regions,
    dict.trust.ai,
    dict.trust.community,
  ];

  const features = [
    {
      t: dict.features.directory,
      d: dict.features.directoryDesc,
      href: "/places",
      n: "01",
      accent: "from-sky-500 to-cyan-400",
    },
    {
      t: dict.features.ai,
      d: dict.features.aiDesc,
      href: "/assistant",
      n: "02",
      accent: "from-amber-500 to-orange-400",
    },
    {
      t: dict.features.communityTitle,
      d: dict.features.communityDesc,
      href: "/community",
      n: "03",
      accent: "from-teal-500 to-emerald-400",
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-24 h-72 w-72 rounded-full bg-sky-300/35 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-cyan-200/30 blur-2xl"
        />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-14 md:grid-cols-2 md:items-center md:gap-14 md:py-20">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/90 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-amber-900 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden />
              {dict.community}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-sky-950 sm:text-5xl sm:leading-[1.1]">
              {dict.hero.title}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/places"
                className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200/80 transition hover:bg-sky-700 hover:shadow-sky-300"
              >
                {dict.hero.ctaPlaces}
              </Link>
              <Link
                href="/assistant"
                className="rounded-full border border-sky-200 bg-white/90 px-5 py-3 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
              >
                {dict.hero.ctaAssistant}
              </Link>
            </div>

            <ul className="flex flex-wrap gap-x-1 gap-y-2 pt-1 text-sm text-slate-600">
              {trustItems.map((item, i) => (
                <li key={item} className="flex items-center gap-1.5">
                  {i > 0 && (
                    <span className="mx-1.5 text-sky-200" aria-hidden>
                      ·
                    </span>
                  )}
                  <span className="font-medium text-sky-900/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br from-amber-200 to-orange-100 opacity-70 blur-sm"
            />
            <div
              aria-hidden
              className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-gradient-to-br from-sky-200 to-cyan-100 opacity-80 blur-sm"
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-400 via-cyan-300 to-amber-200 shadow-xl shadow-sky-200/60">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_80%_75%,rgba(251,191,36,0.25),transparent_40%)]"
              />
              <div className="absolute inset-5 rounded-[1.4rem] border border-white/45 bg-white/10 backdrop-blur-[2px]" />

              <div className="absolute left-8 right-8 top-8 rounded-2xl border border-white/50 bg-white/90 p-3.5 shadow-lg shadow-sky-900/5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <circle cx="11" cy="11" r="7" />
                      <path d="M20 20l-3.5-3.5" />
                    </svg>
                  </span>
                  <p className="truncate text-sm text-slate-500">{dict.hero.searchChip}</p>
                </div>
              </div>

              <div className="absolute bottom-9 left-8 right-8 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {PLACE_PILLS.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-white/60 bg-white/85 px-3 py-1 text-xs font-semibold text-sky-900 shadow-sm backdrop-blur-sm"
                    >
                      {name}
                    </span>
                  ))}
                </div>
                <div className="rounded-2xl border border-white/50 bg-white/92 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-sky-700">
                    {dict.brand}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-slate-600">
                    {dict.brandTagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-2">
        <div className="mb-8 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
            {dict.features.eyebrow}
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-sky-950 sm:text-3xl">
            {dict.features.title}
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group relative overflow-hidden rounded-2xl border border-sky-100/90 bg-white/85 p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md"
            >
              <div
                aria-hidden
                className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${f.accent} text-xs font-bold text-white shadow-sm`}
              >
                {f.n}
              </div>
              <h3 className="text-lg font-semibold text-sky-950 group-hover:text-sky-800">
                {f.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.d}</p>
              <span className="mt-4 inline-flex text-xs font-semibold text-sky-600 opacity-0 transition group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
              {dict.featured.eyebrow}
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-sky-950 sm:text-3xl">
              {dict.featured.title}
            </h2>
          </div>
          <Link
            href="/places"
            className="shrink-0 text-sm font-semibold text-sky-700 transition hover:text-sky-900 hover:underline"
          >
            {dict.featured.viewAll} →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-sky-600 via-sky-500 to-cyan-500 px-6 py-10 text-center shadow-lg shadow-sky-200/50 sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-300/30 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-white/15 blur-2xl"
          />
          <div className="relative mx-auto max-w-2xl space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {dict.bottomCta.title}
            </h2>
            <p className="text-sm leading-relaxed text-sky-50/95 sm:text-base">
              {dict.bottomCta.subtitle}
            </p>
            <Link
              href="/assistant"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-sky-800 shadow-md transition hover:bg-amber-50"
            >
              {dict.bottomCta.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
