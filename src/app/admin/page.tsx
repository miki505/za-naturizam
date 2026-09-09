import type { Metadata } from "next";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = {
  title: "Admin",
  description: "Moderate place and rating submissions.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12 md:py-14">
      <AdminPanel />
    </div>
  );
}
