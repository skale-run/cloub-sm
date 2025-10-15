import type { CSSProperties, ReactElement } from "react";
import { useEffect, useMemo, useState } from "react";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { cn } from "../../lib/cn";
import { getLanguagePresentation } from "../../lib/i18n";
import {
  calendarCategoryTheme,
  calendarEvents,
  type CalendarEvent,
} from "./calendarEvents";

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

const textPalette = {
  primary: {
    color: "var(--color-text-primary, #ffe3e7)",
  },
  secondary: {
    color:
      "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 82%, transparent)",
  },
  subtle: {
    color:
      "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 68%, transparent)",
  },
  faint: {
    color:
      "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 55%, transparent)",
  },
  badge: {
    color: "var(--color-text-inverse, #fff9fb)",
  },
} satisfies Record<string, CSSProperties>;

const categoryBadgeStyles = Object.fromEntries(
  Object.entries(calendarCategoryTheme).map(([category, theme]) => [
    category,
    {
      color: theme.badge.color,
      background: theme.badge.background,
      borderColor: theme.badge.borderColor,
      boxShadow: theme.badge.shadow,
    } satisfies CSSProperties,
  ]),
) as Record<CalendarEvent["category"], CSSProperties>;

const categoryAccentStyles = Object.fromEntries(
  Object.entries(calendarCategoryTheme).map(([category, theme]) => [
    category,
    {
      backgroundColor: theme.accentColor,
    } satisfies CSSProperties,
  ]),
) as Record<CalendarEvent["category"], CSSProperties>;

const categoryToggleActiveStyles = Object.fromEntries(
  Object.entries(calendarCategoryTheme).map(([category, theme]) => [
    category,
    {
      background: theme.badge.background,
      borderColor: theme.badge.borderColor,
      color: theme.badge.color,
      boxShadow: `0 12px 30px color-mix(in srgb, ${theme.accentColor} 28%, transparent)`,
    } satisfies CSSProperties,
  ]),
) as Record<CalendarEvent["category"], CSSProperties>;

const toggleInactiveStyle: CSSProperties = {
  borderColor:
    "color-mix(in srgb, var(--app-border-color, rgba(248, 113, 113, 0.35)) 70%, transparent)",
  background:
    "color-mix(in srgb, var(--color-primary-900, #39040f) 45%, transparent)",
  color:
    "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 78%, transparent)",
};

const dayToggleActiveStyle: CSSProperties = {
  background:
    "color-mix(in srgb, var(--color-primary-600, #c8183a) 28%, transparent)",
  borderColor:
    "color-mix(in srgb, var(--color-primary-400, #f85a73) 55%, transparent)",
  color: "var(--color-text-primary, #ffe3e7)",
  boxShadow:
    "0 12px 30px color-mix(in srgb, var(--color-primary, rgb(232 56 86)) 24%, transparent)",
};

const todayBadgeStyle: CSSProperties = {
  background:
    "color-mix(in srgb, var(--color-primary-500, #e83856) 24%, transparent)",
  color: "var(--color-text-primary, #ffe3e7)",
};

const viewToggleContainerStyle: CSSProperties = {
  borderColor:
    "color-mix(in srgb, var(--app-border-highlight, rgba(248, 90, 115, 0.6)) 70%, transparent)",
  background:
    "color-mix(in srgb, var(--color-primary-900, #39040f) 56%, transparent)",
  color:
    "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 80%, transparent)",
};

const viewToggleActiveStyle: CSSProperties = {
  background:
    "color-mix(in srgb, var(--color-primary-600, #c8183a) 32%, transparent)",
  color: "var(--color-text-primary, #ffe3e7)",
  boxShadow:
    "0 8px 20px color-mix(in srgb, var(--color-primary, rgb(232 56 86)) 30%, transparent)",
  borderColor:
    "color-mix(in srgb, var(--color-primary-400, #f85a73) 55%, transparent)",
};

