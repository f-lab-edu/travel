export const MESSAGES = {
  trip: {
    empty: {
      SCHEDULE: "이 날의 일정을 추가해보세요!",
      LIST: "여행을 추가해보세요! ✈️",
    },
    success: {
      CREATE: "여행이 성공적으로 생성되었습니다!",
    },
    confirm: {
      DELETE: "이 여행을 삭제하시겠습니까?",
    },
    error: {
      CREATE: "여행 생성 실패",
      FETCH: "여행 데이터를 불러오는 데 문제가 발생했어요",
    },
  },

  auth: {
    error: {
      UNAUTHORIZED: "로그인이 필요합니다.",
      USER_NOT_FOUND: "사용자 정보를 찾을 수 없습니다.",
    },
  },

  profile: {
    success: {
      UPDATE: "프로필 이미지가 업데이트되었습니다.",
    },
    error: {
      UPLOAD_FAILED: "이미지 업로드에 실패했습니다.",
      UPDATE_FAILED: "프로필 이미지 URL 업데이트에 실패했습니다.",
    },
  },

  form: {
    error: {
      VALIDATION_FAILED: "입력값이 부족합니다!",
    },
  },

  storage: {
    error: {
      UNAUTHORIZED_OR_NO_FILE: "인증되지 않았거나 파일이 누락되었습니다.",
    },
  },

  common: {
    error: {
      DATABASE_ERROR: "데이터베이스 처리 중 오류가 발생했습니다.",
      UNKNOWN: "알 수 없는 오류가 발생했습니다.",
    },
  },
};
