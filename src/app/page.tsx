import { signOut } from "@/utils/supabase/actions";
import { createClientForServer } from "@/utils/supabase/server";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function Home() {
  const supabase = await createClientForServer();

  const session = await supabase.auth.getUser();

  const user = session.data.user!;
  if (!user) throw new Error("Unexpected: user not found");
  const { user_metadata, app_metadata } = user;

  const { email } = user_metadata;

  const Email = email ? `${email}` : "email Not Set";

  console.log(session);
  return (
    <div className={styles.pageWrapper}>
      {/* 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.logo}>TripPick</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className={styles.mainContent}>
        <p className={styles.welcomeMsg}>
          환영합니다 <b>{Email}</b> 님!
        </p>

        <form action={signOut}>
          <button className={styles.logoutBtn} type="submit">
            로그아웃
          </button>
        </form>
      </main>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <span>© 2025 TripPick. All rights reserved.</span>
      </footer>
    </div>
  );
}