const viewToggleInactiveStyle: CSSProperties = {
  color:
    "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 70%, transparent)",
};

const focusOutlineStyle: CSSProperties = {
  outlineColor: "var(--theme-focus-ring, #0ea5e9)",
  outlineOffset: "var(--focus-ring-offset, 2px)",
};

function formatDuration(
  minutes: number,
  t: TFunction<"translation">,
): string {
  if (minutes <= 0) {
    return t("calendar.duration.none");
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return [
    hours > 0
      ? t("calendar.duration.hours", { count: hours })
      : undefined,
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

function formatRelativeDay(
  target: Date,
  t: TFunction<"translation">,
): string {
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
    [],
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
      (
        previous,
        event,
      ) => {
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
  }, [filteredEvents, monthFormatter]);

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
    ? formatRelativeDay(upcomingEventStart, t)
    : "";

  return (
    <section id="calendar" className="space-y-6" dir={direction}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2
            className="text-xl font-semibold sm:text-2xl"
            style={textPalette.primary}
          >
            {t("calendar.title")}
          </h2>
          <p className="text-sm" style={textPalette.secondary}>
            {t("calendar.description")}
          </p>
        </div>
        <div
          className="inline-flex rounded-full border p-1 text-xs font-semibold"
          style={viewToggleContainerStyle}
        >
          {calendarViewOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={cn(
                "rounded-full px-4 py-1.5 transition",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:shadow-[var(--focus-ring-shadow)]",
                "hover:text-[color:var(--color-text-primary,#ffe3e7)]",
              )}
              style={{
                ...focusOutlineStyle,
                ...(view === option
                  ? viewToggleActiveStyle
                  : viewToggleInactiveStyle),
              }}
            >
              {t(`calendar.viewOptions.${option}`)}
            </button>
          ))}
        </div>
      </div>

      {filteredEvents.length > 0 ? (
        <RedSurface
          tone="glass"
          className="flex flex-col gap-6 rounded-3xl p-6 lg:flex-row lg:items-center lg:justify-between"
          style={textPalette.primary}
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.35em]"
              style={textPalette.faint}
            >
              {t("calendar.workload.heading")}
            </p>
            <h3
              className="mt-1 text-lg font-semibold"
              style={textPalette.primary}
            >
              {t("calendar.workload.summary", {
                count: workloadSnapshot.totalEvents,
              })}
            </h3>
            <p className="mt-2 text-sm" style={textPalette.secondary}>
              {t("calendar.workload.description")}
            </p>
          </div>
          <dl className="grid gap-4 sm:grid-cols-3">
            <div>
              <dt
                className="text-xs font-semibold uppercase tracking-wide"
                style={textPalette.faint}
              >
                {t("calendar.workload.metrics.all.label")}
              </dt>
              <dd
                className="mt-1 text-2xl font-semibold"
                style={textPalette.primary}
              >
                {formatDuration(workloadSnapshot.totalMinutes, t)}
              </dd>
              <dd className="text-xs" style={textPalette.faint}>
                {t("calendar.workload.metrics.all.sublabel")}
              </dd>
            </div>
            <div>
              <dt
                className="text-xs font-semibold uppercase tracking-wide"
                style={textPalette.faint}
              >
                {t("calendar.workload.metrics.training.label")}
              </dt>
              <dd
                className="mt-1 text-2xl font-semibold"
                style={textPalette.primary}
              >
                {workloadSnapshot.trainingCount}{" "}
                <span className="text-sm font-normal" style={textPalette.faint}>
                  · {formatDuration(workloadSnapshot.trainingMinutes, t)}
                </span>
              </dd>
              <dd className="text-xs" style={textPalette.faint}>
                {t("calendar.workload.metrics.training.sublabel")}
              </dd>
            </div>
            <div>
              <dt
                className="text-xs font-semibold uppercase tracking-wide"
                style={textPalette.faint}
              >
                {t("calendar.workload.metrics.competition.label")}
              </dt>
              <dd
                className="mt-1 text-2xl font-semibold"
                style={textPalette.primary}
              >
                {workloadSnapshot.competitionCount}{" "}
                <span className="text-sm font-normal" style={textPalette.faint}>
                  · {formatDuration(workloadSnapshot.competitionMinutes, t)}
                </span>
              </dd>
              <dd className="text-xs" style={textPalette.faint}>
                {t("calendar.workload.metrics.competition.sublabel")}
              </dd>
            </div>
          </dl>
        </RedSurface>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface
          tone="muted"
          className="flex flex-col gap-4 rounded-3xl p-6"
          style={textPalette.primary}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p
                className="text-xs uppercase tracking-[0.35em]"
                style={textPalette.faint}
              >
                {t("calendar.upcoming.heading")}
              </p>
              <h3
                className="mt-1 text-lg font-semibold"
                style={textPalette.primary}
              >
                {upcomingEvent
                  ? t(upcomingEvent.titleKey)
                  : t("calendar.upcoming.empty")}
              </h3>
            </div>
            {upcomingEvent ? (
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                style={categoryBadgeStyles[upcomingEvent.category]}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={categoryAccentStyles[upcomingEvent.category]}
                />
                {t(`calendar.categories.${upcomingEvent.category}.label`)}
              </span>
            ) : null}
          </div>

          {upcomingEvent && upcomingEventStart && upcomingEventEnd ? (
            <div className="space-y-2 text-sm" style={textPalette.subtle}>
              <div
                className="flex flex-wrap items-center gap-2"
                style={textPalette.primary}
              >
                <span className="text-base font-semibold" style={textPalette.primary}>
                  {longDayFormatter.format(upcomingEventStart)}
                </span>
                <span
                  className="text-xs uppercase tracking-[0.35em]"
                  style={textPalette.faint}
                >
                  {upcomingEventRelativeText}
                </span>
              </div>
              <p style={textPalette.secondary}>
                {timeFormatter.format(upcomingEventStart)} –{" "}
                {timeFormatter.format(upcomingEventEnd)} ·{" "}
                {t(upcomingEvent.locationKey)}
              </p>
              {upcomingEvent.category === "training" ? (
                <p style={textPalette.secondary}>
                  {t("calendar.upcoming.coach", {
                    name: t(upcomingEvent.coachKey),
                  })}
                </p>
              ) : (
                <p style={textPalette.secondary}>
                  {t("calendar.upcoming.competitionDetails", {
                    level: t(`calendar.levels.${upcomingEvent.level}`),
                    time: timeFormatter.format(new Date(upcomingEvent.checkIn)),
                  })}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm" style={textPalette.faint}>
              {t("calendar.upcoming.fallback")}
            </p>
          )}
        </RedSurface>

        <RedSurface
          tone="glass"
          className="flex flex-col gap-4 rounded-3xl p-6"
          style={textPalette.primary}
        >
          <div>
            <p
              className="text-xs uppercase tracking-[0.35em]"
              style={textPalette.faint}
            >
              {t("calendar.filters.heading")}
            </p>
            <h3
              className="mt-1 text-lg font-semibold"
              style={textPalette.primary}
            >
              {t("calendar.filters.title")}
            </h3>
            <p className="mt-2 text-sm" style={textPalette.secondary}>
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
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:shadow-[var(--focus-ring-shadow)]",
                  "hover:text-[color:var(--color-text-primary,#ffe3e7)]",
                )}
                style={{
                  ...focusOutlineStyle,
                  ...(activeCategories[category]
                    ? categoryToggleActiveStyles[category]
                    : toggleInactiveStyle),
                }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={categoryAccentStyles[category]}
                />
                {t(`calendar.categories.${category}.label`)}
              </button>
            ))}
          </div>
          <div className="space-y-3 text-sm" style={textPalette.secondary}>
            {categoryOrder.map((category) => (
              <div key={category} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2.5 w-2.5 rounded-full"
                  style={categoryAccentStyles[category]}
                  aria-hidden
                />
                <div>
                  <p className="font-semibold" style={textPalette.primary}>
                    {t(`calendar.categories.${category}.label`)}
                  </p>
                  <p>{t(`calendar.categories.${category}.description`)}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs" style={textPalette.faint}>
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
          className="rounded-3xl p-6 text-sm"
          style={textPalette.secondary}
        >
          {t("calendar.states.noEventsFiltered")}
        </RedSurface>
      ) : null}

      {filteredEvents.length > 0 && view === "month" ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {months.map((month) => (
            <RedSurface
              key={month.id}
              as="article"
              tone="muted"
              className="flex flex-col gap-4 p-6"
              style={textPalette.primary}
            >
              <header className="flex items-center justify-between">
                <h3
                  className="text-lg font-semibold"
                  style={textPalette.primary}
                >
                  {month.label}
                </h3>
                <span
                  className="text-xs uppercase tracking-[0.35em]"
                  style={textPalette.faint}
                >
                  {t("calendar.monthView.eventsCount", {
                    count: month.events.length,
                  })}
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
                      className="rounded-2xl p-4 transition"
                      style={{
                        color: "var(--color-text-primary, #ffe3e7)",
                        borderColor:
                          "color-mix(in srgb, var(--app-border-highlight, rgba(248, 90, 115, 0.6)) 50%, transparent)",
                      }}
                    >
                      <div
                        className="flex flex-wrap items-center justify-between gap-3 text-sm"
                        style={textPalette.secondary}
                      >
                        <span className="font-semibold" style={textPalette.primary}>
                          {dayFormatter.format(startDate)}
                        </span>
                        <span>
                          {timeFormatter.format(startDate)} –{" "}
                          {timeFormatter.format(endDate)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p
                            className="text-base font-semibold"
                            style={textPalette.primary}
                          >
                            {t(event.titleKey)}
                          </p>
                          <p className="text-sm" style={textPalette.secondary}>
                            {t(event.locationKey)}
                          </p>
                        </div>
                        <span
                          className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                          style={categoryBadgeStyles[event.category]}
                        >
                          {t(`calendar.categories.${event.category}.badge`)}
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
              className="p-6"
              style={textPalette.primary}
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={textPalette.primary}
                  >
                    {week.label}
                  </h3>
                  <p
                    className="text-xs uppercase tracking-[0.35em]"
                    style={textPalette.faint}
                  >
                    {week.range}
                  </p>
                </div>
                <span className="text-xs" style={textPalette.faint}>
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
                    className="flex flex-col gap-3 rounded-2xl border p-4 transition"
                    style={{
                      ...(day.events.length > 0
                        ? {
                            borderColor:
                              "color-mix(in srgb, var(--app-border-highlight, rgba(248, 90, 115, 0.6)) 55%, transparent)",
                            background:
                              "color-mix(in srgb, var(--color-primary-900, #39040f) 55%, transparent)",
                            color: "var(--color-text-primary, #ffe3e7)",
                          }
                        : {
                            borderColor:
                              "color-mix(in srgb, var(--app-border-color, rgba(248, 113, 113, 0.35)) 70%, transparent)",
                            background:
                              "color-mix(in srgb, var(--color-primary-900, #39040f) 35%, transparent)",
                            color:
                              "color-mix(in srgb, var(--color-text-muted, rgb(243 212 213)) 72%, transparent)",
                          }),
                      ...(isSameDay(day.date, today)
                        ? {
                            boxShadow:
                              "0 0 0 1px color-mix(in srgb, var(--color-primary-300, #ff8899) 65%, transparent)",
                          }
                        : {}),
                    }}
                  >
                    <div
                      className="flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wide"
                      style={textPalette.faint}
                    >
                      <span style={textPalette.primary}>{day.label}</span>
                      {isSameDay(day.date, today) ? (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-[0.2em]"
                          style={todayBadgeStyle}
                        >
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
                              tone="glass"
                              className="rounded-xl p-3"
                              style={{
                                color: "var(--color-text-primary, #ffe3e7)",
                              }}
                            >
                              <p
                                className="text-sm font-semibold"
                                style={textPalette.primary}
                              >
                                {t(event.titleKey)}
                              </p>
                              <p className="text-xs" style={textPalette.secondary}>
                                {timeFormatter.format(startDate)} –{" "}
                                {timeFormatter.format(endDate)}
                              </p>
                              <p className="mt-1 text-xs" style={textPalette.faint}>
                                {t(event.locationKey)}
                              </p>
                              <span
                                className="mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em]"
                                style={categoryBadgeStyles[event.category]}
                              >
                                {t(
                                  `calendar.categories.${event.category}.shortLabel`,
                                )}
                              </span>
                            </RedSurface>
                          );
                        })
                      ) : (
                        <p className="text-xs" style={textPalette.faint}>
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
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-semibold transition",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:shadow-[var(--focus-ring-shadow)]",
                    "hover:text-[color:var(--color-text-primary,#ffe3e7)]",
                  )}
                  style={{
                    ...focusOutlineStyle,
                    ...(isActive ? dayToggleActiveStyle : toggleInactiveStyle),
                    ...(isToday && !isActive
                      ? {
                          boxShadow:
                            "0 0 0 1px color-mix(in srgb, var(--color-primary-300, #ff8899) 55%, transparent)",
                        }
                      : {}),
                  }}
                >
                  <span>{option.shortLabel}</span>
                  {isToday ? (
                    <span
                      className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={todayBadgeStyle}
                    >
                      {t("calendar.weekView.today")}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <RedSurface
            as="article"
            tone="muted"
            className="p-6"
            style={textPalette.primary}
          >
            <header className="flex items-start justify-between gap-3">
              <div>
                <h3
                  className="text-lg font-semibold"
                  style={textPalette.primary}
                >
                  {selectedDay?.label ?? t("calendar.states.noDaySelected")}
                </h3>
                <p className="text-sm" style={textPalette.secondary}>
                  {t("calendar.dayView.headerDescription")}
                </p>
              </div>
              <span
                className="text-xs uppercase tracking-[0.35em]"
                style={textPalette.faint}
              >
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
                      tone="glass"
                      className="rounded-2xl p-5 transition"
                      style={{
                        color: "var(--color-text-primary, #ffe3e7)",
                        borderColor:
                          "color-mix(in srgb, var(--app-border-highlight, rgba(248, 90, 115, 0.6)) 50%, transparent)",
                      }}
                    >
                      <div
                        className="flex flex-wrap items-center justify-between gap-3 text-sm"
                        style={textPalette.secondary}
                      >
                        <span>
                          {timeFormatter.format(startDate)} –{" "}
                          {timeFormatter.format(endDate)}
                        </span>
                        <span
                          className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                          style={categoryBadgeStyles[event.category]}
                        >
                          {t(`calendar.categories.${event.category}.badge`)}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p
                          className="text-base font-semibold"
                          style={textPalette.primary}
                        >
                          {t(event.titleKey)}
                        </p>
                        <p className="text-sm" style={textPalette.secondary}>
                          {t(event.locationKey)}
                        </p>
                        {event.category === "training" ? (
                          <p className="text-xs" style={textPalette.faint}>
                            {t("calendar.dayView.coachLabel", {
                              name: t(event.coachKey),
                            })}
                          </p>
                        ) : (
                          <p className="text-xs" style={textPalette.faint}>
                            {t("calendar.dayView.checkIn", {
                              time: timeFormatter.format(new Date(event.checkIn)),
                            })}
                          </p>
                        )}
                      </div>
                    </RedSurface>
                  );
                })
              ) : (
                <p className="text-sm" style={textPalette.faint}>
                  {t("calendar.states.noScheduledDay")}
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
