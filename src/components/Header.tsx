"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "./LocaleProvider";

export function Header() {
  const { dict, toggleLocale, locale } = useLocale();
  const pathname = usePathname();

  const links = [
    { href: "/", label: dict.nav.home },
    { href: "/places", label: dict.nav.places },
    { href: "/assistant", label: dict.nav.assistant },
    { href: "/premium", label: dict.nav.premium },
    { href: "/community", label: dict.nav.community },
    { href: "/partners", label: dict.nav.partners },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-sky-100/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex flex-col">
          <span className="text-lg font-bold tracking-tight text-sky-900 group-hover:text-sky-700">
            {dict.brand}
          </span>
          <span className="hidden text-[11px] text-sky-700/70 sm:block">{dict.community}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  active
                    ? "bg-sky-100 text-sky-900"
                    : "text-slate-600 hover:bg-sky-50 hover:text-sky-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={toggleLocale}
          className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-900 shadow-sm transition hover:bg-amber-100"
          aria-label="Toggle language"
        >
          {locale === "hr" ? "EN" : "HR"}
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-sky-50 px-2 py-2 md:hidden">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                active ? "bg-sky-100 text-sky-900" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
