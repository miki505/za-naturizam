# Location & image credibility audit

**Date:** 2026-09-09 (Europe/Zagreb)  
**Source of truth for coords:** Nominatim / OpenStreetMap camp_site & beach features, official camp GPS where published (Valalta, Solaris Poreč, Rapoća), BeachAtlas for Kava.  
**Photos:** Left as updated in `c7c966d` (Commons/OSM imagery). No image URL reverts; mismatches flagged only.

| slug | coords_ok | image_ok | notes | action_taken |
|------|-----------|----------|-------|--------------|
| koversada | yes | yes | Was ~1.4 km N toward Vrsar town; OSM Naturist Park Koversada way/87724191. Photo is Koversada peninsula. | Fixed lat/lng → 45.1363, 13.6076 |
| valalta | yes | yes | Lng was ~1 km W of camp; OSM + official Valalta GPS (~45°7′23″N, 13°37′43″E). Photo Valalta overview OK. | Fixed lat/lng → 45.1227, 13.6308 |
| ulika | yes | partial | Was ~1.2 km S of camp; OSM Camping Ulika way/125452901. Image is Plava Laguna / Lanterna riviera (credit already says near Ulika). | Fixed coords → 45.2575, 13.5798; photo kept |
| kamenjak | yes | yes | Pin was W of cape tip; OSM Rt Kamenjak. Photo Cape Kamenjak OK. | Fixed → 44.7679, 13.9237 |
| bunculuka | yes | partial | Was ~1.2 km toward Baška town beach; OSM Naturist Camp Bunculuka way/24872316. Image is Baška main beach, not camp cove. | Fixed coords → 44.9699, 14.7699; photo kept |
| glavotok | yes | yes | Was ~5 km S of camp (wrong). OSM Camping Glavotok way/66835497. Monastery photo is on-site area. | Fixed → 45.0946, 14.4414 |
| konobe | yes | yes | Minor offset; OSM Naturist Camping Konobe way/36098778. Photo Uvala Konobe from sea OK. | Fixed → 44.9928, 14.6276 |
| baldarin | yes | partial | Was ~11 km W (open water / wrong). OSM Camping Baldarin relation/9353892 at Punta Križa. Image is generic Cres coast. | Fixed → 44.6120, 14.5158; photo kept |
| kandarola | yes | yes | Was ~2.4 km N; OSM FKK Kandarola beach node/851164611. Sahara Beach photo OK. | Fixed → 44.7603, 14.7339 |
| strasko | yes | yes | Was ~1.2 km inland/NE of beach; OSM Straško beach way/38630996. Photo Straško beach OK. | Fixed → 44.5389, 14.8822 |
| nugal | yes | yes | Sub-km tune to OSM beach way/30416234. Photo Nugal OK. | Fixed → 43.2793, 17.0338 |
| kasjuni | yes | yes | Was ~1.9 km SW of beach; OSM Kašjuni way/84529150. Photo Kašjuni OK. | Fixed → 43.5064, 16.4005 |
| sovlje | yes | no | Was ~4.7 km E (Prvić/Vodice side). Hamlets/beach bars at Sovlje, Tribunj. Image is Tribunj town/bay, not Sovlje cove. | Fixed → 43.7633, 15.7295; photo kept |
| solaris-beach | yes | partial | Tuned to Solaris / Zablaće OSM stop (~resort zone). Image generic Šibenik coast. | Fixed → 43.6975, 15.8830; photo kept |
| mon-perin | yes | yes | Was ~2.5 km N of San Polo FKK area; OSM Mon Perin – Area San Polo way/169964005. Static OSM map retargeted. | Fixed → 45.0178, 13.7137 + osmStaticMapUrl |
| pula-hidrobaza | yes | no | Was ~6 km SE (Stoja/Lungomare). Hidrobaza ruins / Štinjan shore OSM way/1144910226. Image is Punta Verudela (wrong bay; credit said “near”). | Fixed → 44.9007, 13.8117; photo kept |
| solaris-porec | yes | no | **Was Poreč town center** (~7 km S of camp). OSM Solaris camp_site way/60979980; Valamar GPS 45.291078, 13.584633. Image Poreč old town. | Fixed → 45.2882, 13.5860; photo kept |
| kazela | yes | yes | Was ~1.8 km W of camp; OSM Kažela way/345295624. Medulin Kažela shoreline photo OK. | Fixed → 44.8063, 13.9574 |
| pakleni-zdrilca | yes | partial | Tuned to OSM Ždrilca beach. Image is Hvar town + Pakleni overview, not Zdrilca cove itself. | Fixed → 43.1571, 16.4166; photo kept |
| baska-voda-fkk | yes | partial | Current pin matches Baška Voda waterfront (~town beach). FKK pocket is informal; no separate OSM FKK node. Main-beach photo is textile promenade. | No coord change; photo kept |
| metajna | yes | yes | Was ~3.5 km W (Zubovići area). OSM Metajna admin 44.5069, 15.0104. Overview photo Metajna OK. | Fixed → 44.5069, 15.0104 |
| kava | yes | partial | Was ~6 km E of Čiovo Kava (Okrug Donji). BeachAtlas 43.4922, 16.2077. Image generic Trogir coastline. | Fixed → 43.4922, 16.2077; photo kept |
| rapoca | yes | no | **Identity mismatch:** listing was Lopar/Rab but official Camping Rapoća is Nerezine, Lošinj (OSM camp_site). Photo is Lopar San Marino. Copy/affiliate still mention Rab/Lopar. | Fixed coords → 44.6634, 14.3984; location → Nerezine, Lošinj; photo kept |
| stara-baska | yes | yes | Tuned to village/admin centroid OSM relation. Aerial Stara Baška photo OK. | Fixed → 44.9580, 14.6885 |

## Summary

- **Coords fixed:** 23 / 24 places (only `baska-voda-fkk` left unchanged).
- **Images:** none reverted (post–`c7c966d` Commons set preserved). Flagged **image_ok=no** or **partial** where credit/photo shows a different bay/town than the pin.
- **Follow-ups:** replace mismatched Commons for `sovlje`, `pula-hidrobaza`, `solaris-porec`, `rapoca`; rewrite `rapoca` EN/HR blurbs + affiliate query away from Rab; optional Ulika/Bunculuka/Baldarin closer photos.

## Method

1. Nominatim search with User-Agent `za-naturizam-credibility-audit/1.0`.
2. Cross-check Overpass / Photon for camps tagged `tourism=camp_site` and named beaches.
3. Official published GPS for Valalta, Solaris Poreč (Valamar), Rapoća Camping Village.
