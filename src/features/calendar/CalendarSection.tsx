import type { ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import RedSurface from "../../components/RedSurface";
import { calendarEvents, type CalendarEvent } from "./calendarEvents";

type CalendarView = "month" | "week" | "day";

type DayOption = {
  key: string;
  date: Date;
  label: string;
  shortLabel: string;
};

type WeekBucket = {
  id: string;
  label: string;
  range: string;
  days: {
    key: string;
    date: Date;
    label: string;
    events: CalendarEvent[];
  }[];
};

type MonthBucket = {
  id: string;
  label: string;
  events: CalendarEvent[];
};

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const dayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
});

const longDayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
});

const rangeFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const typeStyles: Record<CalendarEvent["category"], string> = {
  training: "border-red-400/40 bg-red-500/15 text-red-100",
  competition: "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100",
};

const categoryMetadata: Record<
  CalendarEvent["category"],
  { label: string; description: string; accent: string }
> = {
  training: {
    label: "Training Sessions",
    description:
      "Skill development, conditioning, and video review touchpoints.",
    accent: "bg-red-400",
  },
  competition: {
    label: "Competition Days",
    description: "Travel logistics, qualifying rounds, and championship meets.",
    accent: "bg-fuchsia-400",
  },
};

const calendarViewOptions = [
  "month",
  "week",
  "day",
] satisfies readonly CalendarView[];
const categoryOrder = [
  "training",
  "competition",
] satisfies readonly CalendarEvent["category"][];

function formatRelativeDay(target: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDay = new Date(target);
  eventDay.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays > 1) {
    return `In ${diffDays} days`;
  }

  if (diffDays === 1) {
    return "Tomorrow";
  }

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === -1) {
    return "Yesterday";
  }

  return `${Math.abs(diffDays)} days ago`;
}

function getDateKey(date: Date): string {
  return date.toISOString().split("T")[0] ?? "";
}

function startOfWeek(date: Date): Date {
  const result = new Date(date);
  const day = result.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  result.setDate(result.getDate() + diff);
  result.setHours(0, 0, 0, 0);
  return result;
}

