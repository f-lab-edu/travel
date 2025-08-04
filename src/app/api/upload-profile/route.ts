// 📁 app/api/upload-profile/route.ts

import { NextResponse } from "next/server";
import { createClientForServer } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";
import { MESSAGES } from "@/constants/messages";
import { ERROR_CODES } from "@/constants/errorCodes";

// ✨ 공통 응답 헬퍼
const jsonResponse = (data: any, status: number) =>
  NextResponse.json(data, { status });

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const supabase = await createClientForServer();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // 🔐 인증 & 파일 존재 여부 확인
  if (authError || !user || !file) {
    return jsonResponse(
      {
        error: MESSAGES.storage.error.UNAUTHORIZED_OR_NO_FILE,
        code: ERROR_CODES.UNAUTHORIZED,
      },
      400
    );
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `profile-images/${fileName}`;

  // 📤 1. Supabase 스토리지에 이미지 업로드
  const { error: uploadError } = await supabase.storage
    .from("userprofileimages")
    .upload(filePath, file);

  if (uploadError) {
    return jsonResponse(
      {
        error: `${MESSAGES.profile.error.UPLOAD_FAILED}: ${uploadError.message}`,
        code: ERROR_CODES.UPLOAD_FAILED,
      },
      500
    );
  }

  // 🌐 2. public URL 획득
  const {
    data: { publicUrl },
  } = supabase.storage.from("userprofileimages").getPublicUrl(filePath);

  // 🛠 3. DB에 프로필 이미지 URL 업데이트
  const { error: updateError } = await supabase
    .from("users")
    .update({ profile_image_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return jsonResponse(
      {
        error: `${MESSAGES.profile.error.UPDATE_FAILED}: ${updateError.message}`,
        code: ERROR_CODES.DATABASE_ERROR,
      },
      500
    );
  }

  return jsonResponse({ publicUrl }, 200);
}
