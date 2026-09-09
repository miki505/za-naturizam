import { places } from "@/data/places";
import type { Locale, Place } from "@/types";

export interface AssistantReply {
  text: string;
  matches: Place[];
  itinerary: string[];
  weatherTip: string;
}

function scorePlace(place: Place, tokens: string[]): number {
  let score = 0;
  const blob = `${place.name} ${place.nameHr} ${place.region} ${place.type} ${place.dressCode} ${place.location} ${place.locationHr} ${place.amenities.join(" ")} ${place.amenitiesHr.join(" ")}`.toLowerCase();

  for (const t of tokens) {
    if (blob.includes(t)) score += 2;
  }

  if (tokens.some((t) => ["istra", "istria", "istarski"].includes(t)) && place.region === "istria")
    score += 5;
  if (tokens.some((t) => ["kvarner", "krk", "cres", "rab", "pag"].includes(t)) && place.region === "kvarner")
    score += 5;
  if (
    tokens.some((t) => ["dalmacija", "dalmatia", "split", "makarska", "šibenik", "sibenik"].includes(t)) &&
    place.region === "dalmatia"
  )
    score += 5;

  if (tokens.some((t) => ["kamp", "camp", "camping"].includes(t)) && place.type === "camp") score += 4;
  if (tokens.some((t) => ["plaža", "plaza", "beach"].includes(t)) && place.type === "beach") score += 3;
  if (tokens.some((t) => ["resort", "hotel"].includes(t)) && (place.type === "resort" || place.type === "hotel"))
    score += 3;

  if (
    tokens.some((t) =>
      ["ljubimc", "pets", "pet", "pas", "dog", "kućne", "kucne", "dogs"].some((k) => t.includes(k)),
    ) && place.petsAllowed
  )
    score += 6;

  if (
    tokens.some((t) => ["plaže", "plaze", "beach", "obal", "more", "sea"].some((k) => t.includes(k))) &&
    place.nearBeach
  )
    score += 3;

  if (
    tokens.some((t) => ["naturist", "naturizam", "naturistički", "naturisticki", "fkk"].includes(t)) &&
    place.dressCode === "naturist"
  )
    score += 4;

  if (
    tokens.some((t) => ["optional", "clothing"].includes(t)) &&
    place.dressCode === "clothing-optional"
  )
    score += 3;

  if (tokens.some((t) => ["najbolji", "best", "top"].includes(t))) score += place.rating;

  return score;
}

export function answerQuery(query: string, locale: Locale): AssistantReply {
  const normalized = query.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
  const tokens = normalized.split(/[^a-z0-9čćžšđ]+/i).filter((t) => t.length > 2);

  const wantsPets = tokens.some((t) =>
    ["ljubimc", "pets", "pet", "pas", "dog", "kucne", "kućne", "dogs"].some((k) => t.includes(k)),
  );
  const wantsIstria = tokens.some((t) => ["istra", "istria", "istarski"].includes(t));
  const wantsCamp = tokens.some((t) => ["kamp", "camp", "camping"].includes(t));
  const wantsBeachNear = tokens.some((t) =>
    ["plaze", "plaza", "beach", "obal", "blizu"].some((k) => t.includes(k)),
  );

  const ranked = [...places]
    .map((p) => ({ p, s: scorePlace(p, tokens) }))
    .sort((a, b) => b.s - a.s || b.p.rating - a.p.rating);

  let matches = ranked.filter((r) => r.s > 0).slice(0, 3).map((r) => r.p);

  // Strong heuristic for the canonical demo question
  if (wantsIstria && wantsCamp && (wantsPets || wantsBeachNear)) {
    const preferred = places.filter(
      (p) => p.region === "istria" && (p.type === "camp" || p.type === "resort") && p.petsAllowed && p.nearBeach,
    );
    preferred.sort((a, b) => b.rating - a.rating);
    if (preferred.length) matches = preferred.slice(0, 3);
  }

  if (!matches.length) {
    matches = [...places].sort((a, b) => b.rating - a.rating).slice(0, 3);
  }

  const top = matches[0];
  const hr = locale === "hr";

  const names = matches.map((m) => (hr ? m.nameHr : m.name)).join(", ");

  const text = hr
    ? `Na temelju seed podataka, najbolji spojevi za tvoj upit su: **${names}**.\n\n` +
      `Preporuka #1: **${top.nameHr}** (${top.locationHr}) — ocjena ${top.rating}/5. ` +
      `${top.petsAllowed ? "Prima kućne ljubimce. " : "Kućni ljubimci nisu u fokusu. "}` +
      `${top.nearBeach ? "Ima izravan pristup plaži/obali. " : ""}` +
      `\n\n${top.shortDescriptionHr}`
    : `Based on seed data, the best matches for your query are: **${names}**.\n\n` +
      `Top pick: **${top.name}** (${top.location}) — rated ${top.rating}/5. ` +
      `${top.petsAllowed ? "Pets welcome. " : "Not pet-focused. "}` +
      `${top.nearBeach ? "Direct beach/shore access. " : ""}` +
      `\n\n${top.shortDescription}`;

  const itinerary = hr
    ? [
        `Dan 1: Dolazak u ${top.locationHr}, check-in i večernje kupanje na ${top.dressCode === "naturist" ? "naturističkoj" : "clothing-optional"} obali.`,
        `Dan 2: Jutarnje sunce + šetnja okolicom; rezerviraj stol u kampu/restoranu; kratki izlet u obližnji gradić.`,
        `Dan 3: Snorkanje / opuštanje; usporedi s ${matches[1] ? (matches[1].nameHr) : "drugim mjestom u regiji"} ako želiš raznolikost.`,
      ]
    : [
        `Day 1: Arrive in ${top.location}, check in and evening swim on the ${top.dressCode} shore.`,
        `Day 2: Morning sun + local walk; book a table on-site; short trip to the nearest old town.`,
        `Day 3: Snorkel / unwind; compare with ${matches[1] ? matches[1].name : "another regional spot"} for variety.`,
      ];

  const weatherTip = hr
    ? "Placeholder: U srpnju–kolovozu očekuj 28–34°C i maestral poslijepodne — ponesi laganu zaštitu od sunca i vodu. (Nije živa vremenska API veza.)"
    : "Placeholder: In July–August expect 28–34°C and afternoon maestral winds — pack light sun protection and water. (Not a live weather API.)";

  return { text, matches, itinerary, weatherTip };
}

export const exampleQueries = {
  hr: [
    "Najbolji naturistički kamp u Istri blizu plaže koji prima kućne ljubimce",
    "Clothing-optional plaža blizu Splita",
    "Mirni FKK kamp na Cresu ili Krku",
  ],
  en: [
    "Best naturist camp in Istria near the beach that allows pets",
    "Clothing-optional beach near Split",
    "Quiet FKK camp on Cres or Krk",
  ],
};
