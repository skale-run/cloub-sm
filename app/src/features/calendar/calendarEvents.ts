const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/v1";

export type CalendarCategory = "training" | "competition";

export type CalendarEventMember = {
  id: string;
  fullName: string | null;
  email: string | null;
  membershipId: string | null;
};

type BaseCalendarEvent = {
  id: string;
  category: CalendarCategory;
  titleKey: string;
  locationKey: string;
  start: string;
  end: string;
  eventType?: string;
  createdAt?: string;
  updatedAt?: string;
  members?: CalendarEventMember[];
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
    eventType: "training",
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-04-10T08:00:00Z",
    members: [],
  },
  {
    id: "ts-2",
    category: "training",
    titleKey: "calendar.events.ts2.title",
    locationKey: "calendar.events.ts2.location",
    start: "2025-04-16T18:00:00",
    end: "2025-04-16T20:00:00",
    coachKey: "calendar.events.ts2.coach",
    eventType: "training",
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-04-12T08:00:00Z",
    members: [],
  },
  {
    id: "ts-3",
    category: "training",
    titleKey: "calendar.events.ts3.title",
    locationKey: "calendar.events.ts3.location",
    start: "2025-04-18T11:00:00",
    end: "2025-04-18T12:30:00",
    coachKey: "calendar.events.ts3.coach",
    eventType: "training",
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-04-15T08:00:00Z",
    members: [],
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
    eventType: "competition",
    createdAt: "2025-04-05T08:00:00Z",
    updatedAt: "2025-04-20T08:00:00Z",
    members: [],
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
    eventType: "competition",
    createdAt: "2025-04-10T08:00:00Z",
    updatedAt: "2025-04-25T08:00:00Z",
    members: [],
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
    eventType: "competition",
    createdAt: "2025-04-15T08:00:00Z",
    updatedAt: "2025-05-01T08:00:00Z",
    members: [],
  },
];

export const trainingCalendarEvents = calendarEvents.filter(
  (event): event is TrainingCalendarEvent => event.category === "training",
);

export const competitionCalendarEvents = calendarEvents.filter(
  (event): event is CompetitionCalendarEvent =>
    event.category === "competition",
);

type FetchCalendarEventsOptions = {
  signal?: AbortSignal;
};

type CalendarEventsResponse = {
  events?: unknown;
};

const COMPETITION_LEVELS = new Set([
  "regional",
  "national",
  "international",
] as const);

function isCompetitionLevel(
  value: unknown,
): value is CompetitionCalendarEvent["level"] {
  return (
    typeof value === "string" &&
    COMPETITION_LEVELS.has(value as CompetitionCalendarEvent["level"])
  );
}

function normalizeMember(member: unknown): CalendarEventMember | null {
  if (!member || typeof member !== "object") {
    return null;
  }

  const data = member as Record<string, unknown>;
  const id = typeof data.id === "string" ? data.id : null;

  if (!id) {
    return null;
  }

  return {
    id,
    fullName: typeof data.fullName === "string" ? data.fullName : null,
    email: typeof data.email === "string" ? data.email : null,
    membershipId:
      typeof data.membershipId === "string" ? data.membershipId : null,
  };
}

function normalizeCalendarEvent(event: unknown): CalendarEvent | null {
  if (!event || typeof event !== "object") {
    return null;
  }

  const data = event as Record<string, unknown>;
  const id = typeof data.id === "string" ? data.id : null;
  const titleKey = typeof data.titleKey === "string" ? data.titleKey : null;
  const locationKey =
    typeof data.locationKey === "string" ? data.locationKey : null;
  const start = typeof data.start === "string" ? data.start : null;
  const end = typeof data.end === "string" ? data.end : null;

  if (!id || !titleKey || !locationKey || !start || !end) {
    return null;
  }

  const members = Array.isArray(data.members)
    ? data.members
        .map(normalizeMember)
        .filter((member): member is CalendarEventMember => member !== null)
    : undefined;

  const base: Omit<BaseCalendarEvent, "category"> = {
    id,
    titleKey,
    locationKey,
    start,
    end,
    eventType: typeof data.eventType === "string" ? data.eventType : undefined,
    createdAt:
      typeof data.createdAt === "string" ? data.createdAt : undefined,
    updatedAt:
      typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    members,
  };

  if (data.category === "training") {
    const coachKey =
      typeof data.coachKey === "string" ? data.coachKey : null;

    if (!coachKey) {
      return null;
    }

    return {
      ...base,
      category: "training",
      coachKey,
    } satisfies TrainingCalendarEvent;
  }

  if (data.category === "competition") {
    const level = isCompetitionLevel(data.level) ? data.level : null;
    const checkIn = typeof data.checkIn === "string" ? data.checkIn : null;

    if (!level || !checkIn) {
      return null;
    }

    return {
      ...base,
      category: "competition",
      level,
      checkIn,
    } satisfies CompetitionCalendarEvent;
  }

  return null;
}

export async function fetchCalendarEvents(
  { signal }: FetchCalendarEventsOptions = {},
): Promise<CalendarEvent[]> {
  const response = await fetch(`${API_BASE_URL}/calendar-events`, { signal });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch calendar events: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as CalendarEventsResponse;
  const { events } = payload;

  if (!Array.isArray(events)) {
    return [];
  }

  return events
    .map(normalizeCalendarEvent)
    .filter((event): event is CalendarEvent => event !== null);
}
