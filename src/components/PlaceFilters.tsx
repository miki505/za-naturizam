"use client";

import type { DressCode, PlaceType, Region } from "@/types";
import { useLocale } from "./LocaleProvider";

export interface FilterState {
  q: string;
  region: Region | "all";
  type: PlaceType | "all";
  dressCode: DressCode | "all";
  pets: boolean;
  nearBeach: boolean;
}

interface Props {
  value: FilterState;
  onChange: (next: FilterState) => void;
}

export function PlaceFilters({ value, onChange }: Props) {
  const { dict } = useLocale();

  const selectClass =
    "w-full rounded-xl border border-sky-100/90 bg-white px-3 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100";

  const chipBase =
    "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition select-none";

  return (
    <div className="sticky top-20 z-10 space-y-4 rounded-2xl border border-sky-100/90 bg-white/90 p-4 shadow-sm backdrop-blur-md sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700/80">
          {dict.places.filtersLabel}
        </p>
      </div>

      <div className="relative">
        <span
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sky-400"
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
        <input
          type="search"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
          placeholder={dict.places.search}
          className="w-full rounded-xl border border-sky-100 bg-sky-50/60 py-3 pl-10 pr-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.places.region}
          <select
            className={selectClass}
            value={value.region}
            onChange={(e) => onChange({ ...value, region: e.target.value as FilterState["region"] })}
          >
            <option value="all">{dict.places.all}</option>
            <option value="istria">{dict.places.regions.istria}</option>
            <option value="kvarner">{dict.places.regions.kvarner}</option>
            <option value="dalmatia">{dict.places.regions.dalmatia}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.places.type}
          <select
            className={selectClass}
            value={value.type}
            onChange={(e) => onChange({ ...value, type: e.target.value as FilterState["type"] })}
          >
            <option value="all">{dict.places.all}</option>
            <option value="beach">{dict.places.types.beach}</option>
            <option value="camp">{dict.places.types.camp}</option>
            <option value="hotel">{dict.places.types.hotel}</option>
            <option value="resort">{dict.places.types.resort}</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.places.dressCode}
          <select
            className={selectClass}
            value={value.dressCode}
            onChange={(e) =>
              onChange({ ...value, dressCode: e.target.value as FilterState["dressCode"] })
            }
          >
            <option value="all">{dict.places.all}</option>
            <option value="naturist">{dict.places.dress.naturist}</option>
            <option value="clothing-optional">{dict.places.dress["clothing-optional"]}</option>
          </select>
        </label>
      </div>

      <div className="flex flex-wrap gap-2 pt-0.5">
        <label
          className={`${chipBase} ${
            value.pets
              ? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm"
              : "border-sky-100 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50/80"
          }`}
        >
          <input
            type="checkbox"
            checked={value.pets}
            onChange={(e) => onChange({ ...value, pets: e.target.checked })}
            className="sr-only"
          />
          <span aria-hidden>🐾</span>
          {dict.places.pets}
        </label>
        <label
          className={`${chipBase} ${
            value.nearBeach
              ? "border-cyan-300 bg-cyan-50 text-cyan-950 shadow-sm"
              : "border-sky-100 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50/80"
          }`}
        >
          <input
            type="checkbox"
            checked={value.nearBeach}
            onChange={(e) => onChange({ ...value, nearBeach: e.target.checked })}
            className="sr-only"
          />
          <span aria-hidden>🏖️</span>
          {dict.places.nearBeach}
        </label>
      </div>
    </div>
  );
}
