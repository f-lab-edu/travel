"use client";

import { useState } from "react";
import { format, eachDayOfInterval } from "date-fns";
import styles from "./TripPlanner.module.scss";
import DateTabs from "@/components/ui/Tab/DateTabs";
import SectionCard from "@/components/ui/SectionCard";
import { MESSAGES } from "@/constants/messages";

// 여행 상세 정보 타입
type TripProps = {
  trip: {
    id: string;
    title: string;
    destination: string;
    start_date: string;
    end_date: string;
  };
};

// 날짜 탭에서 사용할 선택된 날짜 타입
type SelectedDate = Date | "ALL";

/**
 * 여행 시작일부터 종료일까지의 모든 날짜 리스트를 반환
 */
function getAllTripDates(start: string, end: string): Date[] {
  return eachDayOfInterval({ start: new Date(start), end: new Date(end) });
}

/**
 * 선택된 날짜에 따라 일정 카드 렌더링
 * - 전체 보기일 경우: 모든 날짜에 대해 반복 렌더링
 * - 특정 날짜 선택 시: 해당 날짜만 렌더링
 */
function renderScheduleCards(dates: Date[], selectedDate: SelectedDate) {
  if (selectedDate === "ALL") {
    return dates.map((date) => (
      <SectionCard
        key={date.toISOString()}
        title={`${format(date, "MM월 dd일")} 일정`}
        content={MESSAGES.trip.EMPTY_SCHEDULE}
      />
    ));
  }

  return (
    <SectionCard
      title={`${format(selectedDate, "MM월 dd일")} 일정`}
      content={MESSAGES.trip.EMPTY_SCHEDULE}
    />
  );
}

/**
 * TripPlanner 컴포넌트
 * - 여행의 날짜 정보를 바탕으로 일정을 관리할 수 있는 UI 제공
 * - 날짜별 탭을 통해 개별 날짜 또는 전체 일정을 확인할 수 있음
 */

export default function TripPlanner({ trip }: TripProps) {
  const allDates = getAllTripDates(trip.start_date, trip.end_date);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>("ALL");

  return (
    <div className={styles.planner}>
      <h2 className={styles.heading}>📅 날짜별 일정 만들기</h2>

      {/* 날짜 탭 - 전체 or 특정 날짜 선택 */}
      <DateTabs
        allDates={allDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      {/* 날짜 선택에 따라 일정 카드 렌더링 */}
      <div>{renderScheduleCards(allDates, selectedDate)}</div>
    </div>
  );
}
