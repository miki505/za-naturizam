import { createClient } from "@/lib/supabase/client";

export interface PlaceCommentRow {
  id: string;
  user_id: string;
  place_key: string;
  body: string;
  status: string;
  created_at: string;
}

const MIN_LEN = 3;
const MAX_LEN = 2000;

export function validateCommentBody(body: string): string | null {
  const t = body.trim();
  if (t.length < MIN_LEN || t.length > MAX_LEN) return "length";
  return null;
}

export async function fetchApprovedComments(placeKey: string): Promise<PlaceCommentRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("place_comment_submissions")
    .select("id, user_id, place_key, body, status, created_at")
    .eq("place_key", placeKey)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data as PlaceCommentRow[];
}

export async function submitPlaceComment(input: {
  placeKey: string;
  userId: string;
  body: string;
}) {
  const body = input.body.trim();
  if (validateCommentBody(body)) {
    return { error: { message: "length" } as Error };
  }
  const supabase = createClient();
  const { error } = await supabase.from("place_comment_submissions").insert({
    user_id: input.userId,
    place_key: input.placeKey,
    body,
    status: "pending",
  });
  return { error };
}
