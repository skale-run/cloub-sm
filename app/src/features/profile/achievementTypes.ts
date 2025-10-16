export type AchievementCategory =
  | "tournament"
  | "leadership"
  | "communityService"
  | "discipline";

export type Achievement = {
  id: string;
  title: string;
  category: AchievementCategory;
  verified?: boolean;
};

export type AchievementDraft = {
  title: string;
  category: AchievementCategory;
};
