export type Locale = "hr" | "en";

export type PlaceType = "beach" | "camp" | "hotel" | "resort";
export type Region = "istria" | "kvarner" | "dalmatia";
export type DressCode = "naturist" | "clothing-optional";

export interface SponsoredOffer {
  title: string;
  titleHr: string;
  description: string;
  descriptionHr: string;
  ctaLabel: string;
  ctaLabelHr: string;
  url: string;
}

export interface Place {
  id: string;
  slug: string;
  name: string;
  nameHr: string;
  region: Region;
  type: PlaceType;
  dressCode: DressCode;
  petsAllowed: boolean;
  nearBeach: boolean;
  location: string;
  locationHr: string;
  lat: number;
  lng: number;
  rating: number;
  shortDescription: string;
  shortDescriptionHr: string;
  guide: string;
  guideHr: string;
  amenities: string[];
  amenitiesHr: string[];
  relatedSlugs: string[];
  affiliateLabel: string;
  affiliateUrl: string;
  imageGradient: string;
  /** Royalty-free illustrative image (e.g. Unsplash). */
  imageUrl?: string;
  /** Short attribution, e.g. "Photo: Unsplash / Name — illustrative coastal photo". */
  imageCredit?: string;
  officialUrl?: string;
  /** Paid partner spotlight */
  featured?: boolean;
  /** Lower = higher priority (1 first). */
  featuredRank?: number;
  featuredLabel?: string;
  sponsoredOffers?: SponsoredOffer[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
