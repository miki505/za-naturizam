"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { addUserPlace } from "@/lib/userPlaces";
import type { DressCode, PlaceType, Region } from "@/types";

export function ContributeForm() {
  const { dict, locale } = useLocale();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const nameHr = String(fd.get("nameHr") || "").trim();
    const region = String(fd.get("region") || "") as Region;
    const shortDescriptionHr = String(fd.get("shortDescriptionHr") || "").trim();
    const location = String(fd.get("location") || "").trim();
    const imageUrl = String(fd.get("imageUrl") || "").trim();

    if (!nameHr || !region || !shortDescriptionHr || !location) {
      setError(dict.contribute.validation);
      return;
    }

    const latRaw = String(fd.get("lat") || "").trim();
    const lngRaw = String(fd.get("lng") || "").trim();
    const lat = latRaw ? Number(latRaw) : undefined;
    const lng = lngRaw ? Number(lngRaw) : undefined;
    if ((latRaw && Number.isNaN(lat)) || (lngRaw && Number.isNaN(lng))) {
      setError(dict.contribute.coordsInvalid);
      return;
    }

    const amenitiesRaw = String(fd.get("amenities") || "").trim();
    const amenities = amenitiesRaw
      ? amenitiesRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;

    setSaving(true);
    try {
      const place = addUserPlace({
        nameHr,
        name: String(fd.get("name") || "").trim() || undefined,
        region,
        type: String(fd.get("type") || "beach") as PlaceType,
        dressCode: String(fd.get("dressCode") || "naturist") as DressCode,
        petsAllowed: fd.get("pets") === "on",
        nearBeach: fd.get("nearBeach") === "on",
        location,
        locationHr: String(fd.get("locationHr") || "").trim() || undefined,
        lat,
        lng,
        shortDescriptionHr,
        shortDescription: String(fd.get("shortDescription") || "").trim() || undefined,
        amenities,
        amenitiesHr: amenities,
        imageUrl: imageUrl || "",
        imageCredit: String(fd.get("imageCredit") || "").trim() || undefined,
        officialUrl: String(fd.get("officialUrl") || "").trim() || undefined,
      });
      router.push(`/places/community/${place.id}`);
    } catch {
      setError(dict.contribute.saveError);
      setSaving(false);
    }
  };

  const input =
    "mt-1 w-full rounded-xl border border-sky-100 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none ring-sky-300 transition focus:ring-2";
  const label = "block text-sm font-medium text-sky-950";

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm sm:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {dict.contribute.nameHr} *
          <input name="nameHr" required className={input} placeholder="npr. Uvala Zelena" />
        </label>
        <label className={label}>
          {dict.contribute.nameEn}
          <input name="name" className={input} placeholder="e.g. Green Cove" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {dict.places.region} *
          <select name="region" required className={input} defaultValue="">
            <option value="" disabled>
              {dict.places.all}
            </option>
            <option value="istria">{dict.places.regions.istria}</option>
            <option value="kvarner">{dict.places.regions.kvarner}</option>
            <option value="dalmatia">{dict.places.regions.dalmatia}</option>
          </select>
        </label>
        <label className={label}>
          {dict.places.type}
          <select name="type" className={input} defaultValue="beach">
            <option value="beach">{dict.places.types.beach}</option>
            <option value="camp">{dict.places.types.camp}</option>
            <option value="hotel">{dict.places.types.hotel}</option>
            <option value="resort">{dict.places.types.resort}</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {dict.places.dressCode}
          <select name="dressCode" className={input} defaultValue="naturist">
            <option value="naturist">{dict.places.dress.naturist}</option>
            <option value="clothing-optional">{dict.places.dress["clothing-optional"]}</option>
          </select>
        </label>
        <div className="flex flex-col justify-end gap-2 pb-1">
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input name="pets" type="checkbox" className="rounded border-sky-300" />
            {dict.places.pets}
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-slate-700">
            <input name="nearBeach" type="checkbox" defaultChecked className="rounded border-sky-300" />
            {dict.places.nearBeach}
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {dict.contribute.location} *
          <input name="location" required className={input} placeholder={locale === "hr" ? "npr. Krk" : "e.g. Krk"} />
        </label>
        <label className={label}>
          {dict.contribute.locationHr}
          <input name="locationHr" className={input} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          {dict.contribute.lat}
          <input name="lat" type="number" step="any" className={input} placeholder="45.1" />
        </label>
        <label className={label}>
          {dict.contribute.lng}
          <input name="lng" type="number" step="any" className={input} placeholder="14.5" />
        </label>
      </div>

      <label className={label}>
        {dict.contribute.descriptionHr} *
        <textarea name="shortDescriptionHr" required rows={3} className={input} />
      </label>
      <label className={label}>
        {dict.contribute.descriptionEn}
        <textarea name="shortDescription" rows={2} className={input} />
      </label>

      <label className={label}>
        {dict.contribute.amenities}
        <input name="amenities" className={input} placeholder={dict.contribute.amenitiesHint} />
      </label>

      <label className={label}>
        {dict.contribute.imageUrl}
        <input
          name="imageUrl"
          type="url"
          className={input}
          placeholder="https://upload.wikimedia.org/wikipedia/commons/..."
        />
      </label>
      <p className="text-xs text-slate-500">{dict.contribute.imageHint}</p>

      <label className={label}>
        {dict.contribute.imageCredit}
        <input name="imageCredit" className={input} />
      </label>

      <label className={label}>
        {dict.contribute.officialUrl}
        <input name="officialUrl" type="url" className={input} />
      </label>

      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex rounded-full bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200/70 transition hover:bg-violet-700 disabled:opacity-60"
      >
        {saving ? dict.contribute.saving : dict.contribute.submit}
      </button>
    </form>
  );
}
