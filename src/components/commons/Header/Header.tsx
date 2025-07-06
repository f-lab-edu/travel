"use client";

import { useState, MouseEvent } from "react";
import styles from "./Header.module.scss";
import { useRouter } from "next/navigation";
import {
  IconHamburger,
  IconClose,
  IconPlus,
  IconSetting,
  IconLogOut,
} from "@/components/commons/icons/icons";
import Link from "next/link";

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleMenuClick = () => {
    closeDrawer();
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.logo} onClick={handleLogoClick}>
          TripPick
        </h1>

        <button
          className={styles.iconButton}
          aria-label="메뉴 열기"
          onClick={openDrawer}
        >
          <IconHamburger width={24} height={24} />
        </button>
      </header>

      <div
        className={`${styles.drawer} ${isDrawerOpen ? styles.open : ""}`}
        onClick={closeDrawer}
      >
        <div className={styles.drawerContent} onClick={stopPropagation}>
          <button className={styles.closeButton} onClick={closeDrawer}>
            <IconClose width={24} height={24} />
          </button>
          <nav>
            <ul className={styles.menuList}>
              <li>
                <Link href="/new-trip" onClick={handleMenuClick}>
                  <IconPlus width={20} height={20} />
                  <span className={styles.menuText}>새로운 여행 추가</span>
                </Link>
              </li>
              <li>
                <Link href="/setting" onClick={handleMenuClick}>
                  <IconSetting width={20} height={20} />
                  <span className={styles.menuText}>설정</span>
                </Link>
              </li>
              <li>
                <Link href="/logout" onClick={handleMenuClick}>
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
