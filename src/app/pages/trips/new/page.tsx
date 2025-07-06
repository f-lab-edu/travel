"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ReactFlagsSelect from "react-flags-select";
import TripDateRangePicker from "@/components/forms/TripForm/TripDateRangePicker";
import { addDays, subDays } from "date-fns";
import { TripDateRange } from "@/app/types/trip";

export default function NewTripPage() {
  const [title, setTitle] = useState("");
  const [countryCode, setCountryCode] = useState("KR");
  const [dateRange, setDateRange] = useState<TripDateRange>({
    startDate: subDays(new Date(), 7),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tripData = {
      title,
      countryCode,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    console.log("여행 데이터:", tripData);
    // TODO: API 호출 or 상태 전송 처리
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>새로운 여행 추가</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">여행 제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 부산 3박 4일"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">여행 장소</label>
          <ReactFlagsSelect
            selected={countryCode}
            onSelect={(code) => setCountryCode(code)}
            showSelectedLabel={true}
            showOptionLabel={true}
            searchable
          />
        </div>

        <div className={styles.formGroup}>
          <label>여행 일정</label>
          <TripDateRangePicker
            value={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          여행 생성하기
        </button>
      </form>
    </main>
  );
}
