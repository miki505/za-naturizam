import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { PlaceCard } from "@/components/PlaceCard";
import { getAllPlaces, getPlaceBySlug, getRelatedPlaces, mapsUrl } from "@/lib/places";
import { PlaceDetailClient } from "./PlaceDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPlaces().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) return { title: "Place" };
  return {
    title: place.nameHr,
    description: place.shortDescriptionHr,
    openGraph: {
      title: `${place.nameHr} · Za Naturizam`,
      description: place.shortDescription,
    },
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);
  if (!place) notFound();
  const related = getRelatedPlaces(place);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-14">
      <div
        className={`relative mb-8 h-52 overflow-hidden rounded-[2rem] bg-gradient-to-br ${place.imageGradient} shadow-lg shadow-sky-100/60 sm:h-64`}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(15,23,42,0.12),transparent_45%)]"
        />
        <div
          aria-hidden
          className="absolute inset-4 rounded-[1.4rem] border border-white/35"
        />
      </div>
      <PlaceDetailClient place={place} mapHref={mapsUrl(place)} />
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <AffiliateCTA place={place} />
          <a
            href={mapsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
          >
            Google Maps →
          </a>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-white/85 p-5 text-sm text-slate-600 shadow-sm">
          <p>
            <span className="font-semibold text-sky-900">GPS:</span> {place.lat}, {place.lng}
          </p>
          <p className="mt-3">
            <Link
              href="/assistant"
              className="font-medium text-sky-700 transition hover:text-sky-900 hover:underline"
            >
              AI asistent →
            </Link>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-2xl font-bold tracking-tight text-sky-950">
            Related / Slična mjesta
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
