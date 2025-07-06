// app/api/upload-profile/route.ts
import { NextResponse } from "next/server";
import { createClientForServer } from "@/utils/supabase/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  const supabase = await createClientForServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !file) {
    return NextResponse.json(
      { error: "인증 실패 또는 파일 없음" },
      { status: 400 }
    );
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `profile-images/${fileName}`;

  // 1. 이미지 업로드
  const { error: uploadError } = await supabase.storage
    .from("userprofileimages")
    .upload(filePath, file);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // 2. Public URL 생성
  const {
    data: { publicUrl },
  } = supabase.storage.from("userprofileimages").getPublicUrl(filePath);

  // 3. 유저 테이블 업데이트
  const { error: updateError } = await supabase
    .from("users")
    .update({ profile_image_url: publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ publicUrl }, { status: 200 });
}
