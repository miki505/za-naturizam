"use client";

import Link from "next/link";
import { useLocale } from "./LocaleProvider";

export function Footer() {
  const { dict } = useLocale();
  return (
    <footer className="mt-auto border-t border-sky-100 bg-gradient-to-b from-sky-50 to-amber-50/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-sky-900">{dict.brand}</p>
          <p>{dict.footer.rights}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/places" className="hover:text-sky-800">
            {dict.nav.places}
          </Link>
          <Link href="/assistant" className="hover:text-sky-800">
            {dict.nav.assistant}
          </Link>
          <Link href="/community" className="hover:text-sky-800">
            {dict.nav.community}
          </Link>
        </div>
        <p className="text-xs text-slate-500">{dict.footer.made}</p>
      </div>
    </footer>
  );
}
