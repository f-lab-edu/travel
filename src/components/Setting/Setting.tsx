"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; // 클라이언트용 Supabase 인스턴스
import styles from "./Setting.module.scss";

export default function UserSetting() {
  const [userInfo, setUserInfo] = useState<{
    email: string;
    avatar_url?: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      console.log("======data======", data);
      if (data.user) {
        const { user_metadata, email } = data.user;
        setUserInfo({
          email: email || "",
          avatar_url: user_metadata?.avatar_url || "", // 없으면 빈 값
          name: user_metadata?.name || "이름 없음",
        });
      }
    }

    fetchUser();
  }, []);

  if (!userInfo) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div className={styles.settingWrapper}>
      <section className={styles.profileSection}>
        <img
          src={
            userInfo.avatar_url ||
            "https://via.placeholder.com/120?text=No+Image"
          }
          alt="유저 프로필"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userInfo.name}</p>
          <p className={styles.userEmail}>{userInfo.email}</p>
        </div>
      </section>
    </div>
  );
}
