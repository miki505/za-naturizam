import type { Metadata } from "next";
import { CommunityContent } from "./CommunityContent";

export const metadata: Metadata = {
  title: "Clean Community",
  description: "Respectful community layer for naturist travelers — rules and join CTA placeholder.",
};

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CommunityContent />
    </div>
  );
}
