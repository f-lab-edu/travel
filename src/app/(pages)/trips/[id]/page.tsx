import { createClientForServer } from "@/utils/supabase/server";
import { notFound } from "next/navigation";

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

  return (
    <div>
      <h1>ttttt{trip.title}</h1>
      <p>{trip.destination}</p>
      <p>
        {trip.start_date} ~ {trip.end_date}
      </p>

      {/* 여기에 여행 계획 작성 UI가 추가될 예정 */}
    </div>
  );
}
