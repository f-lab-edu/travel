"use client";

import { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import styles from "./TripPlanner.module.scss";
import DateTabs from "@/components/ui/Tab/DateTabs";
import SectionCard from "@/components/ui/SectionCard";

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

export default function TripPlanner({ trip }: Props) {
  const start = new Date(trip.start_date);
  const end = new Date(trip.end_date);
  const allDates = eachDayOfInterval({ start, end });

  const [selectedDate, setSelectedDate] = useState<Date | "ALL">("ALL");

  return (
    <div className={styles.planner}>
      <h2 className={styles.heading}>📅 날짜별 일정 만들기</h2>

      {/* 날짜 탭 */}
      <DateTabs
        allDates={allDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      <div>
        {/* TODO : 일정 데이터 추가 되면 데이터 유무에 따라서 UI 변경해줘야함 */}
        {selectedDate === "ALL" ? (
          allDates.map((date) => (
            <SectionCard
              title={`${format(date, "MM월 dd일")} 일정`}
              content="이 날의 일정을 추가해보세요!"
            />
          ))
        ) : (
          <SectionCard
            title={`${format(selectedDate, "MM월 dd일")} 일정`}
            content="이 날의 일정을 추가해보세요!"
          />
        )}
      </div>
    </div>
  );
}
