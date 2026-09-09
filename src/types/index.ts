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
  /** Real location image: Wikimedia Commons or OSM static map. */
  imageUrl?: string;
  /** Attribution: author + Commons/OSM + license hint. */
  imageCredit?: string;
  officialUrl?: string;
  /** Paid partner spotlight */
  featured?: boolean;
  /** Lower = higher priority (1 first). */
  featuredRank?: number;
  featuredLabel?: string;
  sponsoredOffers?: SponsoredOffer[];
  /** Client-only community submission (localStorage). */
  userAdded?: boolean;
}

export interface UserPlaceInput {
  nameHr: string;
  name?: string;
  region: Region;
  type: PlaceType;
  dressCode: DressCode;
  petsAllowed: boolean;
  nearBeach: boolean;
  location: string;
  locationHr?: string;
  lat?: number;
  lng?: number;
  shortDescriptionHr: string;
  shortDescription?: string;
  amenities?: string[];
  amenitiesHr?: string[];
  imageUrl: string;
  imageCredit?: string;
  officialUrl?: string;
}

export interface PlaceRatingEntry {
  sum: number;
  count: number;
  userRating?: number;
}

export type RatingsStore = Record<string, PlaceRatingEntry>;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
