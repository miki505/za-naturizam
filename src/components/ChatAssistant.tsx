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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div className="rounded-2xl border border-sky-100 bg-white p-3 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {dict.assistant.examples}
        </p>
        <div className="flex flex-col gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => ask(ex)}
              className="rounded-xl border border-sky-50 bg-sky-50/60 px-3 py-2 text-left text-sm text-sky-900 transition hover:bg-sky-100"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[320px] flex-col gap-3 rounded-2xl border border-sky-100 bg-gradient-to-b from-white to-sky-50/40 p-4 shadow-sm">
        {messages.length === 0 && (
          <p className="m-auto max-w-sm text-center text-sm text-slate-500">
            {dict.assistant.subtitle}
          </p>
        )}
        {messages.map((msg) => {
          if (msg.role === "user") {
            return (
              <div
                key={msg.id}
                className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-sky-600 px-4 py-2 text-sm text-white"
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
              <div className="whitespace-pre-wrap rounded-2xl rounded-bl-md border border-sky-100 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
                {parsed
                  ? parsed.text.split("\n").map((line, idx) => (
                      <p
                        key={idx}
                        className={
                          line.startsWith("### ") ? "mt-2 font-semibold text-sky-900" : undefined
                        }
                      >
                        {renderMarkdownBold(line.replace(/^### /, ""))}
                      </p>
                    ))
                  : msg.content}
              </div>
              {parsed?.matches?.length ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {dict.assistant.bookCtas}
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {parsed.matches.map((place) => (
                      <div key={place.id} className="space-y-2">
                        <Link
                          href={`/places/${place.slug}`}
                          className="block text-sm font-medium text-sky-800 hover:underline"
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
        {busy && <p className="text-sm italic text-slate-500">{dict.assistant.thinking}</p>}
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={dict.assistant.placeholder}
          className="flex-1 rounded-full border border-sky-200 bg-white px-4 py-3 text-sm shadow-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-sky-700 disabled:opacity-60"
        >
          {dict.assistant.send}
        </button>
      </form>
    </div>
  );
}
