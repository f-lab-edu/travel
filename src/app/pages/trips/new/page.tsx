"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import ReactFlagsSelect from "react-flags-select";
import TripDateRangePicker from "@/components/forms/TripForm/TripDateRangePicker";
import { addDays, subDays, isAfter } from "date-fns";
import { TripDateRange } from "@/app/types/trip";
import { useRouter } from "next/navigation";
import { createTrip } from "@/api/trips/tripClient";
import { APIError } from "@/utils/https";
import { ERROR_CODES } from "@/constants/errorCodes";

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

    try {
      await createTrip({
        title,
        countryCode,
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      });

      console.log("여행 생성 성공");
      router.replace("/");
    } catch (error) {
      if (error instanceof APIError) {
        switch (error.code) {
          case ERROR_CODES.UNAUTHORIZED:
            alert("로그인이 필요합니다.");
            router.push("/login");
            break;
          case ERROR_CODES.VALIDATION_FAILED:
            alert("입력값이 부족합니다!");
            break;
          default:
            alert("여행 생성 실패: " + error.message);
        }
      } else {
        alert("예상치 못한 에러: " + (error as Error).message);
      }
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
