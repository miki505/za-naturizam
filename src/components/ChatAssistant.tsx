"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { answerQuery, exampleQueries } from "@/lib/assistant";
import type { ChatMessage, Place } from "@/types";
import { useLocale } from "./LocaleProvider";
import { AffiliateCTA } from "./AffiliateCTA";

function renderMarkdownBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-sky-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

interface AssistantPayload {
  text: string;
  matches: Place[];
}

export function ChatAssistant() {
  const { locale, dict } = useLocale();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [busy, setBusy] = useState(false);

  const examples = useMemo(() => exampleQueries[locale], [locale]);

  function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", content: q };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBusy(true);

    window.setTimeout(() => {
      const reply = answerQuery(q, locale);
      const blocks = [
        reply.text,
        "",
        `### ${dict.assistant.itinerary}`,
        ...reply.itinerary.map((step, i) => `${i + 1}. ${step}`),
        "",
        `### ${dict.assistant.weatherTip}`,
        reply.weatherTip,
      ].join("\n");

      const payload: AssistantPayload = {
        text: blocks,
        matches: reply.matches,
      };

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: JSON.stringify(payload),
      };
      setMessages((m) => [...m, assistantMsg]);
      setBusy(false);
    }, 450);
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      {messages.length === 0 && (
        <div className="rounded-2xl border border-sky-100/90 bg-white/90 p-4 shadow-sm sm:p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700/80">
            {dict.assistant.examples}
          </p>
          <div className="flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => ask(ex)}
                className="rounded-full border border-sky-100 bg-sky-50/70 px-3.5 py-2 text-left text-sm text-sky-900 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-200 hover:bg-sky-100/80 hover:shadow"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex min-h-[340px] flex-col gap-4 rounded-[1.5rem] border border-sky-100/90 bg-gradient-to-b from-white via-white to-sky-50/50 p-4 shadow-sm sm:p-5">
        {messages.length === 0 && (
          <div className="m-auto max-w-sm space-y-2 px-2 py-10 text-center">
            <div
              aria-hidden
              className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-lg text-white shadow-md shadow-sky-200/70"
            >
              ✦
            </div>
            <p className="text-base font-semibold text-sky-950">{dict.assistant.emptyTitle}</p>
            <p className="text-sm leading-relaxed text-slate-500">{dict.assistant.emptyHint}</p>
          </div>
        )}
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div
                key={msg.id}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-gradient-to-br from-sky-600 to-sky-500 px-4 py-2.5 text-sm leading-relaxed text-white shadow-md shadow-sky-200/60"
              >
                {msg.content}
              </div>
            );
          }
          let parsed: AssistantPayload | null = null;
          try {
            parsed = JSON.parse(msg.content) as AssistantPayload;
          } catch {
            parsed = null;
          }
          return (
            <div key={msg.id} className="mr-auto w-full max-w-[95%] space-y-3">
              <div className="whitespace-pre-wrap rounded-2xl rounded-bl-md border border-sky-100 bg-white px-4 py-3.5 text-sm leading-relaxed text-slate-700 shadow-sm">
                {parsed
                  ? parsed.text.split("\n").map((line, idx) => {
                      const isHeading = line.startsWith("### ");
                      const isEmpty = line.trim() === "";
                      if (isEmpty) return <div key={idx} className="h-2" />;
                      return (
                        <p
                          key={idx}
                          className={
                            isHeading
                              ? "mt-3 mb-1 text-xs font-semibold uppercase tracking-[0.1em] text-amber-700/90"
                              : undefined
                          }
                        >
                          {renderMarkdownBold(line.replace(/^### /, ""))}
                        </p>
                      );
                    })
                  : msg.content}
              </div>
              {parsed?.matches?.length ? (
                <div className="space-y-3 rounded-2xl border border-amber-100/90 bg-gradient-to-br from-amber-50/80 to-orange-50/40 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-amber-800/80">
                    {dict.assistant.bookCtas}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {parsed.matches.map((place) => (
                      <div
                        key={place.id}
                        className="space-y-2 rounded-xl border border-white/80 bg-white/90 p-3 shadow-sm"
                      >
                        <Link
                          href={`/places/${place.slug}`}
                          className="block text-sm font-semibold text-sky-900 transition hover:text-sky-700"
                        >
                          {locale === "hr" ? place.nameHr : place.name} →
                        </Link>
                        <AffiliateCTA place={place} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
        {busy && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span
              className="inline-flex h-2 w-2 animate-pulse rounded-full bg-sky-400"
              aria-hidden
            />
            <span className="italic">{dict.assistant.thinking}</span>
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {examples.slice(0, 2).map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => ask(ex)}
              disabled={busy}
              className="rounded-full border border-sky-100 bg-white/80 px-3 py-1.5 text-xs font-medium text-sky-800 transition hover:bg-sky-50 disabled:opacity-50"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      <form
        className="flex gap-2 rounded-full border border-sky-100 bg-white/95 p-1.5 shadow-md shadow-sky-100/50"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.assistant.placeholder}
          className="min-w-0 flex-1 rounded-full border-0 bg-transparent px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="shrink-0 rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {dict.assistant.send}
        </button>
      </form>
    </div>
  );
}
