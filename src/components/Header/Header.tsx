// components/Header/Header.tsx
"use client";

import { useState } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import {
  IconHamburger,
  IconClose,
  IconPlus,
  IconSetting,
  IconLogOut,
} from "@/app/icons/icons";
import Link from "next/link";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo} onClick={() => router.push("/")}>
          TripPick
        </h1>

        <button
          className={styles.iconButton}
          aria-label="메뉴 열기"
          onClick={() => setIsDrawerOpen(true)}
        >
          <IconHamburger width={24} height={24} />
        </button>
      </header>

      {/* 드로어 */}
      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
        onClick={() => setIsDrawerOpen(false)} // 배경 누르면 닫힘
      >
        <div
          className={styles.drawerContent}
          onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫히지 않게
        >
          <button
            className={styles.closeButton}
            onClick={() => setIsDrawerOpen(false)}
          >
            <IconClose width={24} height={24} />
          </button>
          <nav>
            <ul className={styles.menuList}>
              <li>
                <Link href="" onClick={() => setIsDrawerOpen(false)}>
                  <IconPlus width={20} height={20} />
                  <span className={styles.menuText}>새로운 여행 추가</span>
                </Link>
              </li>
              <li>
                <Link href="/setting" onClick={() => setIsDrawerOpen(false)}>
                  <IconSetting width={20} height={20} />
                  <span className={styles.menuText}>설정</span>
                </Link>
              </li>
              <li>
                <Link href="" onClick={() => setIsDrawerOpen(false)}>
                  <IconLogOut width={20} height={20} />
                  <span className={styles.menuText}>로그아웃</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
