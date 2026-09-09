"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import { createClient } from "@/lib/supabase/client";
import { osmMapCredit, osmStaticMapUrl } from "@/lib/maps";
import { slugify } from "@/lib/slugify";

interface PlaceSubmission {
  id: string;
  user_id: string;
  status: string;
  name_hr: string;
  name_en: string | null;
  region: string;
  type: string;
  dress_code: string;
  pets_allowed: boolean;
  near_beach: boolean;
  location: string;
  location_hr: string | null;
  lat: number | null;
  lng: number | null;
  short_description_hr: string;
  short_description_en: string | null;
  image_url: string | null;
  official_url: string | null;
  published_slug: string | null;
  created_at: string;
}

interface RatingSubmission {
  id: string;
  user_id: string;
  place_key: string;
  rating: number;
  status: string;
  created_at: string;
}

interface PhotoSubmission {
  id: string;
  user_id: string;
  place_key: string;
  image_url: string;
  caption: string | null;
  credit: string | null;
  status: string;
  created_at: string;
}

interface CommentSubmission {
  id: string;
  user_id: string;
  place_key: string;
  body: string;
  status: string;
  created_at: string;
}

export function AdminPanel() {
  const { dict, locale } = useLocale();
  const { user, loading, isAdmin } = useAuth();
  const [places, setPlaces] = useState<PlaceSubmission[]>([]);
  const [ratings, setRatings] = useState<RatingSubmission[]>([]);
  const [photos, setPhotos] = useState<PhotoSubmission[]>([]);
  const [comments, setComments] = useState<CommentSubmission[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const supabase = createClient();
    const [p, r, ph, c] = await Promise.all([
      supabase
        .from("place_submissions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("rating_submissions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("place_photo_submissions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("place_comment_submissions")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
    ]);
    if (p.error) setError(p.error.message);
    else setPlaces((p.data as PlaceSubmission[]) ?? []);
    if (r.error) setError(r.error.message);
    else setRatings((r.data as RatingSubmission[]) ?? []);
    if (ph.error) setError(ph.error.message);
    else setPhotos((ph.data as PhotoSubmission[]) ?? []);
    if (c.error) setError(c.error.message);
    else setComments((c.data as CommentSubmission[]) ?? []);
  }, []);

  useEffect(() => {
    if (isAdmin) void load();
  }, [isAdmin, load]);

  const approvePlace = async (row: PlaceSubmission) => {
    setBusyId(row.id);
    setError(null);
    const supabase = createClient();
    try {
      const base = slugify(row.name_hr || row.name_en || "mjesto") || "mjesto";
      const slug = `community-${base}-${row.id.slice(0, 8)}`;
      const lat = typeof row.lat === "number" ? row.lat : 45.1;
      const lng = typeof row.lng === "number" ? row.lng : 14.5;
      const name = (row.name_en || row.name_hr).trim();
      const nameHr = row.name_hr.trim();
      const shortEn = (row.short_description_en || row.short_description_hr).trim();
      const shortHr = row.short_description_hr.trim();
      const imageUrl = row.image_url?.trim() || osmStaticMapUrl(lat, lng);
      const imageCredit = row.image_url?.trim()
        ? "Photo: community submission / user-provided URL"
        : osmMapCredit(nameHr);

      const { error: insertErr } = await supabase.from("community_places").insert({
        submission_id: row.id,
        slug,
        name,
        name_hr: nameHr,
        region: row.region,
        type: row.type,
        dress_code: row.dress_code,
        pets_allowed: row.pets_allowed,
        near_beach: row.near_beach,
        location: row.location,
        location_hr: row.location_hr || row.location,
        lat,
        lng,
        short_description: shortEn,
        short_description_hr: shortHr,
        image_url: imageUrl,
        image_credit: imageCredit,
        official_url: row.official_url || null,
      });
      if (insertErr) throw insertErr;

      const { error: updErr } = await supabase
        .from("place_submissions")
        .update({
          status: "approved",
          published_slug: slug,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user!.id,
        })
        .eq("id", row.id);
      if (updErr) throw updErr;
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.admin.actionError);
    } finally {
      setBusyId(null);
    }
  };

  const rejectPlace = async (id: string) => {
    setBusyId(id);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase
      .from("place_submissions")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", id);
    if (err) setError(err.message);
    else await load();
    setBusyId(null);
  };

  const approveRating = async (row: RatingSubmission) => {
    setBusyId(row.id);
    setError(null);
    const supabase = createClient();
    try {
      const { error: updErr } = await supabase
        .from("rating_submissions")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
          reviewed_by: user!.id,
        })
        .eq("id", row.id);
      if (updErr) throw updErr;

      const { error: rpcErr } = await supabase.rpc("recompute_place_rating_stats", {
        p_place_key: row.place_key,
      });
      if (rpcErr) throw rpcErr;
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.admin.actionError);
    } finally {
      setBusyId(null);
    }
  };

  const rejectRating = async (id: string) => {
    setBusyId(id);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase
      .from("rating_submissions")
      .update({
        status: "rejected",
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", id);
    if (err) setError(err.message);
    else await load();
    setBusyId(null);
  };

  const setSubmissionStatus = async (
    table: "place_photo_submissions" | "place_comment_submissions",
    id: string,
    status: "approved" | "rejected",
  ) => {
    setBusyId(id);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase
      .from(table)
      .update({
        status,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user!.id,
      })
      .eq("id", id);
    if (err) setError(err.message);
    else await load();
    setBusyId(null);
  };

  if (loading) {
    return <p className="text-sm text-slate-500">{dict.auth.working}</p>;
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-sky-100 bg-white/90 p-6 text-center shadow-sm">
        <p className="font-semibold text-sky-950">{dict.auth.loginRequired}</p>
        <Link href="/login?next=/admin" className="mt-4 inline-flex rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white">
          {dict.auth.signIn}
        </Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50/80 p-6 text-center shadow-sm">
        <p className="font-semibold text-rose-900">{dict.admin.forbidden}</p>
        <p className="mt-2 text-sm text-rose-800/80">{dict.admin.forbiddenHint}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
          {dict.admin.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-sky-950">{dict.admin.title}</h1>
        <p className="mt-2 text-sm text-slate-600">{dict.admin.subtitle}</p>
      </div>

      {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-950">
          {dict.admin.pendingPlaces} ({places.length})
        </h2>
        {places.length === 0 ? (
          <p className="text-sm text-slate-500">{dict.admin.emptyPlaces}</p>
        ) : (
          <ul className="space-y-3">
            {places.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl border border-sky-100 bg-white/90 p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-sky-950">
                      {locale === "hr" ? p.name_hr : p.name_en || p.name_hr}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {p.region} · {p.type} · {p.location}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">{p.short_description_hr}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => void approvePlace(p)}
                      className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      {dict.admin.approve}
                    </button>
                    <button
                      type="button"
                      disabled={busyId === p.id}
                      onClick={() => void rejectPlace(p.id)}
                      className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                    >
                      {dict.admin.reject}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-950">
          {dict.admin.pendingRatings} ({ratings.length})
        </h2>
        {ratings.length === 0 ? (
          <p className="text-sm text-slate-500">{dict.admin.emptyRatings}</p>
        ) : (
          <ul className="space-y-3">
            {ratings.map((r) => (
              <li
                key={r.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-amber-950">
                    {r.place_key} — {r.rating}/5
                  </p>
                  <p className="text-xs text-amber-800/70">{r.created_at}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === r.id}
                    onClick={() => void approveRating(r)}
                    className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.approve}
                  </button>
                  <button
                    type="button"
                    disabled={busyId === r.id}
                    onClick={() => void rejectRating(r.id)}
                    className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.reject}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-950">
          {dict.admin.pendingPhotos} ({photos.length})
        </h2>
        {photos.length === 0 ? (
          <p className="text-sm text-slate-500">{dict.admin.emptyPhotos}</p>
        ) : (
          <ul className="space-y-3">
            {photos.map((ph) => (
              <li
                key={ph.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-sky-100 bg-white/90 p-4 shadow-sm"
              >
                <div className="flex min-w-0 flex-1 gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ph.image_url}
                    alt=""
                    className="h-20 w-28 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-sky-950">{ph.place_key}</p>
                    {ph.caption ? (
                      <p className="mt-1 text-sm text-slate-700">{ph.caption}</p>
                    ) : null}
                    {ph.credit ? (
                      <p className="mt-0.5 text-xs text-slate-400">{ph.credit}</p>
                    ) : null}
                    <a
                      href={ph.image_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block truncate text-xs text-sky-700 underline"
                    >
                      {ph.image_url}
                    </a>
                    <p className="mt-1 text-xs text-slate-400">{ph.created_at}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === ph.id}
                    onClick={() =>
                      void setSubmissionStatus("place_photo_submissions", ph.id, "approved")
                    }
                    className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.approve}
                  </button>
                  <button
                    type="button"
                    disabled={busyId === ph.id}
                    onClick={() =>
                      void setSubmissionStatus("place_photo_submissions", ph.id, "rejected")
                    }
                    className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.reject}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-950">
          {dict.admin.pendingComments} ({comments.length})
        </h2>
        {comments.length === 0 ? (
          <p className="text-sm text-slate-500">{dict.admin.emptyComments}</p>
        ) : (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-violet-100 bg-violet-50/50 p-4 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-violet-950">{c.place_key}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{c.body}</p>
                  <p className="mt-1 text-xs text-slate-400">{c.created_at}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={busyId === c.id}
                    onClick={() =>
                      void setSubmissionStatus("place_comment_submissions", c.id, "approved")
                    }
                    className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.approve}
                  </button>
                  <button
                    type="button"
                    disabled={busyId === c.id}
                    onClick={() =>
                      void setSubmissionStatus("place_comment_submissions", c.id, "rejected")
                    }
                    className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
                  >
                    {dict.admin.reject}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
