"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ReactFlagsSelect from "react-flags-select";
import TripDateRangePicker from "@/components/forms/TripForm/TripDateRangePicker";
import { addDays, subDays } from "date-fns";
import { TripDateRange } from "@/app/types/trip";
import { useRouter } from "next/navigation";

export default function NewTripPage() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("KR");
  const [dateRange, setDateRange] = useState<TripDateRange>({
    startDate: subDays(new Date(), 7),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tripData = {
      title,
      countryCode,
      startDate: dateRange.startDate.toISOString(), // 날짜는 문자열로!
      endDate: dateRange.endDate.toISOString(),
    };

    try {
      const res = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!res.ok) {
        const { error } = await res.json();
        alert("여행 생성 실패: " + error);
        return;
      }

      const result = await res.json();
      console.log("여행 생성 성공:", result);
      // 성공 시 리디렉션 or 메시지 표시
      router.replace("/");
    } catch (error) {
      alert("에러 발생: " + (error as Error).message);
    }
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
