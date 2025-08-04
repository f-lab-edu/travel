import type { ErrorCode } from "@/constants/errorCodes";

/**
 * API 호출 시 발생한 오류를 표현하는 커스텀 에러 클래스
 * (1) message: 사용자에게 표시할 에러 메시지
 * (2) code: 서버가 반환한 에러 코드 (ex. "UNAUTHORIZED", "VALIDATION_FAILED" 등)
 */
export class APIError extends Error {
  code?: ErrorCode;

  constructor(message: string, code?: ErrorCode) {
    super(message);
    this.code = code;
  }
}

export async function fetcher<T = unknown>(
  input: RequestInfo,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(input, options);

  if (!res.ok) {
    let message = "요청 실패";
    let code: ErrorCode | undefined;

    try {
      const errorRes = await res.json();
      message = errorRes.error || message;
      code = errorRes.code;
    } catch {}

    throw new APIError(message, code);
  }

  return res.json() as Promise<T>;
}
