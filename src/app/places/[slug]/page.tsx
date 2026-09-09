import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateCTA } from "@/components/AffiliateCTA";
import { PlaceCard } from "@/components/PlaceCard";
import { getAllPlaces, getPlaceBySlug, getRelatedPlaces, mapsUrl } from "@/lib/places";
import { PlaceImage } from "@/components/PlaceImage";
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
      ...(place.imageUrl ? { images: [{ url: place.imageUrl }] } : {}),
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
      <div className="relative mb-8 h-52 overflow-hidden rounded-[2rem] shadow-lg shadow-sky-100/60 sm:h-64">
        <PlaceImage
          src={place.imageUrl}
          gradient={place.imageGradient}
          className="absolute inset-0 h-full w-full"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_50%),linear-gradient(to_top,rgba(15,23,42,0.35),transparent_55%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 rounded-[1.4rem] border border-white/35"
        />
        {place.featured && (
          <span className="absolute left-6 top-6 rounded-full border border-amber-300/90 bg-amber-400/95 px-3 py-1 text-xs font-bold text-amber-950 shadow-sm">
            ★ Partner
          </span>
        )}
      </div>
      <PlaceDetailClient place={place} mapHref={mapsUrl(place)} />
      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <AffiliateCTA place={place} />
          <div className="flex flex-wrap gap-2">
            <a
              href={mapsUrl(place)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2.5 text-sm font-semibold text-sky-800 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
            >
              Google Maps →
            </a>
            {place.officialUrl && (
              <a
                href={place.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-semibold text-teal-900 shadow-sm transition hover:border-teal-300 hover:bg-teal-100"
              >
                Official site →
              </a>
            )}
          </div>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-white/85 p-5 text-sm text-slate-600 shadow-sm">
          <p>
            <span className="font-semibold text-sky-900">GPS:</span> {place.lat}, {place.lng}
          </p>
          {place.imageCredit && (
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{place.imageCredit}</p>
          )}
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
