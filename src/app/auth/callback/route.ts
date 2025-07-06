import { NextRequest, NextResponse } from "next/server";
import { createClientForServer } from "@/utils/supabase/server";
import { findUserById } from "../../api/userRepo";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return redirectToError(origin);
  }

  const supabase = await createClientForServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return redirectToError(origin);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToError(origin);
  }

  await ensureUserExists(supabase, user);
  return redirectToNext(request, origin, next);
}

// ==========================================
// 유저 등록 함수 분리
async function ensureUserExists(supabase: any, user: any) {
  const { id, user_metadata, email, app_metadata } = user;
  const userData = await findUserById(id);
  console.log("👤 유저 테이블에 존재하는가?", userData);

  if (!userData) {
    await supabase.from("users").insert({
      id,
      email,
      nickname: email?.split("@")[0],
      name: user_metadata.full_name ?? "",
      profile_image_url: user_metadata.avatar_url ?? "",
      provider: app_metadata.provider ?? "google",
    });
    console.log("✅ 유저 새로 등록됨");
  } else {
    console.log("🔄 이미 등록된 유저");
  }
}

// ==========================================
// 리디렉션 처리 함수 분리
function redirectToNext(request: NextRequest, origin: string, next: string) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}

function redirectToError(origin: string) {
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
