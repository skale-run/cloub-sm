export const landingPath = "/" as const;
export const defaultPath = "/calendar" as const;

export const routePaths = [
  landingPath,
  defaultPath,
  "/academic-record",
  "/billing",
  "/training-attendance",
  "/coach-evaluation",
  "/progress-overview",
  "/performance-tracking",
  "/profile",
  "/access",
] as const;

export type RoutePath = (typeof routePaths)[number];

const routePathSet = new Set<RoutePath>(routePaths);

export function normalizePath(pathname: string): RoutePath {
  if (routePathSet.has(pathname as RoutePath)) {
    return pathname as RoutePath;
  }

  return defaultPath;
}
