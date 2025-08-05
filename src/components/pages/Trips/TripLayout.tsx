"use client";

import { useReducer } from "react";
import TripPlanner from "./TripPlanner";
import TripBudget from "./TripBudget";
import TripChecklist from "./TripChecklist";
import styles from "./TripLayout.module.scss";

type TabType = "planner" | "budget" | "checklist";

type Props = {
  trip: {
    id: string;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
  };
};

const tabList: { key: TabType; label: string }[] = [
  { key: "planner", label: "일정" },
  { key: "budget", label: "가계부" },
  { key: "checklist", label: "체크리스트" },
];

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

      {/* 콘텐츠 영역 */}
      <div className={styles.tabContent}>{tabComponents[tab]}</div>
    </div>
  );
}
