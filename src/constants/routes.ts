//==========================정적 경로==========================
export const ROUTES_STATIC = {
  HOME: "/" as const,
  TRIP_NEW: "/trips/new" as const,
  SETTING: "/setting" as const,
  LOGOUT: "/logout" as const,
};

export type StaticRoutePath =
  (typeof ROUTES_STATIC)[keyof typeof ROUTES_STATIC];

//==========================독적 경로==========================
export const ROUTE_DYNAMIC = {
  TRIP_DETAIL: (id: string | number) => `/trips/${id}`,
};

export type DynamicRoutePath = ReturnType<typeof ROUTE_DYNAMIC.TRIP_DETAIL>;
