import { createClient } from "@/lib/supabase/client";

export interface PlacePhotoRow {
  id: string;
  user_id: string;
  place_key: string;
  image_url: string;
  caption: string | null;
  credit: string | null;
  status: string;
  created_at: string;
}

export async function fetchApprovedPhotos(placeKey: string): Promise<PlacePhotoRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("place_photo_submissions")
    .select("id, user_id, place_key, image_url, caption, credit, status, created_at")
    .eq("place_key", placeKey)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as PlacePhotoRow[];
}

export function isHttpsUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function submitPlacePhoto(input: {
  placeKey: string;
  userId: string;
  imageUrl: string;
  caption?: string;
  credit?: string;
}) {
  const imageUrl = input.imageUrl.trim();
  if (!isHttpsUrl(imageUrl)) {
    return { error: { message: "https_required" } as Error };
  }
  const supabase = createClient();
  const { error } = await supabase.from("place_photo_submissions").insert({
    user_id: input.userId,
    place_key: input.placeKey,
    image_url: imageUrl,
    caption: input.caption?.trim() || null,
    credit: input.credit?.trim() || null,
    status: "pending",
  });
  return { error };
}
