// src/components/common/DateTabs.tsx
import { format } from "date-fns";
import styles from "./DateTabs.module.scss";

type Props = {
  allDates: Date[];
  selectedDate: Date | "ALL";
  onSelectDate: (date: Date | "ALL") => void;
};

export default function DateTabs({
  allDates,
  selectedDate,
  onSelectDate,
}: Props) {
  return (
    <div className={styles.tabContainer}>
      <button
        className={`${styles.tab} ${
          selectedDate === "ALL" ? styles.active : ""
        }`}
        onClick={() => onSelectDate("ALL")}
      >
        전체
      </button>
      {allDates.map((date) => {
        const formatted = format(date, "MM월 dd일");
        const isSelected =
          selectedDate !== "ALL" &&
          selectedDate.toDateString() === date.toDateString();

        return (
          <button
            key={formatted}
            className={`${styles.tab} ${isSelected ? styles.active : ""}`}
            onClick={() => onSelectDate(date)}
          >
            {formatted}
          </button>
        );
      })}
    </div>
  );
}
