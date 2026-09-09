"use client";

import { useLocale } from "@/components/LocaleProvider";

export function ContributeHeader() {
  const { dict } = useLocale();
  return (
    <header className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet-700">
        {dict.contribute.eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-sky-950 sm:text-4xl">
        {dict.contribute.title}
      </h1>
      <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
        {dict.contribute.subtitle}
      </p>
    </header>
  );
}
