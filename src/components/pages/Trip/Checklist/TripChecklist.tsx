"use client";

import { useState } from "react";
import styles from "./TripChecklist.module.scss";

// 기본 체크리스트 항목
const DEFAULT_ITEMS = [
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

// 체크리스트 항목 타입
type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

// 여행 정보 타입
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
  // 초기 체크리스트 상태 설정
  const [items, setItems] = useState<ChecklistItem[]>(
    DEFAULT_ITEMS.map((text, idx) => ({
      id: String(idx),
      text,
      checked: false,
    }))
  );

  // 새 항목 입력 필드 상태
  const [newItem, setNewItem] = useState<string>("");

  /**
   * 체크박스 상태 토글
   * - 해당 항목의 체크 여부를 반전시킴
   */
  const handleToggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  /**
   * 새 항목 추가
   * - 빈 문자열이면 무시
   * - 현재 시간 기반으로 ID 생성
   */
  const handleAddItem = () => {
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

  // 항목 분류
  const pendingItems = items.filter((item) => !item.checked);
  const completedItems = items.filter((item) => item.checked);

  return (
    <div className={styles.container}>
      <h2>✅ 체크리스트 작성하기</h2>

      {/* 새 항목 추가 폼 */}
      <div className={styles.addNew}>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="새 항목 추가"
        />
        <button onClick={handleAddItem}>추가</button>
      </div>

      {/* 미완료 항목이 없을 경우 안내 메시지 */}
      {pendingItems.length === 0 && (
        <div className={styles.emptyMessage}>
          추가할 항목이 없습니다. 새 항목을 추가해보세요!
        </div>
      )}

      {/* 미완료 항목 리스트 */}
      <ul className={styles.list}>
        {pendingItems.map((item) => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleToggleCheck(item.id)}
              />
              {item.text}
            </label>
          </li>
        ))}
      </ul>

      {/* 완료된 항목 리스트 */}
      {completedItems.length > 0 && (
        <div className={styles.completedSection}>
          <h3>✅ 완료된 항목</h3>
          <ul className={styles.list}>
            {completedItems.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleToggleCheck(item.id)}
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
