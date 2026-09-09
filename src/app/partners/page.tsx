import type { Metadata } from "next";
import { PartnersContent } from "./PartnersContent";

export const metadata: Metadata = {
  title: "Partneri · Za Naturizam",
  description:
    "Featured partner subscription — homepage spotlight, top of directory, custom offers.",
};

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
      <PartnersContent />
    </div>
  );
}