function endOfWeek(date: Date): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + 6);
  return result;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function CalendarSection(): ReactElement {
  const sortedEvents = useMemo(
    () =>
      [...calendarEvents].sort(
        (first, second) =>
          new Date(first.start).getTime() - new Date(second.start).getTime(),
      ),
    [],
  );

  const [activeCategories, setActiveCategories] = useState<
    Record<CalendarEvent["category"], boolean>
  >({
    training: true,
    competition: true,
  });

  const filteredEvents = useMemo(
    () => sortedEvents.filter((event) => activeCategories[event.category]),
    [sortedEvents, activeCategories],
  );

  const months = useMemo(() => {
    const monthBuckets = new Map<string, MonthBucket>();

    filteredEvents.forEach((event) => {
      const startDate = new Date(event.start);
      const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}`;
      const bucket = monthBuckets.get(monthKey);

      if (bucket) {
        bucket.events.push(event);
      } else {
        monthBuckets.set(monthKey, {
          id: monthKey,
          label: monthFormatter.format(startDate),
          events: [event],
        });
      }
    });

    return Array.from(monthBuckets.values());
  }, [filteredEvents]);

  const weeks = useMemo(() => {
    const weekBuckets = new Map<string, WeekBucket>();

    filteredEvents.forEach((event) => {
      const startDate = new Date(event.start);
      const weekStart = startOfWeek(startDate);
      const weekKey = getDateKey(weekStart);

      if (!weekBuckets.has(weekKey)) {
        const weekEnd = endOfWeek(new Date(weekStart));

        weekBuckets.set(weekKey, {
          id: weekKey,
          label: `Week of ${rangeFormatter.format(weekStart)}`,
          range: `${rangeFormatter.format(weekStart)} – ${rangeFormatter.format(weekEnd)}`,
          days: Array.from({ length: 7 }).map((_, index) => {
            const dayDate = new Date(weekStart);
            dayDate.setDate(weekStart.getDate() + index);
            dayDate.setHours(0, 0, 0, 0);

            return {
              key: getDateKey(dayDate),
              date: dayDate,
              label: dayFormatter.format(dayDate),
              events: [],
            };
          }),
        });
      }

      const bucket = weekBuckets.get(weekKey);

      if (!bucket) return;

      const matchingDay = bucket.days.find(
        (day) => day.key === getDateKey(startDate),
      );

      if (matchingDay) {
        matchingDay.events.push(event);
      }
    });

    return Array.from(weekBuckets.values()).map((bucket) => ({
      ...bucket,
      days: bucket.days.map((day) => ({
        ...day,
        events: day.events.sort(
          (first, second) =>
            new Date(first.start).getTime() - new Date(second.start).getTime(),
        ),
      })),
    }));
  }, [filteredEvents]);

  const dayOptions = useMemo(() => {
    const seen = new Map<string, DayOption>();

    filteredEvents.forEach((event) => {
      const startDate = new Date(event.start);
      const key = getDateKey(startDate);

      if (!seen.has(key)) {
        seen.set(key, {
          key,
          date: startDate,
          label: longDayFormatter.format(startDate),
          shortLabel: dayFormatter.format(startDate),
        });
      }
    });

    return Array.from(seen.values()).sort(
      (first, second) => first.date.getTime() - second.date.getTime(),
    );
  }, [filteredEvents]);

  const [view, setView] = useState<CalendarView>("month");
  const [selectedDayKey, setSelectedDayKey] = useState<string>("");

  const activeCategoryCount =
    Object.values(activeCategories).filter(Boolean).length;

  const toggleCategory = (category: CalendarEvent["category"]) => {
    setActiveCategories((previous) => ({
      ...previous,
      [category]: !previous[category],
    }));
  };

  useEffect(() => {
    if (dayOptions.length === 0) {
      setSelectedDayKey("");
      return;
    }

    const hasSelectedDay = dayOptions.some(
      (option) => option.key === selectedDayKey,
    );

    if (!hasSelectedDay) {
      setSelectedDayKey(dayOptions[0].key);
    }
  }, [dayOptions, selectedDayKey]);

  const selectedDay = dayOptions.find(
    (option) => option.key === selectedDayKey,
  );
  const eventsOnSelectedDay = selectedDay
    ? filteredEvents.filter((event) =>
        isSameDay(new Date(event.start), selectedDay.date),
      )
    : [];

  const upcomingEvent = useMemo(() => {
    if (filteredEvents.length === 0) {
      return undefined;
    }

    const now = new Date();
    const futureEvent = filteredEvents.find(
      (event) => new Date(event.end).getTime() >= now.getTime(),
    );

    return futureEvent ?? filteredEvents[filteredEvents.length - 1];
  }, [filteredEvents]);

  const upcomingEventStart = upcomingEvent
    ? new Date(upcomingEvent.start)
    : undefined;
  const upcomingEventEnd = upcomingEvent
    ? new Date(upcomingEvent.end)
    : undefined;
  const upcomingEventRelativeText = upcomingEventStart
    ? formatRelativeDay(upcomingEventStart)
    : "";

  return (
    <section id="calendar" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Integrated Team Calendar
          </h2>
          <p className="text-sm text-red-200/75">
            Switch between monthly, weekly, and daily perspectives to coordinate
            every training session and competition.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-red-500/35 bg-red-950/60 p-1 text-xs font-semibold text-red-100">
          {calendarViewOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`rounded-full px-4 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                view === option
                  ? "bg-red-500/25 text-red-50 shadow-[0_8px_20px_rgba(220,38,38,0.25)]"
                  : "text-red-200/70 hover:text-red-100"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface
          tone="muted"
          className="flex flex-col gap-4 rounded-3xl p-6 text-red-50"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                Next on the agenda
              </p>
              <h3 className="mt-1 text-lg font-semibold text-red-50">
                {upcomingEvent ? upcomingEvent.title : "No visible events"}
              </h3>
            </div>
            {upcomingEvent ? (
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[upcomingEvent.category]}`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${categoryMetadata[upcomingEvent.category].accent}`}
                />
                {categoryMetadata[upcomingEvent.category].label}
              </span>
            ) : null}
          </div>

          {upcomingEvent && upcomingEventStart && upcomingEventEnd ? (
            <div className="space-y-2 text-sm text-red-200/80">
              <div className="flex flex-wrap items-center gap-2 text-red-100">
                <span className="text-base font-semibold text-red-50">
                  {longDayFormatter.format(upcomingEventStart)}
                </span>
                <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {upcomingEventRelativeText}
                </span>
              </div>
              <p>
                {timeFormatter.format(upcomingEventStart)} –{" "}
                {timeFormatter.format(upcomingEventEnd)} ·{" "}
                {upcomingEvent.location}
              </p>
              {upcomingEvent.category === "training" ? (
                <p>Lead coach: {upcomingEvent.coach}</p>
              ) : (
                <p>
                  {upcomingEvent.level} meet · Check-in {upcomingEvent.checkIn}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-red-200/70">
              Adjust the focus filters to surface the next training session or
              competition on the shared schedule.
            </p>
          )}
        </RedSurface>

        <RedSurface
          tone="glass"
          className="flex flex-col gap-4 rounded-3xl border border-red-500/25 p-6 text-red-50"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
              Focus filters
            </p>
            <h3 className="mt-1 text-lg font-semibold text-red-50">
              Highlight the moments that matter
            </h3>
            <p className="mt-2 text-sm text-red-200/75">
              Toggle categories to focus on upcoming training preparation or
              competition execution.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryOrder.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => toggleCategory(category)}
                aria-pressed={activeCategories[category]}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                  activeCategories[category]
                    ? "border-red-400/55 bg-red-500/20 text-red-50 shadow-[0_12px_30px_rgba(220,38,38,0.2)]"
                    : "border-red-500/25 bg-red-950/50 text-red-200/80 hover:text-red-100"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${categoryMetadata[category].accent}`}
                />
                {categoryMetadata[category].label}
              </button>
            ))}
          </div>
          <div className="space-y-3 text-sm text-red-200/75">
            {categoryOrder.map((category) => (
              <div key={category} className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full ${categoryMetadata[category].accent}`}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold text-red-50">
                    {categoryMetadata[category].label}
                  </p>
                  <p>{categoryMetadata[category].description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-red-200/60">
            {activeCategoryCount === categoryOrder.length
              ? "Both categories are visible."
              : activeCategoryCount === 1
                ? "Only one category is active—tap again to bring the full schedule back."
                : "No categories selected—turn one on to see the upcoming schedule."}
          </p>
        </RedSurface>
      </div>

      {filteredEvents.length === 0 ? (
        <RedSurface
          tone="muted"
          className="rounded-3xl p-6 text-sm text-red-200/80"
        >
          No events match the current focus filters. Re-enable a category or
          adjust your selection to view the team schedule again.
        </RedSurface>
      ) : null}

      {filteredEvents.length > 0 && view === "month" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {months.map((month) => (
            <RedSurface
              key={month.id}
              as="article"
              tone="muted"
              className="flex flex-col gap-4 p-6 text-red-50"
            >
              <header className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-red-50">
                  {month.label}
                </h3>
                <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {month.events.length} events
                </span>
              </header>
              <div className="space-y-4">
                {month.events.map((event) => {
                  const startDate = new Date(event.start);
                  const endDate = new Date(event.end);

                  return (
                    <RedSurface
                      key={event.id}
                      tone="glass"
                      className="rounded-2xl p-4 transition hover:border-red-400/45"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-red-200/75">
                        <span className="font-semibold text-red-50">
                          {dayFormatter.format(startDate)}
                        </span>
                        <span>
                          {timeFormatter.format(startDate)} –{" "}
                          {timeFormatter.format(endDate)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-red-50">
                            {event.title}
                          </p>
                          <p className="text-sm text-red-200/75">
                            {event.location}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[event.category]}`}
                        >
                          {event.category === "training"
                            ? "Training Session"
                            : "Competition Day"}
                        </span>
                      </div>
                    </RedSurface>
                  );
                })}
              </div>
            </RedSurface>
          ))}
        </div>
      ) : null}

      {filteredEvents.length > 0 && view === "week" ? (
        <div className="space-y-5">
          {weeks.map((week) => (
            <RedSurface
              key={week.id}
              as="article"
              tone="muted"
              className="p-6 text-red-50"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-red-50">
                    {week.label}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                    {week.range}
                  </p>
                </div>
                <span className="text-xs text-red-200/70">
                  {week.days.reduce(
                    (total, day) => total + day.events.length,
                    0,
                  )}{" "}
                  scheduled events
                </span>
              </header>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                {week.days.map((day) => (
                  <div
                    key={day.key}
                    className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${
                      day.events.length > 0
                        ? "border-red-400/35 bg-red-950/55"
                        : "border-red-500/20 bg-red-950/30 text-red-200/60"
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-red-200/70">
                      {day.label}
                    </div>
                    <div className="space-y-3">
                      {day.events.length > 0 ? (
                        day.events.map((event) => {
                          const startDate = new Date(event.start);
                          const endDate = new Date(event.end);

                          return (
                            <RedSurface
                              key={event.id}
                              tone="glass"
                              className="rounded-xl p-3"
                            >
                              <p className="text-sm font-semibold text-red-50">
                                {event.title}
                              </p>
                              <p className="text-xs text-red-200/75">
                                {timeFormatter.format(startDate)} –{" "}
                                {timeFormatter.format(endDate)}
                              </p>
                              <p className="mt-1 text-xs text-red-200/70">
                                {event.location}
                              </p>
                              <span
                                className={`mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] ${typeStyles[event.category]}`}
                              >
                                {event.category === "training"
                                  ? "Training"
                                  : "Competition"}
                              </span>
                            </RedSurface>
                          );
                        })
                      ) : (
                        <p className="text-xs text-red-200/60">
                          No events scheduled
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </RedSurface>
          ))}
        </div>
      ) : null}

      {filteredEvents.length > 0 && view === "day" ? (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {dayOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedDayKey(option.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                  selectedDayKey === option.key
                    ? "border-red-400/55 bg-red-500/20 text-red-50 shadow-[0_12px_30px_rgba(220,38,38,0.2)]"
                    : "border-red-500/25 bg-red-950/50 text-red-200/80 hover:text-red-100"
                }`}
              >
                {option.shortLabel}
              </button>
            ))}
          </div>

          <RedSurface as="article" tone="muted" className="p-6 text-red-50">
            <header className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-red-50">
                  {selectedDay?.label ?? "No day selected"}
                </h3>
                <p className="text-sm text-red-200/75">
                  All training sessions and competition duties for this date.
                </p>
              </div>
              <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {eventsOnSelectedDay.length}{" "}
                {eventsOnSelectedDay.length === 1 ? "event" : "events"}
              </span>
            </header>

            <div className="mt-6 space-y-4">
              {eventsOnSelectedDay.length > 0 ? (
                eventsOnSelectedDay.map((event) => {
                  const startDate = new Date(event.start);
                  const endDate = new Date(event.end);

                  return (
                    <RedSurface
                      key={event.id}
                      tone="glass"
                      className="rounded-2xl p-5 transition hover:border-red-400/45"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-red-200/75">
                        <span>
                          {timeFormatter.format(startDate)} –{" "}
                          {timeFormatter.format(endDate)}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[event.category]}`}
                        >
                          {event.category === "training"
                            ? "Training Session"
                            : "Competition Day"}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-base font-semibold text-red-50">
                          {event.title}
                        </p>
                        <p className="text-sm text-red-200/75">
                          {event.location}
                        </p>
                        {event.category === "training" ? (
                          <p className="text-xs text-red-200/70">
                            Lead · {event.coach}
                          </p>
                        ) : (
                          <p className="text-xs text-red-200/70">
                            Check-in {event.checkIn}
                          </p>
                        )}
                      </div>
                    </RedSurface>
                  );
                })
              ) : (
                <p className="text-sm text-red-200/60">
                  No scheduled activity on this date.
                </p>
              )}
            </div>
          </RedSurface>
        </div>
      ) : null}
    </section>
  );
}

export default CalendarSection;
