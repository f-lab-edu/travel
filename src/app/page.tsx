import { signOut } from "@/utils/supabase/actions";
import { createClientForServer } from "@/utils/supabase/server";
import Link from "next/link";
import styles from "./page.module.scss";
import TripCardList from "@/components/pages/Home/TripCardList";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = await createClientForServer();

  const session = await supabase.auth.getUser();

  const user = session.data.user!;
  if (!user) throw new Error("Unexpected: user not found");

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/trips`, {
    headers: {
      Cookie: cookies().toString(),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>여행 데이터를 불러오는 데 문제가 발생했어요</div>;
  }
  const { trips } = await res.json();

  return (
    <div className={styles.pageWrapper}>
      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        {/* 여행 목록 */}
        <TripCardList trips={trips} />
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <span>© 2025 TripPick. All rights reserved.</span>
      </footer>
    </div>
  );
}
