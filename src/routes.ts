export const defaultPath = "/calendar" as const;

export const routePaths = [
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
  if (pathname === "/") {
    return defaultPath;
  }

  return routePathSet.has(pathname as RoutePath)
    ? (pathname as RoutePath)
    : defaultPath;
}
