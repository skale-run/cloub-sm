export type CalendarCategory = "training" | "competition";

type BaseCalendarEvent = {
  id: string;
  category: CalendarCategory;
  titleKey: string;
  locationKey: string;
  start: string;
  end: string;
};

export type TrainingCalendarEvent = BaseCalendarEvent & {
  category: "training";
  coachKey: string;
};

export type CompetitionCalendarEvent = BaseCalendarEvent & {
  category: "competition";
  level: "regional" | "national" | "international";
  checkIn: string;
};

export type CalendarEvent = TrainingCalendarEvent | CompetitionCalendarEvent;

export type CalendarCategoryTheme = {
  accentColor: string;
  softAccentColor: string;
  badge: {
    background: string;
    borderColor: string;
    color: string;
    shadow: string;
  };
};

export const calendarCategoryTheme: Record<
  CalendarCategory,
  CalendarCategoryTheme
> = {
  training: {
    accentColor: "var(--color-primary-400, #f85a73)",
    softAccentColor:
      "color-mix(in srgb, var(--color-primary-900, #39040f) 60%, transparent)",
    badge: {
      background:
        "color-mix(in srgb, var(--color-primary-500, #e83856) 20%, transparent)",
      borderColor:
        "color-mix(in srgb, var(--color-primary-400, #f85a73) 55%, transparent)",
      color: "var(--color-primary-50, #fff3f5)",
      shadow:
        "0 0 0 1px color-mix(in srgb, var(--color-primary-500, #e83856) 35%, transparent)",
    },
  },
  competition: {
    accentColor: "var(--color-accent-400, #ff905c)",
    softAccentColor:
      "color-mix(in srgb, var(--color-accent-900, #3a1409) 58%, transparent)",
    badge: {
      background:
        "color-mix(in srgb, var(--color-accent-500, #f26f3e) 20%, transparent)",
      borderColor:
        "color-mix(in srgb, var(--color-accent-400, #ff905c) 55%, transparent)",
      color: "var(--color-accent-50, #fff6f1)",
      shadow:
        "0 0 0 1px color-mix(in srgb, var(--color-accent-500, #f26f3e) 35%, transparent)",
    },
  },
};

export function getCalendarCategoryTheme(
  category: CalendarCategory,
): CalendarCategoryTheme {
  return calendarCategoryTheme[category];
}

export const calendarEvents: CalendarEvent[] = [
  {
    id: "ts-1",
    category: "training",
    titleKey: "calendar.events.ts1.title",
    locationKey: "calendar.events.ts1.location",
    start: "2025-04-14T06:30:00",
    end: "2025-04-14T08:00:00",
    coachKey: "calendar.events.ts1.coach",
  },
  {
    id: "ts-2",
    category: "training",
    titleKey: "calendar.events.ts2.title",
    locationKey: "calendar.events.ts2.location",
    start: "2025-04-16T18:00:00",
    end: "2025-04-16T20:00:00",
    coachKey: "calendar.events.ts2.coach",
  },
  {
    id: "ts-3",
    category: "training",
    titleKey: "calendar.events.ts3.title",
    locationKey: "calendar.events.ts3.location",
    start: "2025-04-18T11:00:00",
    end: "2025-04-18T12:30:00",
    coachKey: "calendar.events.ts3.coach",
  },
  {
    id: "cc-1",
    category: "competition",
    titleKey: "calendar.events.cc1.title",
    locationKey: "calendar.events.cc1.location",
    start: "2025-04-26T08:00:00",
    end: "2025-04-26T18:00:00",
    level: "regional",
    checkIn: "2025-04-26T08:00:00",
  },
  {
    id: "cc-2",
    category: "competition",
    titleKey: "calendar.events.cc2.title",
    locationKey: "calendar.events.cc2.location",
    start: "2025-05-10T06:30:00",
    end: "2025-05-10T17:00:00",
    level: "national",
    checkIn: "2025-05-10T06:30:00",
  },
  {
    id: "cc-3",
    category: "competition",
    titleKey: "calendar.events.cc3.title",
    locationKey: "calendar.events.cc3.location",
    start: "2025-05-23T07:15:00",
    end: "2025-05-23T20:00:00",
    level: "international",
    checkIn: "2025-05-23T07:15:00",
  },
];

export const trainingCalendarEvents = calendarEvents.filter(
  (event): event is TrainingCalendarEvent => event.category === "training",
);

export const competitionCalendarEvents = calendarEvents.filter(
  (event): event is CompetitionCalendarEvent =>
    event.category === "competition",
);
