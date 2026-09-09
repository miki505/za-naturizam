import type { Metadata } from "next";
import { PremiumContent } from "./PremiumContent";

export const metadata: Metadata = {
  title: "Premium",
  description: "Freemium teaser for offline maps and advanced filters — UI only in the MVP.",
};

export default function PremiumPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <PremiumContent />
    </div>
  );
}
