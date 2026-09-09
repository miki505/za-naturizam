import type { Metadata } from "next";
import { PlacesDirectory } from "@/components/PlacesDirectory";
import { PlacesPageHeader } from "./PlacesPageHeader";

export const metadata: Metadata = {
  title: "Mjesta / Places",
  description:
    "Search and filter naturist and clothing-optional beaches, camps and resorts in Istria, Kvarner and Dalmatia.",
};

export default function PlacesPage() {
  return (
    <div className="relative mx-auto max-w-6xl space-y-8 px-4 py-12 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-amber-200/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-sky-300/25 blur-3xl"
      />
      <PlacesPageHeader />
      <PlacesDirectory />
    </div>
  );
}
