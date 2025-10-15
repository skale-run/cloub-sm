import { useMemo, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { getLanguagePresentation } from "../../lib/i18n";
import { competitionCalendarEvents } from "../calendar/calendarEvents";

const levelBadgeStyles: Record<
  (typeof competitionCalendarEvents)[number]["level"],
  string
> = {
  regional:
    "from-amber-500/30 via-amber-400/25 to-amber-500/10 text-amber-50 shadow-[0_10px_30px_rgba(217,119,6,0.3)]",
  national:
    "from-red-500/35 via-red-400/20 to-red-500/10 text-red-50 shadow-[0_10px_30px_rgba(248,113,113,0.3)]",
  international:
    "from-fuchsia-500/35 via-fuchsia-400/25 to-fuchsia-500/10 text-fuchsia-50 shadow-[0_10px_32px_rgba(217,70,239,0.28)]",
};

const levelBackdropStyles: Record<
  (typeof competitionCalendarEvents)[number]["level"],
  string
> = {
  regional: "from-amber-500/30 via-amber-500/10 to-transparent",
  national: "from-red-500/35 via-red-500/12 to-transparent",
  international: "from-fuchsia-500/35 via-fuchsia-500/12 to-transparent",
};

function CompetitionSection(): ReactElement {
  const { i18n, t } = useTranslation("competitions");
  const { locale } = getLanguagePresentation(i18n.language);
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    [locale],
  );
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: "numeric",
        minute: "2-digit",
      }),
    [locale],
  );
  const relativeTimeFormatter = useMemo(() => {
    if (typeof Intl.RelativeTimeFormat === "undefined") {
      return null;
    }

    try {
      return new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _error
    ) {
      return null;
    }
  }, [locale]);

  const events = competitionCalendarEvents.map((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const checkInDate = new Date(event.checkIn);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const normalizedStart = new Date(startDate);
    normalizedStart.setHours(0, 0, 0, 0);

    const diffDays = Math.round(
      (normalizedStart.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    const relativeDayLabel = relativeTimeFormatter
      ? relativeTimeFormatter.format(diffDays, "day")
      : "";

    const levelKey = `${event.level.charAt(0).toUpperCase()}${event.level.slice(
      1,
    )}`;

    const levelLabelCandidate = t(`levels.${levelKey}`, { defaultValue: "" });
    const levelLabel = levelLabelCandidate
      ? levelLabelCandidate
      : t(`calendar.levels.${event.level}`, { ns: "translation" });

    return {
      id: event.id,
      title: t(event.titleKey, { ns: "translation" }),
      level: event.level,
      levelLabel,
      location: t(event.locationKey, { ns: "translation" }),
      dateLabel: dateFormatter.format(startDate),
      checkIn: timeFormatter.format(checkInDate),
      timeRange: `${timeFormatter.format(startDate)} – ${timeFormatter.format(
        endDate,
      )}`,
      relativeDay: relativeDayLabel,
    };
  });

  return (
    <section id="competitions" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("heading")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("description")}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          {t("badge")}
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <RedSurface
            key={event.id}
            as="article"
            tone="muted"
            className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl p-6 text-red-50 shadow-[0_24px_64px_rgba(127,29,29,0.38)] transition hover:-translate-y-1 hover:border-red-400/45 hover:bg-red-950/70"
          >
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-x-6 -top-12 h-36 rounded-[48px] bg-gradient-to-br opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${levelBackdropStyles[event.level]}`}
            />
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <span
                  className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-wide ${levelBadgeStyles[event.level]}`}
                >
                  {event.levelLabel}
                </span>
                {event.relativeDay ? (
                  <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                    {event.relativeDay}
                  </p>
                ) : null}
              </div>
              <span className="inline-flex items-center rounded-full border border-red-400/35 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-red-100">
                {t("checkIn", { time: event.checkIn })}
              </span>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-red-50">
                {event.title}
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-red-100/85">{event.dateLabel}</p>
                <p className="text-red-100/80">{event.timeRange}</p>
                <p className="text-red-200/75">{event.location}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-red-400/20 pt-4">
              <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {t("logistics")}
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                {t("cta")}
              </button>
            </div>
          </RedSurface>
        ))}
      </div>
    </section>
  );
}

export default CompetitionSection;
