import type { Metadata } from "next";
import { ContributeForm } from "./ContributeForm";
import { ContributeHeader } from "./ContributeHeader";

export const metadata: Metadata = {
  title: "Dodaj mjesto / Contribute",
  description: "Submit a naturist or clothing-optional beach or camp for admin review (Supabase).",
};

export default function ContributePage() {
  return (
    <div className="relative mx-auto max-w-3xl space-y-8 px-4 py-12 md:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-4 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl"
      />
      <ContributeHeader />
      <ContributeForm />
    </div>
  );
}
