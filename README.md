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
- **Contribute** (`/contribute`) — logged-in users submit places for admin review
- **Ratings** — 1–5 stars pending admin approval; public stats from Supabase
- **Auth + Admin** — Supabase Auth; `/admin` moderation for admins
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

## Auth, contributions & moderation (Supabase)

Supabase project powers shared auth + moderated UGC.

### Env

Copy `.env.example` → `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Do **not** commit `.env.local`.

### Auth

- Routes: `/login` (email+password sign-in/sign-up + magic link), `/auth/callback`
- Header shows **Prijava / Log in** or email + **Odjava / Log out**
- Packages: `@supabase/supabase-js`, `@supabase/ssr` (browser + server clients under `src/lib/supabase/`)

### Contribute (`/contribute`)

- Requires login
- Inserts into `place_submissions` with `status = pending`
- New submits no longer write to localStorage (legacy local places may still display if present)

### Ratings

- Requires login; upserts `rating_submissions` as `pending`
- Public averages come only from `place_rating_stats` (approved)
- UI message: **Čeka odobrenje admina** / Waiting for admin approval

### Admin (`/admin`)

- Visible/usable only when `profiles.role === 'admin'`
- Middleware redirects unauthenticated users away from `/admin`
- Approve place → `status=approved`, insert `community_places` (slugified name), set `published_slug`
- Approve rating → `status=approved`, then RPC `recompute_place_rating_stats(p_place_key)`
- Reject → `status=rejected`

### Become an admin (SQL)

In the Supabase SQL editor (after the user has signed up once so `handle_new_user` created their profile):

```sql
update public.profiles
set role = 'admin'
where email = 'you@example.com';
-- or: where id = '<auth.users uuid>';
```

### Directory merge

`PlacesDirectory` client-fetches `community_places` and merges them with seed places (and any legacy localStorage UGC).

## Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase Auth + Postgres (RLS) for profiles, submissions, community places, ratings
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

Real scraping, live LLM, payments, native apps, world coverage beyond Croatia seed.

## Next steps

- Wire a real LLM + retrieval over the place catalog
- Clean Community feed UI on top of moderated content
- Live weather / maps SDKs
- Real partner billing for featured subscriptions
- Affiliate network IDs and conversion tracking
- Expand seed data beyond Croatia

## License

Private / all rights reserved unless otherwise stated by the repo owner.
