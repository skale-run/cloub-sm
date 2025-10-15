import { useMemo, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { getLanguagePresentation } from "../../lib/i18n";
import { competitionCalendarEvents } from "../calendar/calendarEvents";

const levelColors: Record<
  (typeof competitionCalendarEvents)[number]["level"],
  string
> = {
  regional: "from-amber-500/30 to-amber-400/40 text-amber-100",
  national: "from-red-500/30 to-red-400/40 text-red-100",
  international: "from-fuchsia-500/30 to-fuchsia-400/40 text-fuchsia-100",
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
  const events = competitionCalendarEvents.map((event) => ({
    id: event.id,
    title: t(event.titleKey, { ns: "translation" }),
    level: event.level,
    location: t(event.locationKey, { ns: "translation" }),
    dateLabel: dateFormatter.format(new Date(event.start)),
    checkIn: timeFormatter.format(new Date(event.checkIn)),
  }));

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
            className="group flex h-full flex-col justify-between rounded-3xl p-6 text-red-50 shadow-[0_25px_60px_rgba(127,29,29,0.4)] transition hover:-translate-y-1 hover:border-red-400/45 hover:bg-red-950/65"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-wide ${levelColors[event.level]}`}
              >
                {t(`calendar.levels.${event.level}`, { ns: "translation" })}
              </span>
              <span className="text-xs uppercase tracking-wide text-red-200/70">
                {t("checkIn", { time: event.checkIn })}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-red-50">
                {event.title}
              </h3>
              <p className="text-sm text-red-100/80">{event.dateLabel}</p>
              <p className="text-sm text-red-200/75">{event.location}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {t("logistics")}
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
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
