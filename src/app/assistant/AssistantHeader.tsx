"use client";

import { useLocale } from "@/components/LocaleProvider";

export function AssistantHeader() {
  const { dict } = useLocale();
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-sky-950">{dict.assistant.title}</h1>
      <p className="mt-2 text-slate-600">{dict.assistant.subtitle}</p>
    </div>
  );
}
