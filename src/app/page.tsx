import { createClientForServer } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { MESSAGES } from "@/constants/messages";
import TripCardList from "@/components/pages/Home/TripCardList";
import Footer from "@/components/layout/Footer/Footer";
import styles from "./page.module.scss";

export default async function Home() {
  const supabase = await createClientForServer();

  // 🔐 사용자 인증 정보 가져오기
  const authResult = await supabase.auth.getUser();
  const user = authResult.data.user;

  if (!user) {
    throw new Error(MESSAGES.error.USER_NOT_FOUND); // 메시지 상수화
  }

  // 🌐 여행 데이터 API 호출
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`,
    {
      headers: {
        Cookie: cookies().toString(),
      },
      cache: "no-store",
    }
  );

  // ❗️API 호출 실패 처리
  if (!response.ok) {
    return <div>{MESSAGES.error.FAILED_TO_FETCH_TRIPS}</div>; // 메시지 상수화
  }

  const { trips } = await response.json();

  // 📦 페이지 렌더링
  return (
    <div className={styles.pageWrapper}>
      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        <TripCardList tripList={trips} />
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}
