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
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className={`mb-6 h-48 rounded-[2rem] bg-gradient-to-br ${place.imageGradient} shadow-inner sm:h-64`} />
      <PlaceDetailClient place={place} mapHref={mapsUrl(place)} />
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <AffiliateCTA place={place} />
          <a
            href={mapsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-medium text-sky-800 shadow-sm hover:bg-sky-50"
          >
            Google Maps →
          </a>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-white/80 p-4 text-sm text-slate-600">
          <p>
            <span className="font-semibold text-sky-900">GPS:</span> {place.lat}, {place.lng}
          </p>
          <p className="mt-2">
            <Link href="/assistant" className="text-sky-700 hover:underline">
              AI asistent →
            </Link>
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-sky-950">Related / Slična mjesta</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
