import { fetcher } from "@/utils/https";

// 대분류 여행 생성에 필요한 파라미터 타입 정의
export type CreateTripParams = {
  title: string;
  countryCode: string;
  startDate: string;
  endDate: string;
};

// 대분류 여행 생성 성공 시 서버에서 반환하는 응답 타입
export type CreateTripResponse = {
  message: string;
};

// 대분류 여행 생성 API 호출 함수
export async function createTrip(data: CreateTripParams) {
  return fetcher<CreateTripResponse>("/api/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
