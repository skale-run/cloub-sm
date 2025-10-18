import { useMemo, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { getLanguagePresentation } from "../../lib/i18n";
import { useTrainingCalendarEvents } from "../calendar/calendarEvents";

function TrainingSection(): ReactElement {
  const { t, i18n } = useTranslation();
  const { locale } = getLanguagePresentation(i18n.language);
  const {
    events: trainingCalendarEvents,
    isLoading,
    error,
  } = useTrainingCalendarEvents();

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

  const weekNumber = 16;
  const weekLabel = t("training.weekLabel", {
    week: new Intl.NumberFormat(locale).format(weekNumber),
  });

  const sessions = trainingCalendarEvents.map((session) => {
    const start = new Date(session.start);
    const end = new Date(session.end);

    return {
      id: session.id,
      title: t(session.titleKey),
      coach: t(session.coachKey),
      location: t(session.locationKey),
      dateLabel: dateFormatter.format(start),
      timeLabel: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`,
    };
  });

  return (
    <section
      id="training"
      className="space-y-6"
      aria-busy={isLoading}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("training.title")}
          </h2>
          <p className="text-sm text-red-200/75">{t("training.description")}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          {weekLabel}
        </span>
      </div>
      {error ? (
        <div className="rounded-2xl border border-red-400/40 bg-red-950/50 p-4 text-sm text-red-100">
          {t("training.loadError", {
            defaultValue:
              "We couldn't refresh the training schedule. Showing the latest saved version.",
          })}
        </div>
      ) : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sessions.map((session) => (
          <RedSurface
            key={session.id}
            as="article"
            tone="muted"
            className="group relative flex h-full flex-col justify-between rounded-3xl p-6 text-red-50 shadow-[0_20px_50px_rgba(127,29,29,0.4)] transition hover:-translate-y-1 hover:border-red-400/45 hover:bg-red-950/65"
          >
            <div className="flex items-start justify-between text-xs uppercase tracking-wide text-red-200/70">
              <span>{session.dateLabel}</span>
              <span>{session.timeLabel}</span>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-red-50">
                {session.title}
              </h3>
              <p className="text-sm text-red-100/80">{session.location}</p>
              <p className="text-sm text-red-200/75">
                {t("training.lead", { coach: session.coach })}
              </p>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              {t("training.confirmAvailability")}
            </button>
            <div
              className="pointer-events-none absolute inset-x-6 bottom-6 -z-10 h-24 rounded-[40px] bg-red-500/10 opacity-70 blur-3xl transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </RedSurface>
        ))}
      </div>
    </section>
  );
}

export default TrainingSection;
