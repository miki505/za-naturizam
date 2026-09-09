"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";

export function CommunityContent() {
  const { dict } = useLocale();
  const [joined, setJoined] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-sky-950">{dict.communityPage.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-600">{dict.communityPage.subtitle}</p>
      </div>

      <section className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-sky-900">{dict.communityPage.rulesTitle}</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {dict.communityPage.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/40 p-6">
        <h2 className="text-lg font-semibold text-sky-900">{dict.communityPage.feedTitle}</h2>
        <div className="mt-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-sky-100 bg-white/70 p-4 text-sm text-slate-400"
            >
              Placeholder post #{i} — coming with auth later.
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">{dict.communityPage.feedEmpty}</p>
      </section>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setJoined(true)}
          className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-sky-700"
        >
          {joined ? "✓ " : ""}
          {dict.communityPage.joinCta}
        </button>
        {joined && (
          <p className="mt-3 text-sm text-emerald-700">Thanks — waitlist placeholder saved locally.</p>
        )}
      </div>
    </div>
  );
}
