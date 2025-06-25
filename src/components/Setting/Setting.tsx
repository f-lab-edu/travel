"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./Setting.module.scss";

export default function UserSetting({
  email,
  profile_url,
  name,
}: {
  email: string;
  profile_url?: string;
  name?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profileUrl, setprofileUrl] = useState(profile_url || "");

  // 이미지 업로드 핸들러
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-profile", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      alert("업로드 실패");
      return;
    }

    const { publicUrl } = await res.json();
    console.log("변경된 이미지 URL:", publicUrl);
    setprofileUrl(publicUrl);
  };

  return (
    <div className={styles.settingWrapper}>
      <section className={styles.profileSection}>
        <img
          src={profileUrl || "https://via.placeholder.com/120?text=No+Image"}
          alt="유저 프로필"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <p className={styles.userName}>{name}</p>
          <p className={styles.userEmail}>{email}</p>
        </div>
        {/* 숨겨진 파일 선택 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />

        <button
          className={styles.changeAvatarBtn}
          onClick={() => {
            const ok = window.confirm("정말 프로필 이미지를 변경하시겠어요?");
            if (ok) {
              fileInputRef.current?.click();
            }
          }}
        >
          프로필 이미지 변경
        </button>
      </section>
    </div>
  );
}
