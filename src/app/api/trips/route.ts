// POST (Create) , GET (Read travel List)
// src/app/api/trips/route.ts
import { createClientForServer } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClientForServer();

  // 유저 세션 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { title, countryCode, startDate, endDate } = body;

  if (!title || !countryCode || !startDate || !endDate) {
    return NextResponse.json(
      { error: "필수 항목이 누락되었습니다." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.from("travel_plans").insert([
    {
      title,
      destination: countryCode,
      start_date: startDate,
      end_date: endDate,
      user_id: user.id,
    },
  ]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    { message: "여행이 생성되었습니다." },
    { status: 201 }
  );
}

export async function GET() {
  const supabase = await createClientForServer();
  // 유저 세션 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json(
      { error: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  const { data, error } = await supabase
    .from("travel_plans")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ trips: data }, { status: 200 });
}
