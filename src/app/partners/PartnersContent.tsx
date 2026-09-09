"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { getFeaturedPlaces } from "@/lib/places";
import { PlaceCard } from "@/components/PlaceCard";

export function PartnersContent() {
  const { dict } = useLocale();
  const demos = getFeaturedPlaces();

  const benefits = [
    { t: dict.partners.benefit1Title, d: dict.partners.benefit1Desc },
    { t: dict.partners.benefit2Title, d: dict.partners.benefit2Desc },
    { t: dict.partners.benefit3Title, d: dict.partners.benefit3Desc },
  ];

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
          {dict.partners.eyebrow}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl">
          {dict.partners.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{dict.partners.subtitle}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {benefits.map((b) => (
          <div
            key={b.t}
            className="rounded-2xl border border-sky-100/90 bg-white/85 p-5 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-sky-950">{b.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.d}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.75rem] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800">
            {dict.partners.mockPlan}
          </p>
          <p className="mt-2 text-2xl font-bold text-sky-950">{dict.partners.mockPrice}</p>
          <ul className="mt-5 space-y-2.5">
            {dict.partners.mockIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="mt-0.5 text-amber-600" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="mailto:partners@zanaturizam.hr"
            className="mt-6 inline-flex rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200/70 transition hover:bg-sky-700"
          >
            {dict.partners.cta}
          </a>
          <p className="mt-3 text-xs text-slate-500">{dict.partners.ctaHint}</p>
          <p className="mt-2 text-xs font-medium text-amber-800/80">{dict.partners.pricingNote}</p>
        </div>

        <div className="rounded-[1.75rem] border border-sky-100 bg-white/90 p-6 shadow-sm">
          <p className="text-sm font-semibold text-sky-900">{dict.featured.offersTitle}</p>
          <p className="mt-1 text-sm text-slate-500">{dict.featured.offersSubtitle}</p>
          <Link
            href="/places"
            className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:underline"
          >
            {dict.featured.viewAll} →
          </Link>
          <div className="mt-5 grid gap-4">
            {demos.slice(0, 2).map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
