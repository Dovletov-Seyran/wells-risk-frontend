export const ROUTES = {
  FEED: "/criteria/feed",
  DRAFT: "/criteria/draft",
  TILES: "/criteria",
  LOGIN: "/login",
};
export type RouteKeyType = keyof typeof ROUTES;
export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  FEED: "Лента",
  DRAFT: "Добавление",
  TILES: "Плитка",
  LOGIN: "Вход",
};
