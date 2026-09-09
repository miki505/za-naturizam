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
    "rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100";

  return (
    <div className="space-y-3 rounded-2xl border border-sky-100 bg-white/80 p-4 shadow-sm">
      <input
        type="search"
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
        placeholder={dict.places.search}
        className="w-full rounded-xl border border-sky-100 bg-sky-50/50 px-3 py-2.5 text-sm focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-100"
      />
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
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
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
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
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
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
        <div className="flex flex-col justify-end gap-2 pb-1">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={value.pets}
              onChange={(e) => onChange({ ...value, pets: e.target.checked })}
              className="rounded border-sky-300 text-sky-600 focus:ring-sky-200"
            />
            {dict.places.pets}
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={value.nearBeach}
              onChange={(e) => onChange({ ...value, nearBeach: e.target.checked })}
              className="rounded border-sky-300 text-sky-600 focus:ring-sky-200"
            />
            {dict.places.nearBeach}
          </label>
        </div>
      </div>
    </div>
  );
}
