"use client";

import { useReducer } from "react";
import TripPlanner from "./Planner/TripPlanner";
import TripBudget from "./Budget/TripBudget";
import TripChecklist from "./Checklist/TripChecklist";
import styles from "./TripLayout.module.scss";

// 탭의 타입 정의
type TabType = "planner" | "budget" | "checklist";
// 컴포넌트에 전달되는 여행 정보 타입
type Props = {
  trip: {
    id: string;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
  };
};
// 탭 목록과 라벨 정의
const tabList: { key: TabType; label: string }[] = [
  { key: "planner", label: "일정" },
  { key: "budget", label: "가계부" },
  { key: "checklist", label: "체크리스트" },
];

/**
 * TripLayout 컴포넌트
 * - 일정/가계부/체크리스트 탭 전환 UI
 * - 여행 데이터를 하위 탭 컴포넌트로 전달
 */
export default function TripLayout({ trip }: Props) {
  const [tab, dispatchTab] = useReducer((_, next: TabType) => next, "planner");

  const tabComponents: Record<TabType, React.JSX.Element> = {
    planner: <TripPlanner trip={trip} />,
    budget: <TripBudget trip={trip} />,
    checklist: <TripChecklist trip={trip} />,
  };

  return (
    <div className={styles.wrapper}>
      {/* 탭 버튼 */}
      <div className={styles.tabButtons}>
        {tabList.map(({ key, label }) => (
          <button
            key={key}
            className={tab === key ? styles.active : ""}
            onClick={() => dispatchTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 선택된 탭에 해당하는 콘텐츠 렌더링 */}
      <div className={styles.tabContent}>{tabComponents[tab]}</div>
    </div>
  );
}
