// src/app/(pages)/trips/[id]/page.tsx
import { createClientForServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import TripLayout from "@/components/pages/Trips/TripLayout";

type Params = {
  params: { id: string };
};

export default async function TripDetailPage({ params }: Params) {
  const supabase = await createClientForServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return notFound();

  const { data: trip, error } = await supabase
    .from("travel_plans")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!trip || error) return notFound();

  // TripLayout은 내부에서 "일정 | 가계부" 탭을 렌더링함
  return <TripLayout trip={trip} />;
}
