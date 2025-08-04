"use client";

import { useState } from "react";
import TripPlanner from "./TripPlanner";
import TripBudget from "./TripBudget";
import TripChecklist from "./TripChecklist";
import styles from "./TripLayout.module.scss"; // 스타일 분리 추천

type Props = {
  trip: {
    id: string;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
  };
};

export default function TripLayout({ trip }: Props) {
  const [tab, setTab] = useState<"planner" | "budget" | "checklist">("planner");

  return (
    <div className={styles.wrapper}>
      {/* 탭 버튼 */}
      <div className={styles.tabButtons}>
        <button
          className={tab === "planner" ? styles.active : ""}
          onClick={() => setTab("planner")}
        >
          일정
        </button>
        <button
          className={tab === "budget" ? styles.active : ""}
          onClick={() => setTab("budget")}
        >
          가계부
        </button>
        <button
          className={tab === "checklist" ? styles.active : ""}
          onClick={() => setTab("checklist")}
        >
          체크리스트
        </button>
      </div>

      {/* 콘텐츠 영역 */}
      <div className={styles.tabContent}>
        {tab === "planner" && <TripPlanner trip={trip} />}
        {tab === "budget" && <TripBudget trip={trip} />}
        {tab === "checklist" && <TripChecklist trip={trip} />}
      </div>
    </div>
  );
}
