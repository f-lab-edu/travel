// 서버에서만 실행되는 서버 컴포넌트, 서버 작업 및 라우트 핸들러에서 supabase에 엑세스 함.
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
// 쿠키 객체를 통해 supabase 클라이언트는 쿠키에 엑세스하는 방법을 알 수 있어 -> 사용자 세션 데이터를 읽고 쓸수 있음.

export async function createClientForServer() {
  const cookieStore = await cookies();
  // cookieStore는 매 요청마다 다름 (사용자의 세션을 안전하게 다루기 위함?)
  // createServerClient를 요청마다 새로 호출 (서버는 싱글톤 쓰면 안되서)
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
