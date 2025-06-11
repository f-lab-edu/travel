import { type NextRequest } from "next/server";
// update session은 인증 로직에만 집중 하도록 파일 분리
// framwork가 요구하는 entrypoint는 루트에 두기 위함. 각 역할 분리하기 위함.
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
// 이 미들웨어가 어떤 URL에 적용될지 "패턴"으로 지정하는 설정
// 정적 파일, 이미지 최적화 라우트, 파비콘 , 각 이미지 파일 형식으로 끝나는 경로들은 미들웨어 무시하도록
// -> 일반 페이지 라우트에는 미들웨어가 걸리지만 위 경우에는 미들웨어가 안걸림
// 불필요한 인증 로직이 이미지 요청마다 다 동작해서 성능 하락
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
