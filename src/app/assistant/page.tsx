import type { Metadata } from "next";
import { ChatAssistant } from "@/components/ChatAssistant";
import { AssistantHeader } from "./AssistantHeader";

export const metadata: Metadata = {
  title: "AI Travel Asistent",
  description:
    "Client-side AI travel assistant stub for naturist and clothing-optional trips in Croatia.",
};

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <AssistantHeader />
      <ChatAssistant />
    </div>
  );
}
