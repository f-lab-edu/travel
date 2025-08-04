// 📁 src/app/api/trips/route.ts

import { createClientForServer } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { ERROR_CODES } from "@/constants/errorCodes";
import { MESSAGES } from "@/constants/messages";

// 공통 응답 함수
const jsonResponse = (data: any, status: number) =>
  NextResponse.json(data, { status });

// 여행 생성 (POST)
export async function POST(req: Request) {
  const supabase = await createClientForServer();

  // 유저 인증 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return jsonResponse(
      {
        error: MESSAGES.auth.error.UNAUTHORIZED,
        code: ERROR_CODES.UNAUTHORIZED,
      },
      401
    );
  }

  const body = await req.json();
  const { title, countryCode, startDate, endDate } = body;

  // 필수값 누락 체크
  if (!title || !countryCode || !startDate || !endDate) {
    return jsonResponse(
      {
        error: MESSAGES.form.error.VALIDATION_FAILED,
        code: ERROR_CODES.VALIDATION_FAILED,
      },
      400
    );
  }

  // 여행 데이터 삽입
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
    return jsonResponse(
      {
        error: `${MESSAGES.common.error.DATABASE_ERROR}: ${error.message}`,
        code: ERROR_CODES.DATABASE_ERROR,
      },
      500
    );
  }

  return jsonResponse({ message: MESSAGES.trip.success.CREATE }, 201);
}

// 여행 목록 조회 (GET)
export async function GET() {
  const supabase = await createClientForServer();

  // 유저 인증 확인
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return jsonResponse(
      {
        error: MESSAGES.auth.error.UNAUTHORIZED,
        code: ERROR_CODES.UNAUTHORIZED,
      },
      401
    );
  }

  // 여행 목록 조회
  const { data, error } = await supabase
    .from("travel_plans")
    .select("*")
    .eq("user_id", user.id)
    .order("start_date", { ascending: true });

  if (error) {
    return jsonResponse(
      {
        error: `${MESSAGES.common.error.DATABASE_ERROR}: ${error.message}`,
        code: ERROR_CODES.DATABASE_ERROR,
      },
      500
    );
  }

  return jsonResponse({ trips: data }, 200);
}
