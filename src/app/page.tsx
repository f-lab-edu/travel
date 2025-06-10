// app/page.tsx
"use client";

import styles from "./page.module.scss";
// import AuthForm from "@/app/components/Forms/AuthForm";
// import { createClientForServer } from "@/utils/supabase/server";

export default function Home() {
  // const supabase = await createClientForServer();

  // const session = await supabase.auth.getUser();

  // console.log(session);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>TripPick</h1>
        <p className={styles.subtitle}>
          나만의 여행 일정을 쉽고 빠르게 계획해 보세요.
        </p>
        {/* <AuthForm /> */}
      </div>
    </div>
  );
}
