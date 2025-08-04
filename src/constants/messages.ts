// src/constants/messages.ts
export const MESSAGES = {
  trip: {
    EMPTY_SCHEDULE: "이 날의 일정을 추가해보세요!",
    EMPTY_TRIP_LIST: "여행을 추가해보세요! ✈️",
    CREATE_SUCCESS: "여행이 성공적으로 생성되었습니다!",
    DELETE_CONFIRM: "이 여행을 삭제하시겠습니까?",
  },
  auth: {
    LOGIN_REQUIRED: "로그인이 필요합니다.",
  },
  error: {
    UNAUTHORIZED: "로그인이 필요합니다.",
    VALIDATION_FAILED: "입력값이 부족합니다!",
    CREATE_TRIP_FAILED: "여행 생성 실패",
    FETCH_FAIL: "데이터를 불러오는 데 문제가 발생했어요.",
    UNKNOWN: "알 수 없는 오류가 발생했습니다.",
    USER_NOT_FOUND: "Unexpected: user not found",
    FAILED_TO_FETCH_TRIPS: "여행 데이터를 불러오는 데 문제가 발생했어요",
  },
};
