/** Free OSM static map centered on lat/lng (openstreetmap.de style). */
export function osmStaticMapUrl(lat: number, lng: number, zoom = 14): string {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=${zoom}&size=800x450&maptype=mapnik`;
}

export function osmMapCredit(label: string): string {
  return `Map: OpenStreetMap contributors — staticmap.openstreetmap.de — ${label}`;
}
