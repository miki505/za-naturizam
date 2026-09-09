# Za Naturizam

TripAdvisor-style **AI tourist guide** for naturists and clothing-optional travelers in Croatia.

**Brand:** Za Naturizam · **Community layer:** Clean Community

## Features (MVP)

- Marketing landing with **Croatian primary** + English toggle
- Searchable / filterable **place directory** (Istria, Kvarner, Dalmatia seed data)
- **Place detail** pages with guide, amenities, map link, affiliate Book/Reserve placeholders
- **AI Travel Assistant** chat UI — client-side stub over seed data (no LLM API)
- **Premium teaser** — offline maps + advanced filters (UI only)
- **Clean Community** — respect rules, placeholder feed / join CTA (no auth)
- Monetization scaffolding via affiliate CTAs per place

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

~16 real Croatian places including Koversada, Valalta, Ulika, Bunculuka, Baldarin, Kandarola, Nugal, Kašjuni, and more. Filters: region, type, dress code, pets, near beach.

## AI assistant note

The assistant ranks seed places with heuristics (no external LLM). Try:

> Najbolji naturistički kamp u Istri blizu plaže koji prima kućne ljubimce

It returns matches, a mini itinerary, a weather tip placeholder, and booking CTAs.

## Out of scope (MVP)

Real scraping, live LLM, payments, auth, native apps, world coverage beyond Croatia seed.

## Next steps

- Wire a real LLM + retrieval over the place catalog
- Auth + Clean Community feed moderation
- Live weather / maps SDKs
- Affiliate network IDs and conversion tracking
- Expand seed data beyond Croatia

## License

Private / all rights reserved unless otherwise stated by the repo owner.
