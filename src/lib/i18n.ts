import type { Locale } from "@/types";

export const defaultLocale: Locale = "hr";

const dictionaries = {
  hr: {
    brand: "Za Naturizam",
    brandTagline: "AI vodič za naturistička i clothing-optional putovanja",
    community: "Clean Community",
    nav: {
      home: "Početna",
      places: "Mjesta",
      assistant: "AI asistent",
      premium: "Premium",
      community: "Zajednica",
    },
    langToggle: "EN",
    hero: {
      title: "Otkrijte Hrvatsku bez granica",
      subtitle:
        "Umjesto rasutih foruma — jedan pouzdani AI vodič za naturističke plaže, kampove i resorte uz Jadran.",
      ctaPlaces: "Pregledaj mjesta",
      ctaAssistant: "Pitaj AI asistenta",
      searchChip: "Traži: naturistički kamp blizu plaže…",
    },
    trust: {
      places: "16+ mjesta",
      regions: "Istra–Dalmacija",
      ai: "AI asistent",
      community: "Clean Community",
    },
    features: {
      eyebrow: "Prednosti",
      title: "Zašto Za Naturizam",
      directory: "Direktorij mjesta",
      directoryDesc:
        "Provjerena naturistička i clothing-optional mjesta od Istre do Dalmacije — filtriraj po tipu, ljubimcima i dress codeu.",
      ai: "AI travel asistent",
      aiDesc:
        "Pitaj na hrvatskom ili engleskom i dobij jasne preporuke za plaže, kampove i mini-itinerere.",
      communityTitle: "Clean Community",
      communityDesc:
        "Poštovanje, privatnost i mirna razmjena iskustava — bez buke i bez pritiska.",
    },
    featured: {
      eyebrow: "Odabrano",
      title: "Istaknuta mjesta",
      viewAll: "Sva mjesta",
    },
    bottomCta: {
      title: "Ne znaš kamo? Pitaj asistenta.",
      subtitle:
        "Opisi što tražiš — regiju, tip mjesta, ljubimce — i dobij usmjerene prijedloge u sekundi.",
      cta: "Otvori AI asistenta",
    },
    places: {
      title: "Direktorij mjesta",
      subtitle: "Pretraži i filtriraj naturistička i clothing-optional mjesta u Hrvatskoj.",
      search: "Pretraži po imenu ili lokaciji…",
      region: "Regija",
      type: "Tip",
      dressCode: "Dress code",
      pets: "Prima ljubimce",
      nearBeach: "Blizu plaže",
      all: "Sve",
      results: "rezultata",
      noResults: "Nema mjesta za odabrane filtere.",
      rating: "Ocjena",
      viewDetails: "Detalji",
      regions: {
        istria: "Istra",
        kvarner: "Kvarner",
        dalmatia: "Dalmacija",
      },
      types: {
        beach: "Plaža",
        camp: "Kamp",
        hotel: "Hotel",
        resort: "Resort",
      },
      dress: {
        naturist: "Naturizam",
        "clothing-optional": "Clothing-optional",
      },
    },
    detail: {
      guide: "Vodič",
      amenities: "Sadržaji",
      map: "Otvori na karti",
      book: "Rezerviraj / Book",
      related: "Slična mjesta",
      affiliateNote: "Partnerska poveznica — može donijeti proviziju.",
      petsYes: "Ljubimci dozvoljeni",
      petsNo: "Ljubimci nisu dozvoljeni",
      nearBeach: "Blizu plaže",
    },
    assistant: {
      title: "AI Travel Asistent",
      subtitle:
        "Pitaj za preporuke kampa, plaže ili mini-itinerera. Odgovori su lokalni i temeljeni na našem direktoriju.",
      placeholder: "npr. Najbolji naturistički kamp u Istri blizu plaže koji prima kućne ljubimce",
      send: "Pošalji",
      thinking: "Tražim preporuke…",
      examples: "Primjeri pitanja",
      weatherTip: "Vremenski savjet",
      itinerary: "Mini itinerer",
      bookCtas: "Rezervacije",
    },
    premium: {
      title: "Premium teaser",
      subtitle: "Offline karte i napredni filteri — freemium UI (bez naplate za sada).",
      offlineMaps: "Offline karte",
      offlineMapsDesc: "Preuzmi regije za offline navigaciju do skrivenih uvala.",
      advancedFilters: "Napredni filteri",
      advancedFiltersDesc: "Shade score, pristup brodom, buka, LGBTQ+ friendly oznake.",
      cta: "Uskoro — lista čekanja",
      locked: "Zaključano u besplatnom planu",
    },
    communityPage: {
      title: "Clean Community",
      subtitle: "Poštujući sloj zajednice za naturističke putnike.",
      rulesTitle: "Pravila poštovanja",
      rules: [
        "Bez neprikladnih fotografija i doxxinga.",
        "Poštuj lokalne zakone i oznake plaža.",
        "Privatnost prije svega — ne dijeli točne lokacije osjetljivih mjesta javno.",
        "Ljubazna komunikacija; zero harassment.",
        "Ostavljamo mjesta čistima (leave no trace).",
      ],
      feedTitle: "Feed (uskoro)",
      feedEmpty: "Još nema objava — pridruži se listi za rani pristup.",
      joinCta: "Pridruži se (uskoro)",
    },
    footer: {
      rights: "Za Naturizam — vodič za odgovoran naturizam u Hrvatskoj.",
      made: "Clean Community",
    },
  },
  en: {
    brand: "Za Naturizam",
    brandTagline: "AI guide for naturist & clothing-optional travel",
    community: "Clean Community",
    nav: {
      home: "Home",
      places: "Places",
      assistant: "AI Assistant",
      premium: "Premium",
      community: "Community",
    },
    langToggle: "HR",
    hero: {
      title: "Discover Croatia without boundaries",
      subtitle:
        "Scattered forum tips, one trusted AI guide — naturist beaches, camps and resorts along the Adriatic.",
      ctaPlaces: "Browse places",
      ctaAssistant: "Ask the AI assistant",
      searchChip: "Search: naturist camp near the beach…",
    },
    trust: {
      places: "16+ places",
      regions: "Istria–Dalmatia",
      ai: "AI assistant",
      community: "Clean Community",
    },
    features: {
      eyebrow: "Why us",
      title: "Why Za Naturizam",
      directory: "Place directory",
      directoryDesc:
        "Curated naturist and clothing-optional spots from Istria to Dalmatia — filter by type, pets and dress code.",
      ai: "AI travel assistant",
      aiDesc:
        "Ask in Croatian or English and get clear recommendations for beaches, camps and mini-itineraries.",
      communityTitle: "Clean Community",
      communityDesc:
        "Respect, privacy and calm experience sharing — no noise, no pressure.",
    },
    featured: {
      eyebrow: "Handpicked",
      title: "Featured places",
      viewAll: "All places",
    },
    bottomCta: {
      title: "Not sure where to go? Ask the assistant.",
      subtitle:
        "Describe what you need — region, place type, pets — and get focused suggestions in seconds.",
      cta: "Open AI assistant",
    },
    places: {
      title: "Place directory",
      subtitle: "Search and filter naturist and clothing-optional places in Croatia.",
      search: "Search by name or location…",
      region: "Region",
      type: "Type",
      dressCode: "Dress code",
      pets: "Pets allowed",
      nearBeach: "Near beach",
      all: "All",
      results: "results",
      noResults: "No places match these filters.",
      rating: "Rating",
      viewDetails: "Details",
      regions: {
        istria: "Istria",
        kvarner: "Kvarner",
        dalmatia: "Dalmatia",
      },
      types: {
        beach: "Beach",
        camp: "Camp",
        hotel: "Hotel",
        resort: "Resort",
      },
      dress: {
        naturist: "Naturist",
        "clothing-optional": "Clothing-optional",
      },
    },
    detail: {
      guide: "Guide",
      amenities: "Amenities",
      map: "Open in maps",
      book: "Book / Reserve",
      related: "Related places",
      affiliateNote: "Affiliate link — may earn a commission.",
      petsYes: "Pets allowed",
      petsNo: "Pets not allowed",
      nearBeach: "Near beach",
    },
    assistant: {
      title: "AI Travel Assistant",
      subtitle:
        "Ask for camp, beach or mini-itinerary tips. Answers are local and grounded in our place directory.",
      placeholder: "e.g. Best naturist camp in Istria near the beach that allows pets",
      send: "Send",
      thinking: "Finding recommendations…",
      examples: "Example questions",
      weatherTip: "Weather tip",
      itinerary: "Mini itinerary",
      bookCtas: "Booking",
    },
    premium: {
      title: "Premium teaser",
      subtitle: "Offline maps and advanced filters — freemium UI (no payments yet).",
      offlineMaps: "Offline maps",
      offlineMapsDesc: "Download regions for offline navigation to hidden coves.",
      advancedFilters: "Advanced filters",
      advancedFiltersDesc: "Shade score, boat access, noise, LGBTQ+ friendly tags.",
      cta: "Coming soon — join waitlist",
      locked: "Locked on the free plan",
    },
    communityPage: {
      title: "Clean Community",
      subtitle: "A respectful community layer for naturist travelers.",
      rulesTitle: "Respect rules",
      rules: [
        "No inappropriate photos or doxxing.",
        "Respect local laws and beach signage.",
        "Privacy first — don't publicly share exact sensitive locations.",
        "Kind communication; zero harassment.",
        "Leave places clean (leave no trace).",
      ],
      feedTitle: "Feed (coming soon)",
      feedEmpty: "No posts yet — join the list for early access.",
      joinCta: "Join (coming soon)",
    },
    footer: {
      rights: "Za Naturizam — a guide to responsible naturism in Croatia.",
      made: "Clean Community",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["hr"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}
