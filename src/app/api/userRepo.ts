// lib/userRepo.ts
import { createClientForServer } from "@/utils/supabase/server";

export async function findUserById(id: string) {
  const supabase = await createClientForServer();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows returned (safe to return null)
    console.error("❗ Supabase error:", error);
    throw error;
  }
  return data ?? null;
}
