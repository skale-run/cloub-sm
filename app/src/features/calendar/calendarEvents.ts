import { useEffect, useState } from "react";
import { fetchJson } from "../../lib/api";

export type CalendarCategory = "training" | "competition";

type BaseCalendarEvent = {
  id: string;
  category: CalendarCategory;
  titleKey: string;
  locationKey: string;
  start: string;
  end: string;
  eventType: string | null;
  members: Array<{
    id: string;
    fullName: string | null;
    email: string | null;
    membershipId: string | null;
  }>;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export type TrainingCalendarEvent = BaseCalendarEvent & {
  category: "training";
  coachKey: string | null;
};

export type CompetitionCalendarEvent = BaseCalendarEvent & {
  category: "competition";
  level: "regional" | "national" | "international" | null;
  checkIn: string | null;
};

export type CalendarEvent = TrainingCalendarEvent | CompetitionCalendarEvent;

const FALLBACK_EVENTS: CalendarEvent[] = [
  {
    id: "ts-1",
    category: "training",
    titleKey: "calendar.events.ts1.title",
    locationKey: "calendar.events.ts1.location",
    start: "2025-04-14T06:30:00",
    end: "2025-04-14T08:00:00",
    coachKey: "calendar.events.ts1.coach",
    eventType: "training",
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
    members: [],
  },
];

type CalendarEventsResponse = {
  events?: CalendarEvent[];
};

function isCalendarEvent(value: unknown): value is CalendarEvent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.id !== "string") {
    return false;
  }

  if (record.category !== "training" && record.category !== "competition") {
    return false;
  }

  if (typeof record.titleKey !== "string" || typeof record.locationKey !== "string") {
    return false;
  }

  if (typeof record.start !== "string" || typeof record.end !== "string") {
    return false;
  }

  if (record.category === "training") {
    return "coachKey" in record;
  }

  return "level" in record && "checkIn" in record;
}

export async function fetchCalendarEvents(
  signal?: AbortSignal,
): Promise<CalendarEvent[]> {
  try {
    const response = await fetchJson<CalendarEventsResponse>("/calendar-events", {
      signal,
    });

    const fetchedEvents = Array.isArray(response.events)
      ? response.events.filter(isCalendarEvent)
      : [];

    if (fetchedEvents.length === 0) {
      return FALLBACK_EVENTS;
    }

    return fetchedEvents.map((event) => ({
      ...event,
      eventType: event.eventType ?? null,
      members: Array.isArray(event.members)
        ? event.members.filter((member): member is BaseCalendarEvent["members"][number] => {
            return Boolean(member && typeof member === "object" && "id" in member);
          })
        : [],
    }));
  } catch (error) {
    console.warn("Failed to fetch calendar events", error);
    return FALLBACK_EVENTS;
  }
}

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(FALLBACK_EVENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    fetchCalendarEvents(controller.signal)
      .then((fetchedEvents) => {
        setEvents(fetchedEvents);
        setIsLoading(false);
      })
      .catch((fetchError) => {
        console.warn("Failed to load calendar events", fetchError);
        setError(fetchError instanceof Error ? fetchError.message : String(fetchError));
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { events, isLoading, error } as const;
}

export function useTrainingCalendarEvents() {
  const { events, isLoading, error } = useCalendarEvents();

  const trainingEvents = events.filter(
    (event): event is TrainingCalendarEvent => event.category === "training",
  );

  return { events: trainingEvents, isLoading, error } as const;
}

export function useCompetitionCalendarEvents() {
  const { events, isLoading, error } = useCalendarEvents();

  const competitionEvents = events.filter(
    (event): event is CompetitionCalendarEvent => event.category === "competition",
  );

  return { events: competitionEvents, isLoading, error } as const;
}

export function getFallbackCalendarEvents(): CalendarEvent[] {
  return FALLBACK_EVENTS;
}
