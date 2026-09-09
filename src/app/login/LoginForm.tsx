"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { createClient } from "@/lib/supabase/client";

function LoginFormInner() {
  const { dict, locale } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  const [mode, setMode] = useState<"signin" | "signup" | "magic">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setBusy(true);
    const supabase = createClient();
    try {
      if (mode === "magic") {
        const origin = window.location.origin;
        const { error: err } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (err) throw err;
        setMessage(dict.auth.magicSent);
        return;
      }
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (err) throw err;
        setMessage(dict.auth.signupOk);
        return;
      }
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (err) throw err;
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.auth.error);
    } finally {
      setBusy(false);
    }
  };

  const input =
    "mt-1 w-full rounded-xl border border-sky-100 bg-white px-3 py-2.5 text-sm text-slate-800 shadow-sm outline-none ring-sky-300 transition focus:ring-2";
  const label = "block text-sm font-medium text-sky-950";

  return (
    <div className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700/90">
        {dict.auth.eyebrow}
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-sky-950">{dict.auth.title}</h1>
      <p className="mt-2 text-sm text-slate-600">{dict.auth.subtitle}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            ["signin", dict.auth.signIn],
            ["signup", dict.auth.signUp],
            ["magic", dict.auth.magicLink],
          ] as const
        ).map(([key, labelText]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setMode(key);
              setError(null);
              setMessage(null);
            }}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              mode === key
                ? "bg-sky-600 text-white"
                : "border border-sky-100 bg-sky-50 text-sky-900 hover:bg-sky-100"
            }`}
          >
            {labelText}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className={label}>
          {dict.auth.email}
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={input}
            placeholder={locale === "hr" ? "vas@email.com" : "you@email.com"}
          />
        </label>
        {mode !== "magic" ? (
          <label className={label}>
            {dict.auth.password}
            <input
              type="password"
              required
              minLength={6}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input}
            />
          </label>
        ) : null}

        {error ? <p className="text-sm font-medium text-rose-700">{error}</p> : null}
        {message ? <p className="text-sm font-medium text-emerald-700">{message}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full justify-center rounded-full bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-200/70 transition hover:bg-sky-700 disabled:opacity-60"
        >
          {busy ? dict.auth.working : mode === "signup" ? dict.auth.signUp : mode === "magic" ? dict.auth.sendMagic : dict.auth.signIn}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-500">
        <Link href="/" className="font-semibold text-sky-700 hover:underline">
          ← {dict.nav.home}
        </Link>
      </p>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-500">…</div>}>
      <LoginFormInner />
    </Suspense>
  );
}
