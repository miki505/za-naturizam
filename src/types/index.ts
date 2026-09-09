export type Locale = "hr" | "en";

export type PlaceType = "beach" | "camp" | "hotel" | "resort";
export type Region = "istria" | "kvarner" | "dalmatia";
export type DressCode = "naturist" | "clothing-optional";

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
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}
