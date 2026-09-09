# Za Naturizam

TripAdvisor-style **AI tourist guide** for naturists and clothing-optional travelers in Croatia.

**Brand:** Za Naturizam · **Community layer:** Clean Community

## Features (MVP)

- Marketing landing with **Croatian primary** + English toggle
- Searchable / filterable **place directory** (Istria, Kvarner, Dalmatia)
- **Place detail** pages with guide, amenities, map link, official site, affiliate CTAs
- **AI Travel Assistant** chat UI — client-side stub over seed data (no LLM API)
- **Premium teaser** — offline maps + advanced filters (UI only)
- **Clean Community** — respect rules, placeholder feed / join CTA (no auth)
- **Contribute** (`/contribute`) — users can add beaches/camps (client-only)
- **Ratings** — 1–5 stars per place, stored in the browser
- **Featured / paid partner spotlight** — subscription partners sort to the top of the directory and appear on the homepage with sponsored offers (demo partners; no real payments)
- Monetization scaffolding via affiliate CTAs + partner offers per place

## Featured partners

Partners who pay a subscription get:

1. **Featured badge** on cards and detail pages  
2. **Top-of-directory** sorting (`featuredRank`, lower = higher)  
3. **Homepage “Istaknute ponude / Featured offers”** section with custom CTAs  

Demo partners in seed data: **Valalta** (rank 1), **Koversada** (rank 2), **Bunculuka** (rank 3). See `/partners` for the subscription UI mock (“Kontaktirajte nas” — no checkout).

## Images & credits

Place photos prefer **real location** imagery:

1. **Wikimedia Commons** photos of the named place (landscape / overview / coastline — **not** nude close-ups of people on listing cards). Credits include author + Commons + license hint (`imageCredit`).
2. Where no clear Commons photo of that exact site exists: a **static OpenStreetMap** map centered on lat/lng (`staticmap.openstreetmap.de`) **or** a Commons photo of that town/bay with an honest credit noting the bay/town.
3. Cards and detail pages show the credit; if an image fails to load, a **gradient fallback** is shown (`PlaceImage`).

Do not hotlink hotel gallery scrapes.

## User places & ratings (localStorage)

Until Supabase (or similar) is wired, browser storage is the source of truth for UGC:

| Key | Purpose |
| --- | --- |
| `zn-user-places` | Community-submitted places (typed `Place[]` with `userAdded: true`) |
| `zn-ratings` | `{ [placeId]: { sum, count, userRating? } }` |

- Submissions require **name + region + location + description** (light moderation; no auth).
- Merged client-side into `/places` via `PlacesDirectory`; detail for UGC is `/places/community/[id]`.
- Badge: **Zajednica / Community**.
- Ratings: show community average when `count > 0`, otherwise the seed editorial rating; users can change their own star rating in that browser.

**Note:** localStorage = **this browser only** until a backend sync lands.

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Seed data as typed TypeScript modules (`src/data/places.ts`)
- Simple HR/EN dictionaries (`src/lib/i18n.ts`)
- SEO metadata on core routes

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

## Seed coverage

~24 real Croatian FKK / clothing-optional places including Koversada, Valalta, Ulika, Solaris Poreč, Arena Kažela, Bunculuka, Baldarin, Glavotok, Kandarola, Straško, Metajna, Nugal, Kašjuni, Pakleni/Ždrilca, Baška Voda FKK, and more. Filters: region, type, dress code, pets, near beach. Sorting: featured partners first, then rating.

## AI assistant note

The assistant ranks seed places with heuristics (no external LLM). Try:

> Najbolji naturistički kamp u Istri blizu plaže koji prima kućne ljubimce

It returns matches, a mini itinerary, a weather tip placeholder, and booking CTAs.

## Out of scope (MVP)

Real scraping, live LLM, payments, auth, native apps, world coverage beyond Croatia seed.

## Next steps

- Wire a real LLM + retrieval over the place catalog
- Auth + Clean Community feed moderation
- **Supabase** (or similar) for shared user places + ratings across devices
- Live weather / maps SDKs
- Real partner billing for featured subscriptions
- Affiliate network IDs and conversion tracking
- Expand seed data beyond Croatia

## License

Private / all rights reserved unless otherwise stated by the repo owner.
