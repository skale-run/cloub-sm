import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";

type TechnicalMilestone = {
  phase: string;
  milestone: string;
  status: string;
};

type AttendanceSummary = {
  totalSessions: number;
  attended: number;
  excused: number;
  unexcused: number;
};

type TrainingStatistic = {
  label: string;
  value: string;
  trend: string;
};

type CompetitionResult = {
  event: string;
  result: string;
  placing: string;
};

type WeightEntry = {
  label: string;
  weight: string;
};

function PerformanceTrackingSection(): ReactElement {
  const { t } = useTranslation();

  const technicalProgress = t("performanceTracking.technicalProgress", {
    returnObjects: true,
  }) as {
    title: string;
    lastAudit: string;
    milestones: TechnicalMilestone[];
  };

  const attendance = t("performanceTracking.attendance", {
    returnObjects: true,
  }) as {
    title: string;
    summary: AttendanceSummary;
    labels: {
      attended: string;
      excused: string;
      unexcused: string;
    };
  };

  const trainingStats = t("performanceTracking.trainingStatistics", {
    returnObjects: true,
  }) as {
    title: string;
    subtitle: string;
    items: TrainingStatistic[];
  };

  const competition = t("performanceTracking.competitionResults", {
    returnObjects: true,
  }) as {
    title: string;
    subtitle: string;
    items: CompetitionResult[];
  };

  const weightTracking = t("performanceTracking.weightTracking", {
    returnObjects: true,
  }) as {
    title: string;
    subtitle: string;
    entries: WeightEntry[];
    rangeNote: string;
  };

  const attendanceRate = Math.round(
    (attendance.summary.attended / attendance.summary.totalSessions) * 100,
  );

  const totalSessionsLabel = t(
    "performanceTracking.attendance.totalSessionsLabel",
    {
      count: attendance.summary.totalSessions,
    },
  );

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
          {t("performanceTracking.title")}
        </h2>
        <p className="text-sm text-red-200/75">
          {t("performanceTracking.description")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <RedSurface
          id="technical-progress"
          as="article"
          tone="muted"
          className="space-y-4 p-6 text-red-50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {technicalProgress.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {technicalProgress.lastAudit}
            </span>
          </div>
          <ul className="space-y-3">
            {technicalProgress.milestones.map((item) => (
              <RedSurface
                key={item.phase}
                as="li"
                tone="glass"
                className="rounded-2xl p-4"
              >
                <p className="text-sm font-semibold text-red-50">
                  {item.phase}
                </p>
                <p className="mt-1 text-sm text-red-100/80">{item.milestone}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-red-200/80">
                  {item.status}
                </p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface
          id="attendance-total"
          as="article"
          tone="muted"
          className="space-y-4 p-6 text-red-50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {attendance.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {totalSessionsLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-red-400/50 bg-red-950 text-2xl font-semibold text-red-50">
              {attendanceRate}%
            </div>
            <dl className="grid flex-1 gap-2 text-sm">
              <RedSurface
                as="div"
                tone="glass"
                className="flex items-center justify-between rounded-2xl px-4 py-2"
              >
                <dt className="text-red-200/70">{attendance.labels.attended}</dt>
                <dd className="font-semibold text-red-50">
                  {attendance.summary.attended}
                </dd>
              </RedSurface>
              <RedSurface
                as="div"
                tone="glass"
                className="flex items-center justify-between rounded-2xl px-4 py-2"
              >
                <dt className="text-red-200/70">{attendance.labels.excused}</dt>
                <dd className="font-semibold text-red-50">
                  {attendance.summary.excused}
                </dd>
              </RedSurface>
              <RedSurface
                as="div"
                tone="glass"
                className="flex items-center justify-between rounded-2xl px-4 py-2"
              >
                <dt className="text-red-200/70">{attendance.labels.unexcused}</dt>
                <dd className="font-semibold text-red-50">
                  {attendance.summary.unexcused}
                </dd>
              </RedSurface>
            </dl>
          </div>
        </RedSurface>
      </div>

      <RedSurface
        id="training-statistics"
        as="article"
        tone="muted"
        className="space-y-4 p-6 text-red-50"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-red-50">
            {trainingStats.title}
          </h3>
          <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
            {trainingStats.subtitle}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {trainingStats.items.map((stat) => (
            <RedSurface
              key={stat.label}
              tone="glass"
              className="rounded-2xl p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {stat.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-red-50">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/80">
                {stat.trend}
              </p>
            </RedSurface>
          ))}
        </div>
      </RedSurface>

      <div className="grid gap-6 lg:grid-cols-2">
        <RedSurface
          id="competition-results"
          as="article"
          tone="muted"
          className="space-y-4 p-6 text-red-50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {competition.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {competition.subtitle}
            </span>
          </div>
          <ul className="space-y-3">
            {competition.items.map((meet) => (
              <RedSurface
                key={meet.event}
                as="li"
                tone="glass"
                className="rounded-2xl p-4"
              >
                <p className="text-sm font-semibold text-red-50">
                  {meet.event}
                </p>
                <p className="mt-1 text-sm text-red-100/80">{meet.result}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/80">
                  {t("performanceTracking.competitionResults.placementFormat", {
                    placement: meet.placing,
                  })}
                </p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface
          id="weight-tracking"
          as="article"
          tone="muted"
          className="space-y-4 p-6 text-red-50"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {weightTracking.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {weightTracking.subtitle}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {weightTracking.entries.map((entry) => (
              <RedSurface
                key={entry.label}
                tone="glass"
                className="rounded-2xl p-4"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {entry.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-red-50">
                  {entry.weight}
                </p>
              </RedSurface>
            ))}
          </div>
          <p className="text-sm text-red-100/80">
            {weightTracking.rangeNote}
          </p>
        </RedSurface>
      </div>
    </section>
  );
}

export default PerformanceTrackingSection;
