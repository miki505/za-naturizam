import type { Metadata } from "next";
import { ChatAssistant } from "@/components/ChatAssistant";
import { AssistantHeader } from "./AssistantHeader";

export const metadata: Metadata = {
  title: "AI Travel Asistent",
  description:
    "AI travel assistant for naturist and clothing-optional trips in Croatia — recommendations, mini-itineraries and booking tips.",
};

export default function AssistantPage() {
  return (
    <div className="relative mx-auto max-w-6xl space-y-8 px-4 py-12 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-4 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl"
      />
      <AssistantHeader />
      <ChatAssistant />
    </div>
  );
}
