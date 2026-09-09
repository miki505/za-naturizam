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
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
      <PlacesPageHeader />
      <PlacesDirectory />
    </div>
  );
}
