import type { ReactElement } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import RedSurface from "../../components/RedSurface";
import { getLanguagePresentation } from "../../lib/i18n";
import { useCalendarEvents, type CalendarEvent } from "./calendarEvents";
import { ChevronLeft, ChevronRight } from "../../lucide-react";

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

type MonthDay = {
  key: string;
  date: Date;
  inCurrentMonth: boolean;
  events: CalendarEvent[];
};

const typeStyles: Record<CalendarEvent["category"], string> = {
  training: "border-red-400/40 bg-red-500/15 text-red-100",
  competition: "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100",
};

const categoryAccentMap: Record<CalendarEvent["category"], string> = {
  training: "bg-red-400",
  competition: "bg-fuchsia-400",
};

function formatDuration(minutes: number, t: TFunction<"translation">): string {
  if (minutes <= 0) {
    return t("calendar.duration.none");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return [
    hours > 0 ? t("calendar.duration.hours", { count: hours }) : undefined,
    remainingMinutes > 0
      ? t("calendar.duration.minutes", { count: remainingMinutes })
      : undefined,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ");
}

const calendarViewOptions = [
  "month",
  "week",
  "day",
] satisfies readonly CalendarView[];
const categoryOrder = [
  "training",
  "competition",
] satisfies readonly CalendarEvent["category"][];

function formatRelativeDay(target: Date, t: TFunction<"translation">): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDay = new Date(target);
  eventDay.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (eventDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays > 1) {
    return t("calendar.relativeDay.inDays", { count: diffDays });
  }

  if (diffDays === 1) {
    return t("calendar.relativeDay.tomorrow");
  }

  if (diffDays === 0) {
    return t("calendar.relativeDay.today");
  }

  if (diffDays === -1) {
    return t("calendar.relativeDay.yesterday");
  }

  return t("calendar.relativeDay.daysAgo", { count: Math.abs(diffDays) });
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
  const { t, i18n } = useTranslation();
  const {
    events: calendarEvents,
    isLoading: isLoadingEvents,
    error: calendarEventsError,
  } = useCalendarEvents();

  const languagePresentation = useMemo(
    () => getLanguagePresentation(i18n.language),
    [i18n.language],
  );
  const {
    direction,
    locale: dateLocale,
    numberingSystem,
  } = languagePresentation;

  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        month: "long",
        year: "numeric",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const dayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        weekday: "short",
        day: "numeric",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const longDayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        weekday: "long",
        month: "long",
        day: "numeric",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const weekdayFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        weekday: "short",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const dayNumberFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        day: "numeric",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        hour: "numeric",
        minute: "2-digit",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const rangeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(dateLocale, {
        month: "short",
        day: "numeric",
        numberingSystem,
      }),
    [dateLocale, numberingSystem],
  );

  const sortedEvents = useMemo(
    () =>
      [...calendarEvents].sort(
        (first, second) =>
          new Date(first.start).getTime() - new Date(second.start).getTime(),
      ),
    [calendarEvents],
  );

  const today = useMemo(() => {
    const reference = new Date();
    reference.setHours(0, 0, 0, 0);
    return reference;
  }, []);

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

  const workloadSnapshot = useMemo(() => {
    return filteredEvents.reduce(
      (previous, event) => {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const durationInMinutes = Math.max(
          0,
          Math.round((end.getTime() - start.getTime()) / (1000 * 60)),
        );

        const next = { ...previous };
        next.totalEvents += 1;
        next.totalMinutes += durationInMinutes;

        if (event.category === "training") {
          next.trainingCount += 1;
          next.trainingMinutes += durationInMinutes;
        } else {
          next.competitionCount += 1;
          next.competitionMinutes += durationInMinutes;
        }

        return next;
      },
      {
        totalEvents: 0,
        totalMinutes: 0,
        trainingCount: 0,
        trainingMinutes: 0,
        competitionCount: 0,
        competitionMinutes: 0,
      },
    );
  }, [filteredEvents]);

  const [view, setView] = useState<CalendarView>("month");
  const [selectedDayKey, setSelectedDayKey] = useState<string>("");
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const eventModalCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const initial = new Date();
    initial.setDate(1);
    initial.setHours(0, 0, 0, 0);
    return initial;
  });

  const firstDayOfCurrentMonth = useMemo(() => {
    const reference = new Date(currentMonth);
    reference.setDate(1);
    reference.setHours(0, 0, 0, 0);
    return reference;
  }, [currentMonth]);

  const lastDayOfCurrentMonth = useMemo(() => {
    const reference = new Date(firstDayOfCurrentMonth);
    reference.setMonth(reference.getMonth() + 1);
    reference.setDate(0);
    reference.setHours(0, 0, 0, 0);
    return reference;
  }, [firstDayOfCurrentMonth]);

  const monthGridDays = useMemo<MonthDay[]>(() => {
    const start = startOfWeek(firstDayOfCurrentMonth);
    const end = endOfWeek(new Date(lastDayOfCurrentMonth));
    const days: MonthDay[] = [];
    const cursor = new Date(start);

    while (cursor.getTime() <= end.getTime()) {
      const dayDate = new Date(cursor);
      const key = getDateKey(dayDate);
      const eventsOnDay = filteredEvents.filter((event) =>
        isSameDay(new Date(event.start), dayDate),
      );

      days.push({
        key,
        date: dayDate,
        inCurrentMonth:
          dayDate.getMonth() === firstDayOfCurrentMonth.getMonth(),
        events: eventsOnDay,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return days;
  }, [filteredEvents, firstDayOfCurrentMonth, lastDayOfCurrentMonth]);

  const weekdayLabels = useMemo(() => {
    const start = startOfWeek(firstDayOfCurrentMonth);
    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return weekdayFormatter.format(date);
    });
  }, [firstDayOfCurrentMonth, weekdayFormatter]);

  const monthEventsCount = useMemo(
    () =>
      monthGridDays
        .filter((day) => day.inCurrentMonth)
        .reduce((total, day) => total + day.events.length, 0),
    [monthGridDays],
  );

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
          label: t("calendar.weekView.weekLabel", {
            start: rangeFormatter.format(weekStart),
          }),
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
  }, [filteredEvents, dayFormatter, rangeFormatter, t]);

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
  }, [filteredEvents, dayFormatter, longDayFormatter]);

  const goToPreviousMonth = () => {
    setCurrentMonth((previous) => {
      const next = new Date(previous);
      next.setMonth(previous.getMonth() - 1);
      next.setDate(1);
      next.setHours(0, 0, 0, 0);
      return next;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((previous) => {
      const next = new Date(previous);
      next.setMonth(previous.getMonth() + 1);
      next.setDate(1);
      next.setHours(0, 0, 0, 0);
      return next;
    });
  };

  const activeCategoryCount =
    Object.values(activeCategories).filter(Boolean).length;

  const toggleCategory = (category: CalendarEvent["category"]) => {
    setActiveCategories((previous) => ({
      ...previous,
      [category]: !previous[category],
    }));
  };

  const closeEventModal = useCallback(() => {
    setActiveEvent(null);
  }, []);

  useEffect(() => {
    if (dayOptions.length === 0) {
      setSelectedDayKey("");
      return;
    }

    const hasSelectedDay = dayOptions.some(
      (option) => option.key === selectedDayKey,
    );

    if (hasSelectedDay) {
      return;
    }

    const upcomingOption = dayOptions.find(
      (option) => option.date.getTime() >= today.getTime(),
    );

    const fallbackOption = upcomingOption ?? dayOptions[dayOptions.length - 1];

    setSelectedDayKey(fallbackOption.key);
  }, [dayOptions, selectedDayKey, today]);

  const selectedDay = dayOptions.find(
    (option) => option.key === selectedDayKey,
  );
  const eventsOnSelectedDay = selectedDay
    ? filteredEvents.filter((event) =>
        isSameDay(new Date(event.start), selectedDay.date),
      )
    : [];

  const handleEventClick = (event: CalendarEvent) => {
    setActiveEvent(event);
  };

  const activeEventStart = useMemo(() => {
    if (!activeEvent) {
      return undefined;
    }

    return new Date(activeEvent.start);
  }, [activeEvent]);

  const activeEventEnd = useMemo(() => {
    if (!activeEvent) {
      return undefined;
    }

    return new Date(activeEvent.end);
  }, [activeEvent]);

  const activeEventStartTimeLabel = useMemo(() => {
    if (!activeEventStart) {
      return undefined;
    }

    return timeFormatter.format(activeEventStart);
  }, [activeEventStart, timeFormatter]);

  const activeEventEndTimeLabel = useMemo(() => {
    if (!activeEventEnd) {
      return undefined;
    }

    return timeFormatter.format(activeEventEnd);
  }, [activeEventEnd, timeFormatter]);

  const activeEventDurationLabel = useMemo(() => {
    if (!activeEventStart || !activeEventEnd) {
      return undefined;
    }

    const minutes = Math.max(
      0,
      Math.round(
        (activeEventEnd.getTime() - activeEventStart.getTime()) / (1000 * 60),
      ),
    );

    return formatDuration(minutes, t);
  }, [activeEventEnd, activeEventStart, t]);

  const activeEventOccursOnLabel = useMemo(() => {
    if (!activeEventStart) {
      return undefined;
    }

    const dateLabel = longDayFormatter.format(activeEventStart);
    const relativeLabel = formatRelativeDay(activeEventStart, t);

    if (relativeLabel) {
      return t("calendar.eventModal.occursOn", {
        date: dateLabel,
        relative: relativeLabel,
      });
    }

    return t("calendar.eventModal.occursOnWithoutRelative", {
      date: dateLabel,
    });
  }, [activeEventStart, longDayFormatter, t]);

  const activeEventLocationLabel = useMemo(() => {
    if (!activeEvent) {
      return undefined;
    }

    return t(activeEvent.locationKey);
  }, [activeEvent, t]);

  const activeEventCoachLabel = useMemo(() => {
    if (!activeEvent || activeEvent.category !== "training") {
      return undefined;
    }

    return t(activeEvent.coachKey);
  }, [activeEvent, t]);

  const activeEventLevelLabel = useMemo(() => {
    if (!activeEvent || activeEvent.category !== "competition") {
      return undefined;
    }

    return t(`calendar.levels.${activeEvent.level}`);
  }, [activeEvent, t]);

  const activeEventCheckInValue = useMemo(() => {
    if (!activeEvent || activeEvent.category !== "competition") {
      return undefined;
    }

    const checkIn = new Date(activeEvent.checkIn);

    return t("calendar.eventModal.details.checkInValue", {
      time: timeFormatter.format(checkIn),
    });
  }, [activeEvent, t, timeFormatter]);

  const eventModalTitleId = activeEvent
    ? `calendar-event-modal-title-${activeEvent.id}`
    : undefined;
  const eventModalDescriptionId =
    activeEvent && activeEventOccursOnLabel
      ? `calendar-event-modal-description-${activeEvent.id}`
      : undefined;

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

  const upcomingEventStart = useMemo(() => {
    if (!upcomingEvent) {
      return undefined;
    }

    return new Date(upcomingEvent.start);
  }, [upcomingEvent]);

  const upcomingEventEnd = useMemo(() => {
    if (!upcomingEvent) {
      return undefined;
    }

    return new Date(upcomingEvent.end);
  }, [upcomingEvent]);

  const upcomingEventRelativeText = useMemo(
    () => (upcomingEventStart ? formatRelativeDay(upcomingEventStart, t) : ""),
    [t, upcomingEventStart],
  );

  const hasInitializedMonthRef = useRef(false);

  useEffect(() => {
    if (hasInitializedMonthRef.current) {
      return;
    }

    if (!upcomingEventStart && filteredEvents.length === 0) {
      return;
    }

    const initialReference = new Date(upcomingEventStart ?? today);
    initialReference.setDate(1);
    initialReference.setHours(0, 0, 0, 0);
    setCurrentMonth(initialReference);
    hasInitializedMonthRef.current = true;
  }, [filteredEvents.length, today, upcomingEventStart]);

  return (
    <>
      <section id="calendar" className="space-y-6" dir={direction}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
              {t("calendar.title")}
            </h2>
            <p className="text-sm text-red-200/75">
              {t("calendar.description")}
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
                {t(`calendar.viewOptions.${option}`)}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length > 0 ? (
          <RedSurface
            tone="glass"
            className="flex flex-col gap-6 rounded-3xl border border-red-500/25 p-6 text-red-100 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {t("calendar.workload.heading")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-red-50">
                {t("calendar.workload.summary", {
                  count: workloadSnapshot.totalEvents,
                })}
              </h3>
              <p className="mt-2 text-sm text-red-200/75">
                {t("calendar.workload.description")}
              </p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-red-200/70">
                  {t("calendar.workload.metrics.all.label")}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-red-50">
                  {formatDuration(workloadSnapshot.totalMinutes, t)}
                </dd>
                <dd className="text-xs text-red-200/70">
                  {t("calendar.workload.metrics.all.sublabel")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-red-200/70">
                  {t("calendar.workload.metrics.training.label")}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-red-50">
                  {workloadSnapshot.trainingCount}{" "}
                  <span className="text-sm font-normal text-red-200/70">
                    · {formatDuration(workloadSnapshot.trainingMinutes, t)}
                  </span>
                </dd>
                <dd className="text-xs text-red-200/70">
                  {t("calendar.workload.metrics.training.sublabel")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-red-200/70">
                  {t("calendar.workload.metrics.competition.label")}
                </dt>
                <dd className="mt-1 text-2xl font-semibold text-red-50">
                  {workloadSnapshot.competitionCount}{" "}
                  <span className="text-sm font-normal text-red-200/70">
                    · {formatDuration(workloadSnapshot.competitionMinutes, t)}
                  </span>
                </dd>
                <dd className="text-xs text-red-200/70">
                  {t("calendar.workload.metrics.competition.sublabel")}
                </dd>
              </div>
            </dl>
          </RedSurface>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 rounded-3xl p-6 text-red-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {t("calendar.upcoming.heading")}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-red-50">
                  {upcomingEvent
                    ? t(upcomingEvent.titleKey)
                    : t("calendar.upcoming.empty")}
                </h3>
              </div>
              {upcomingEvent ? (
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[upcomingEvent.category]}`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${categoryAccentMap[upcomingEvent.category]}`}
                  />
                  {t(`calendar.categories.${upcomingEvent.category}.label`)}
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
                  {t(upcomingEvent.locationKey)}
                </p>
                {upcomingEvent.category === "training" ? (
                  <p>
                    {t("calendar.upcoming.coach", {
                      name: t(upcomingEvent.coachKey),
                    })}
                  </p>
                ) : (
                  <p>
                    {t("calendar.upcoming.competitionDetails", {
                      level: t(`calendar.levels.${upcomingEvent.level}`),
                      time: timeFormatter.format(
                        new Date(upcomingEvent.checkIn),
                      ),
                    })}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-200/70">
                {t("calendar.upcoming.fallback")}
              </p>
            )}
          </RedSurface>

          <RedSurface
            tone="glass"
            className="flex flex-col gap-4 rounded-3xl border border-red-500/25 p-6 text-red-50"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {t("calendar.filters.heading")}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-red-50">
                {t("calendar.filters.title")}
              </h3>
              <p className="mt-2 text-sm text-red-200/75">
                {t("calendar.filters.description")}
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
                    className={`h-2.5 w-2.5 rounded-full ${categoryAccentMap[category]}`}
                  />
                  {t(`calendar.categories.${category}.label`)}
                </button>
              ))}
            </div>
            <div className="space-y-3 text-sm text-red-200/75">
              {categoryOrder.map((category) => (
                <div key={category} className="flex items-start gap-3">
                  <span
                    className={`mt-1 h-2.5 w-2.5 rounded-full ${categoryAccentMap[category]}`}
                    aria-hidden
                  />
                  <div>
                    <p className="font-semibold text-red-50">
                      {t(`calendar.categories.${category}.label`)}
                    </p>
                    <p>{t(`calendar.categories.${category}.description`)}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-red-200/60">
              {activeCategoryCount === categoryOrder.length
                ? t("calendar.filters.status.all")
                : activeCategoryCount === 1
                  ? t("calendar.filters.status.single")
                  : t("calendar.filters.status.none")}
            </p>
          </RedSurface>
        </div>

        {filteredEvents.length === 0 ? (
          <RedSurface
            tone="muted"
            className="rounded-3xl p-6 text-sm text-red-200/80"
          >
            {t("calendar.states.noEventsFiltered")}
          </RedSurface>
        ) : null}

        {filteredEvents.length > 0 && view === "month" ? (
          <RedSurface as="article" tone="muted" className="p-6 text-red-50">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200/80 transition hover:border-red-400/45 hover:text-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                aria-label={t("calendar.monthView.previous")}
              >
                <ChevronLeft
                  size={16}
                  aria-hidden
                  className="text-red-200/70"
                />
                {t("calendar.monthView.previousShort")}
              </button>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-red-50">
                  {monthFormatter.format(firstDayOfCurrentMonth)}
                </h3>
                <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {t("calendar.monthView.eventsCount", {
                    count: monthEventsCount,
                  })}
                </p>
              </div>
              <button
                type="button"
                onClick={goToNextMonth}
                className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-200/80 transition hover:border-red-400/45 hover:text-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                aria-label={t("calendar.monthView.next")}
              >
                {t("calendar.monthView.nextShort")}
                <ChevronRight
                  size={16}
                  aria-hidden
                  className="text-red-200/70"
                />
              </button>
            </header>

            <div className="mt-6 grid grid-cols-7 gap-3 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-red-200/60">
              {weekdayLabels.map((label) => (
                <div key={label}>{label}</div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 gap-3">
              {monthGridDays.map((day) => {
                const isToday = isSameDay(day.date, today);

                return (
                  <div
                    key={day.key}
                    className={`flex min-h-[148px] flex-col gap-3 rounded-2xl border p-3 transition ${
                      day.events.length > 0
                        ? "border-red-400/35 bg-red-950/55"
                        : "border-red-500/20 bg-red-950/30"
                    } ${
                      isToday ? "ring-1 ring-inset ring-red-400/70" : ""
                    } ${day.inCurrentMonth ? "" : "opacity-60"}`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-red-200/70">
                      <span className="text-red-200/80">
                        {dayNumberFormatter.format(day.date)}
                      </span>
                      {isToday ? (
                        <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-red-50">
                          {t("calendar.weekView.today")}
                        </span>
                      ) : null}
                    </div>
                    <div className="space-y-2 text-[11px] leading-snug text-red-200/75">
                      {day.events.length > 0
                        ? day.events.map((event) => {
                            const startDate = new Date(event.start);
                            const endDate = new Date(event.end);

                            return (
                              <button
                                key={event.id}
                                type="button"
                                onClick={() => handleEventClick(event)}
                                className="w-full rounded-xl border border-red-500/25 bg-red-950/50 p-2 text-left transition hover:border-red-400/45 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-[11px] font-semibold text-red-50">
                                    {t(event.titleKey)}
                                  </p>
                                  <span
                                    className={`inline-flex h-5 min-w-[1.75rem] items-center justify-center rounded-full border px-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${typeStyles[event.category]}`}
                                  >
                                    {t(
                                      `calendar.categories.${event.category}.shortLabel`,
                                    )}
                                  </span>
                                </div>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-red-200/60">
                                  {timeFormatter.format(startDate)} –{" "}
                                  {timeFormatter.format(endDate)}
                                </p>
                                <p className="mt-1 text-[11px] text-red-200/70">
                                  {t(event.locationKey)}
                                </p>
                              </button>
                            );
                          })
                        : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </RedSurface>
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
                    {t("calendar.weekView.scheduledEvents", {
                      count: week.days.reduce(
                        (total, day) => total + day.events.length,
                        0,
                      ),
                    })}
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
                      } ${
                        isSameDay(day.date, today)
                          ? "ring-1 ring-inset ring-red-400/70"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide text-red-200/70">
                        <span>{day.label}</span>
                        {isSameDay(day.date, today) ? (
                          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em] text-red-50">
                            {t("calendar.weekView.today")}
                          </span>
                        ) : null}
                      </div>
                      <div className="space-y-3">
                        {day.events.length > 0 ? (
                          day.events.map((event) => {
                            const startDate = new Date(event.start);
                            const endDate = new Date(event.end);

                            return (
                              <RedSurface
                                key={event.id}
                                as="button"
                                type="button"
                                tone="glass"
                                onClick={() => handleEventClick(event)}
                                className="w-full rounded-xl p-3 text-left transition hover:border-red-400/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                              >
                                <p className="text-sm font-semibold text-red-50">
                                  {t(event.titleKey)}
                                </p>
                                <p className="text-xs text-red-200/75">
                                  {timeFormatter.format(startDate)} –{" "}
                                  {timeFormatter.format(endDate)}
                                </p>
                                <p className="mt-1 text-xs text-red-200/70">
                                  {t(event.locationKey)}
                                </p>
                                <span
                                  className={`mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] ${typeStyles[event.category]}`}
                                >
                                  {t(
                                    `calendar.categories.${event.category}.shortLabel`,
                                  )}
                                </span>
                              </RedSurface>
                            );
                          })
                        ) : (
                          <p className="text-xs text-red-200/60">
                            {t("calendar.states.noScheduled")}
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
              {dayOptions.map((option) => {
                const isActive = selectedDayKey === option.key;
                const isToday = isSameDay(option.date, today);

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSelectedDayKey(option.key)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                      isActive
                        ? "border-red-400/55 bg-red-500/20 text-red-50 shadow-[0_12px_30px_rgba(220,38,38,0.2)]"
                        : "border-red-500/25 bg-red-950/50 text-red-200/80 hover:text-red-100"
                    } ${isToday ? "ring-1 ring-inset ring-red-300/60" : ""}`}
                  >
                    <span>{option.shortLabel}</span>
                    {isToday ? (
                      <span className="ml-2 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-50">
                        {t("calendar.weekView.today")}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <RedSurface as="article" tone="muted" className="p-6 text-red-50">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-red-50">
                    {selectedDay?.label ?? t("calendar.states.noDaySelected")}
                  </h3>
                  <p className="text-sm text-red-200/75">
                    {t("calendar.dayView.headerDescription")}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {t("calendar.dayView.eventCount", {
                    count: eventsOnSelectedDay.length,
                  })}
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
                        as="button"
                        type="button"
                        tone="glass"
                        onClick={() => handleEventClick(event)}
                        className="w-full rounded-2xl p-5 text-left transition hover:border-red-400/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-red-200/75">
                          <span>
                            {timeFormatter.format(startDate)} –{" "}
                            {timeFormatter.format(endDate)}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[event.category]}`}
                          >
                            {t(`calendar.categories.${event.category}.badge`)}
                          </span>
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-base font-semibold text-red-50">
                            {t(event.titleKey)}
                          </p>
                          <p className="text-sm text-red-200/75">
                            {t(event.locationKey)}
                          </p>
                          {event.category === "training" ? (
                            <p className="text-xs text-red-200/70">
                              {t("calendar.dayView.coachLabel", {
                                name: t(event.coachKey),
                              })}
                            </p>
                          ) : (
                            <p className="text-xs text-red-200/70">
                              {t("calendar.dayView.checkIn", {
                                time: timeFormatter.format(
                                  new Date(event.checkIn),
                                ),
                              })}
                            </p>
                          )}
                        </div>
                      </RedSurface>
                    );
                  })
                ) : (
                  <p className="text-sm text-red-200/60">
                    {t("calendar.states.noScheduledDay")}
                  </p>
                )}
              </div>
            </RedSurface>
          </div>
        ) : null}
      </section>
      {activeEvent ? (
        <Modal
          isOpen
          onClose={closeEventModal}
          labelledBy={eventModalTitleId}
          describedBy={eventModalDescriptionId}
          initialFocusRef={eventModalCloseButtonRef}
        >
          <RedSurface
            tone="muted"
            className="relative overflow-hidden rounded-3xl p-6 text-left shadow-[0_30px_80px_rgba(127,29,29,0.55)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] ${typeStyles[activeEvent.category]}`}
                >
                  {t(`calendar.categories.${activeEvent.category}.badge`)}
                </span>
                <h3
                  id={eventModalTitleId}
                  className="mt-4 text-xl font-semibold text-red-50"
                >
                  {t(activeEvent.titleKey)}
                </h3>
                {activeEventOccursOnLabel ? (
                  <p
                    id={eventModalDescriptionId}
                    className="mt-2 text-sm text-red-200/75"
                  >
                    {activeEventOccursOnLabel}
                  </p>
                ) : null}
              </div>
              <button
                ref={eventModalCloseButtonRef}
                type="button"
                onClick={closeEventModal}
                aria-label={t("calendar.eventModal.aria.close")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-500/30 bg-red-900/40 text-lg text-red-200/80 transition hover:border-red-400/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                <span aria-hidden>&times;</span>
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {t("calendar.eventModal.schedule.heading")}
                </p>
                <dl className="mt-3 grid gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.3em] text-red-200/60">
                      {t("calendar.eventModal.schedule.start")}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-red-50">
                      {activeEventStartTimeLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.3em] text-red-200/60">
                      {t("calendar.eventModal.schedule.end")}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold text-red-50">
                      {activeEventEndTimeLabel}
                    </dd>
                  </div>
                  {activeEventDurationLabel ? (
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.3em] text-red-200/60">
                        {t("calendar.eventModal.schedule.duration")}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-red-50">
                        {activeEventDurationLabel}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                  {t("calendar.eventModal.details.heading")}
                </p>
                <dl className="mt-3 space-y-4 text-sm">
                  <div>
                    <dt className="text-red-200/70">
                      {t("calendar.eventModal.details.location")}
                    </dt>
                    <dd className="mt-1 text-red-50">
                      {activeEventLocationLabel}
                    </dd>
                  </div>
                  {activeEventCoachLabel ? (
                    <div>
                      <dt className="text-red-200/70">
                        {t("calendar.eventModal.details.coach")}
                      </dt>
                      <dd className="mt-1 text-red-50">
                        {activeEventCoachLabel}
                      </dd>
                    </div>
                  ) : null}
                  {activeEventLevelLabel ? (
                    <div>
                      <dt className="text-red-200/70">
                        {t("calendar.eventModal.details.level")}
                      </dt>
                      <dd className="mt-1 text-red-50">
                        {activeEventLevelLabel}
                      </dd>
                    </div>
                  ) : null}
                  {activeEventCheckInValue ? (
                    <div>
                      <dt className="text-red-200/70">
                        {t("calendar.eventModal.details.checkInLabel")}
                      </dt>
                      <dd className="mt-1 text-red-50">
                        {activeEventCheckInValue}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>
          </RedSurface>
        </Modal>
      ) : null}
    </>
  );
}

export default CalendarSection;
