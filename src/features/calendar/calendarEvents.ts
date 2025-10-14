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
    checkIn: "08:00",
  },
  {
    id: "cc-2",
    category: "competition",
    titleKey: "calendar.events.cc2.title",
    locationKey: "calendar.events.cc2.location",
    start: "2025-05-10T06:30:00",
    end: "2025-05-10T17:00:00",
    level: "national",
    checkIn: "06:30",
  },
  {
    id: "cc-3",
    category: "competition",
    titleKey: "calendar.events.cc3.title",
    locationKey: "calendar.events.cc3.location",
    start: "2025-05-23T07:15:00",
    end: "2025-05-23T20:00:00",
    level: "international",
    checkIn: "07:15",
  },
];

export const trainingCalendarEvents = calendarEvents.filter(
  (event): event is TrainingCalendarEvent => event.category === "training",
);

export const competitionCalendarEvents = calendarEvents.filter(
  (event): event is CompetitionCalendarEvent =>
    event.category === "competition",
);
