"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocale } from "@/components/LocaleProvider";
import {
  fetchApprovedComments,
  submitPlaceComment,
  validateCommentBody,
  type PlaceCommentRow,
} from "@/lib/placeComments";

export function PlaceComments({ placeKey }: { placeKey: string }) {
  const { dict, locale } = useLocale();
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const loginHref = `/login?next=${encodeURIComponent(pathname || "/")}`;

  const [comments, setComments] = useState<PlaceCommentRow[]>([]);
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const rows = await fetchApprovedComments(placeKey);
    setComments(rows);
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
    if (validateCommentBody(body)) {
      setError(dict.comments.lengthInvalid);
      return;
    }
    setBusy(true);
    const { error: err } = await submitPlaceComment({
      placeKey,
      userId: user.id,
      body,
    });
    setBusy(false);
    if (err) {
      setError(err.message === "length" ? dict.comments.lengthInvalid : err.message);
      return;
    }
    setBody("");
    setMessage(dict.comments.pendingOk);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString(locale === "hr" ? "hr-HR" : "en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch {
      return iso;
    }
  };

  return (
    <section className="rounded-2xl border border-sky-100/90 bg-white/80 p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold tracking-tight text-sky-950">{dict.comments.title}</h2>
      <p className="mt-1 text-sm text-slate-500">{dict.comments.subtitle}</p>

      {comments.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">{dict.comments.empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((c) => (
            <li
              key={c.id}
              className="rounded-xl border border-sky-100 bg-sky-50/40 px-4 py-3 shadow-sm"
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {c.body}
              </p>
              <p className="mt-2 text-[11px] text-slate-400">{formatDate(c.created_at)}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t border-sky-100 pt-5">
        <p className="text-sm font-semibold text-sky-950">{dict.comments.addTitle}</p>
        {!authLoading && !user ? (
          <p className="mt-2 text-sm text-slate-600">
            <Link href={loginHref} className="font-semibold text-sky-700 underline">
              {dict.auth.login}
            </Link>{" "}
            {dict.comments.loginHint}
          </p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="mt-3 space-y-3">
            <div>
              <label
                className="block text-sm font-medium text-sky-950"
                htmlFor={`comment-body-${placeKey}`}
              >
                {dict.comments.body}
              </label>
              <textarea
                id={`comment-body-${placeKey}`}
                required
                rows={4}
                minLength={3}
                maxLength={2000}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="mt-1 w-full rounded-xl border border-sky-100 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none ring-sky-300 transition focus:ring-2"
                placeholder={dict.comments.placeholder}
              />
              <p className="mt-1 text-xs text-slate-500">{dict.comments.lengthHint}</p>
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
              {busy ? dict.comments.saving : dict.comments.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
