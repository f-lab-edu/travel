"use client";

import { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import styles from "./TripPlanner.module.scss";
import DateTabs from "@/components/commons/Tab/DateTabs";
import SectionCard from "@/components/commons/SectionCard";

type Trip = {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
};

type Props = {
  trip: Trip;
};

export default function TripBudget({ trip }: Props) {
  const start = new Date(trip.start_date);
  const end = new Date(trip.end_date);
  const allDates = eachDayOfInterval({ start, end });

  const [selectedDate, setSelectedDate] = useState<Date | "ALL">("ALL");

  return (
    <div className={styles.planner}>
      <h2 className={styles.heading}>📅 날짜별 가계부 작성하기</h2>

      {/* 날짜 탭 */}
      <DateTabs
        allDates={allDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div className={styles.scheduleBox}>
        {selectedDate === "ALL" ? (
          allDates.map((date) => (
            <SectionCard
              title={`${format(date, "MM월 dd일")} 가계부`}
              content="이 날의 지출을 기록해보세요!"
            />
          ))
        ) : (
          <SectionCard
            title={`${format(selectedDate, "MM월 dd일")} 가계부`}
            content="이 날의 지출을 기록해보세요!"
          />
        )}
      </div>
    </div>
  );
}
