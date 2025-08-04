"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./page.module.scss";
import ReactFlagsSelect from "react-flags-select";
import TripDateRangePicker from "@/components/forms/TripForm/TripDateRangePicker";
import { addDays, subDays } from "date-fns";
import { TripDateRange } from "@/types/trip";
import { useRouter } from "next/navigation";
import { createTrip } from "@/lib/api/tripClient";
import { APIError } from "@/lib/api/https";
import { ERROR_CODES } from "@/constants/errorCodes";
import { MESSAGES } from "@/constants/messages";
import { ROUTES_STATIC } from "@/constants/routes";

export default function NewTripPage() {
  const [title, setTitle] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("KR");
  const [dateRange, setDateRange] = useState<TripDateRange>({
    startDate: subDays(new Date(), 7),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });

  const router = useRouter();

  // 여행 제목 변경 핸들러
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 국가 선택 핸들러
  const handleCountrySelect = (code: string) => {
    setCountryCode(code);
  };

  // 여행 일정 변경 핸들러
  const handleDateChange = (range: TripDateRange) => {
    setDateRange(range);
  };

  // 여행 생성 요청
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createTrip({
        title,
        countryCode,
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      });

      router.replace(ROUTES_STATIC.HOME);
    } catch (error) {
      if (error instanceof APIError) {
        switch (error.code) {
          case ERROR_CODES.UNAUTHORIZED:
            alert(MESSAGES.auth.error.UNAUTHORIZED);
            router.push("/login");
            break;
          case ERROR_CODES.VALIDATION_FAILED:
            alert(MESSAGES.form.error.VALIDATION_FAILED);
            break;
          default:
            alert(`${MESSAGES.trip.error.CREATE}: ${error.message}`);
        }
      } else {
        alert(`${MESSAGES.common.error.UNKNOWN}: ${(error as Error).message}`);
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
            onChange={handleTitleChange}
            placeholder="예: 부산 3박 4일"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">여행 장소</label>
          <ReactFlagsSelect
            selected={countryCode}
            onSelect={handleCountrySelect}
            showSelectedLabel={true}
            showOptionLabel={true}
            searchable
          />
        </div>

        <div className={styles.formGroup}>
          <label>여행 일정</label>
          <TripDateRangePicker value={dateRange} onChange={handleDateChange} />
        </div>

        <button type="submit" className={styles.submitButton}>
          여행 생성하기
        </button>
      </form>
    </main>
  );
}
