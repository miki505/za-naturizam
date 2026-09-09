"use client";

import { useLocale } from "@/components/LocaleProvider";

export function PremiumContent() {
  const { dict } = useLocale();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-sky-950">{dict.premium.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{dict.premium.subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <span className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {dict.premium.locked}
          </span>
          <div className="mb-4 h-28 rounded-xl bg-gradient-to-br from-slate-200 via-sky-100 to-amber-100 opacity-80" />
          <h2 className="text-lg font-semibold text-sky-900">{dict.premium.offlineMaps}</h2>
          <p className="mt-2 text-sm text-slate-600">{dict.premium.offlineMapsDesc}</p>
          <button
            type="button"
            disabled
            className="mt-4 rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
          >
            Download Istria pack
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
          <span className="absolute right-4 top-4 rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {dict.premium.locked}
          </span>
          <div className="space-y-2 opacity-60">
            {["Shade score ≥ 4", "Boat access only", "Low noise", "LGBTQ+ friendly"].map((f) => (
              <label key={f} className="flex items-center gap-2 rounded-xl border border-sky-50 bg-sky-50/50 px-3 py-2 text-sm text-slate-600">
                <input type="checkbox" disabled className="rounded" />
                {f}
              </label>
            ))}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-sky-900">{dict.premium.advancedFilters}</h2>
          <p className="mt-2 text-sm text-slate-600">{dict.premium.advancedFiltersDesc}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 text-center">
        <button
          type="button"
          className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-600"
        >
          {dict.premium.cta}
        </button>
        <p className="mt-3 text-xs text-amber-900/70">UI only — no payments in this MVP.</p>
      </div>
    </div>
  );
}
