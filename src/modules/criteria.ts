// Критерий шкалы Уэллса в том виде, в котором его отдаёт веб-сервис (GET /api/criteria)
export interface WellsCriterion {
  criterion_id: number;
  criterion_name: string;
  short_description: string;
  criterion_group: string;
  wells_points: number;
  image_url: string;
  video_url: string;
  like_count: number;
  is_liked: number;
  is_mine: number;
  created_at: string;
  formed_at: string | null;
}

// Минимальный и максимальный вес критерия для фильтра плитки
export const MIN_WELLS_POINTS = -2;
export const MAX_WELLS_POINTS = 3;

// Вес со знаком: +1.5, -2
export const formatPoints = (points: number): string =>
  points > 0 ? `+${points}` : `${points}`;
