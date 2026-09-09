"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import {
  fetchApprovedPhotos,
  isHttpsUrl,
  submitPlacePhoto,
  type PlacePhotoRow,
} from "@/lib/placePhotos";

export function PlacePhotos({ placeKey }: { placeKey: string }) {
  const { dict } = useLocale();
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const loginHref = `/login?next=${encodeURIComponent(pathname || "/")}`;

  const [photos, setPhotos] = useState<PlacePhotoRow[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [credit, setCredit] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const rows = await fetchApprovedPhotos(placeKey);
    setPhotos(rows);
  }, [placeKey]);

  useEffect(() => {
    void load();
  }, [load]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!user) {
      setError(dict.auth.loginRequired);
      return;
    }
    if (!isHttpsUrl(imageUrl)) {
      setError(dict.photos.urlInvalid);
      return;
    }
    setBusy(true);
    const { error: err } = await submitPlacePhoto({
      placeKey,
      userId: user.id,
      imageUrl,
      caption,
      credit,
    });
    setBusy(false);
    if (err) {
      setError(err.message === "https_required" ? dict.photos.urlInvalid : err.message);
      return;
    }
    setImageUrl("");
    setCaption("");
    setCredit("");
    setMessage(dict.photos.pendingOk);
  };

  const input =
    "mt-1 w-full rounded-xl border border-sky-100 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none ring-sky-300 transition focus:ring-2";
  const label = "block text-sm font-medium text-sky-950";

  return (
    <section className="rounded-2xl border border-sky-100/90 bg-white/80 p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-sky-950">{dict.photos.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{dict.photos.subtitle}</p>

      {photos.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">{dict.photos.empty}</p>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((p) => (
            <li
              key={p.id}
              className="overflow-hidden rounded-xl border border-sky-100 bg-sky-50/40 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image_url}
                alt={p.caption || ""}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              {(p.caption || p.credit) && (
                <div className="space-y-0.5 px-3 py-2">
                  {p.caption ? (
                    <p className="text-sm text-slate-700">{p.caption}</p>
                  ) : null}
                  {p.credit ? (
                    <p className="text-[11px] text-slate-400">
                      {dict.detail.imageCredit}: {p.credit}
                    </p>
                  ) : null}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t border-sky-100 pt-5">
        <p className="text-sm font-semibold text-sky-950">{dict.photos.addTitle}</p>
        {!authLoading && !user ? (
          <p className="mt-2 text-sm text-slate-600">
            <Link href={loginHref} className="font-semibold text-sky-700 underline">
              {dict.auth.login}
            </Link>{" "}
            {dict.photos.loginHint}
          </p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="mt-3 space-y-3">
            <div>
              <label className={label} htmlFor={`photo-url-${placeKey}`}>
                {dict.photos.imageUrl}
              </label>
              <input
                id={`photo-url-${placeKey}`}
                type="url"
                required
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://"
                className={input}
              />
              <p className="mt-1 text-xs text-slate-500">{dict.photos.imageHint}</p>
            </div>
            <div>
              <label className={label} htmlFor={`photo-caption-${placeKey}`}>
                {dict.photos.caption}
              </label>
              <input
                id={`photo-caption-${placeKey}`}
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className={input}
              />
            </div>
            <div>
              <label className={label} htmlFor={`photo-credit-${placeKey}`}>
                {dict.photos.credit}
              </label>
              <input
                id={`photo-credit-${placeKey}`}
                type="text"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
                className={input}
              />
            </div>
            {message ? (
              <p className="text-sm font-medium text-emerald-800">{message}</p>
            ) : null}
            {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
            <button
              type="submit"
              disabled={busy || !user}
              className="rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-60"
            >
              {busy ? dict.photos.saving : dict.photos.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
