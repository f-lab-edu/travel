// TripChecklist.tsx
"use client";

import { useState } from "react";
import styles from "./TripChecklist.module.scss";

const defaultItems = [
  "항공권",
  "세안도구",
  "의류",
  "충전기",
  "보조배터리",
  "유심",
  "여권",
  "숙소 예약증",
  "우산",
];

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

export default function TripChecklist({ trip }: Props) {
  const [items, setItems] = useState(
    defaultItems.map((text, idx) => ({
      id: String(idx),
      text,
      checked: false,
    }))
  );
  const [newItem, setNewItem] = useState("");

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleAdd = () => {
    if (!newItem.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: newItem.trim(),
        checked: false,
      },
    ]);
    setNewItem("");
  };

  const pending = items.filter((item) => !item.checked);
  const completed = items.filter((item) => item.checked);

  return (
    <div className={styles.container}>
      <h2>✅ 체크리스트 작성하기</h2>

      <div className={styles.addNew}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 항목 추가"
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      {pending.length === 0 && (
        <div className={styles.emptyMessage}>
          추가할 항목이 없습니다. 새 항목을 추가해보세요!
        </div>
      )}

      <ul className={styles.list}>
        {pending.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>

      {completed.length > 0 && (
        <div className={styles.completedSection}>
          <h3>✅ 완료된 항목</h3>
          <ul className={styles.list}>
            {completed.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                  />
                  {item.text}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
