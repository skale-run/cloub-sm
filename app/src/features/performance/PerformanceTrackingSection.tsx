import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";

type TechnicalMilestone = {
  phase: string;
  milestone: string;
  status: string;
};

type AttendanceSummary = {
  totalSessions: number | string;
  attended: number | string;
  excused: number | string;
  unexcused: number | string;
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

const DIGIT_ZERO_CODE_POINTS = [
  0x0660, // Arabic-Indic
  0x06f0, // Extended Arabic-Indic
  0x0966, // Devanagari
  0x09e6, // Bengali
  0x0a66, // Gurmukhi
  0x0ae6, // Gujarati
  0x0b66, // Oriya
  0x0be6, // Tamil
  0x0c66, // Telugu
  0x0ce6, // Kannada
  0x0d66, // Malayalam
  0x0e50, // Thai
  0x0ed0, // Lao
  0x0f20, // Tibetan
  0x1040, // Myanmar
  0x1090, // Myanmar Shan
  0x17e0, // Khmer
  0x1810, // Mongolian
  0x1946, // Limbu
  0x19d0, // New Tai Lue
  0x1a80, // Tai Tham Hora
  0x1a90, // Tai Tham Tham
  0x1b50, // Balinese
  0x1bb0, // Sundanese
  0x1c40, // Lepcha
  0x1c50, // Ol Chiki
  0xa620, // Vai
  0xa8d0, // Saurashtra
  0xa900, // Kayah Li
  0xa9d0, // Javanese
  0xa9f0, // Myanmar Tai Laing
  0xaa50, // Cham
  0xabf0, // Meetei Mayek
  0xff10, // Fullwidth
] as const;

const normalizeLocalizedDigits = (input: string): string => {
  return Array.from(input)
    .map((character) => {
      const codePoint = character.codePointAt(0);

      if (!codePoint) {
        return character;
      }

      if (codePoint >= 0x30 && codePoint <= 0x39) {
        return character;
      }

      for (const zeroPoint of DIGIT_ZERO_CODE_POINTS) {
        if (codePoint >= zeroPoint && codePoint <= zeroPoint + 9) {
          const asciiDigit = 0x30 + (codePoint - zeroPoint);

          return String.fromCharCode(asciiDigit);
        }
      }

      return character;
    })
    .join("");
};

const parseLocalizedNumber = (value: unknown): number | null => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = normalizeLocalizedDigits(value);
  const match = normalized.match(/-?\d+(?:[.,]\d+)?/);

  if (!match) {
    return null;
  }

  const numericCandidate = match[0].replace(",", ".");
  const parsed = Number.parseFloat(numericCandidate);

  return Number.isNaN(parsed) ? null : parsed;
};

type AttendanceBreakdownItem = {
  id: keyof AttendanceSummary;
  label: string;
  formattedValue: string | number;
  normalizedValue: number;
  accent: string;
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

  const normalizedAttendanceSummary = {
    totalSessions: parseLocalizedNumber(attendance.summary.totalSessions) ?? 0,
    attended: parseLocalizedNumber(attendance.summary.attended) ?? 0,
    excused: parseLocalizedNumber(attendance.summary.excused) ?? 0,
    unexcused: parseLocalizedNumber(attendance.summary.unexcused) ?? 0,
  };

  const totalSessions = Math.max(0, normalizedAttendanceSummary.totalSessions);

  const attendanceBreakdown: AttendanceBreakdownItem[] = [
    {
      id: "attended",
      label: attendance.labels.attended,
      formattedValue: attendance.summary.attended,
      normalizedValue: normalizedAttendanceSummary.attended,
      accent: "from-red-500/60 to-red-400/50",
    },
    {
      id: "excused",
      label: attendance.labels.excused,
      formattedValue: attendance.summary.excused,
      normalizedValue: normalizedAttendanceSummary.excused,
      accent: "from-amber-400/60 to-amber-300/50",
    },
    {
      id: "unexcused",
      label: attendance.labels.unexcused,
      formattedValue: attendance.summary.unexcused,
      normalizedValue: normalizedAttendanceSummary.unexcused,
      accent: "from-rose-500/60 to-rose-400/55",
    },
  ];

  const attendanceSegments = attendanceBreakdown.map((item) => {
    const percentage =
      totalSessions > 0
        ? Math.max(0, Math.min(100, (item.normalizedValue / totalSessions) * 100))
        : 0;

    return { ...item, percentage };
  });

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
    totalSessions > 0
      ? (normalizedAttendanceSummary.attended / totalSessions) * 100
      : 0,
  );

  const totalSessionsLabel = t(
    "performanceTracking.attendance.totalSessionsLabel",
    {
      count: normalizedAttendanceSummary.totalSessions,
    },
  );

  return (
    <section id="performance-tracking" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("performanceTracking.title")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("performanceTracking.description")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
            {totalSessionsLabel}
          </span>
          <span className="text-[11px] uppercase tracking-[0.28em] text-red-200/75">
            {t("performanceTracking.attendance.title")} · {attendanceRate}%
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <RedSurface
          id="technical-progress"
          as="article"
          tone="muted"
          className="flex flex-col gap-5 p-6 text-red-50 shadow-[0_25px_70px_rgba(127,29,29,0.38)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {technicalProgress.title}
            </h3>
            <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-100">
              {technicalProgress.lastAudit}
            </span>
          </div>
          <ul className="grid gap-4">
            {technicalProgress.milestones.map((item) => (
              <RedSurface
                key={item.phase}
                as="li"
                tone="glass"
                className="flex flex-col gap-3 rounded-2xl p-4 transition hover:border-red-400/45 hover:bg-red-900/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-red-50">
                    {item.phase}
                  </p>
                  <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-200/80">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-red-100/80">{item.milestone}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface
          id="attendance-total"
          as="article"
          tone="muted"
          className="flex flex-col gap-5 p-6 text-red-50 shadow-[0_25px_70px_rgba(127,29,29,0.38)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {attendance.title}
            </h3>
            <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {totalSessionsLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-red-400/40 bg-gradient-to-br from-red-600/30 to-red-500/40 text-center text-xl font-semibold text-red-50">
              <span>{attendanceRate}%</span>
              <span className="mt-1 px-2 text-[10px] font-medium uppercase tracking-[0.35em] text-red-200/80">
                {attendance.title}
              </span>
              <div
                className="pointer-events-none absolute inset-2 rounded-full border border-red-400/30"
                aria-hidden
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-2 rounded-full bg-red-950/50">
                <div className="flex h-full overflow-hidden rounded-full">
                  {attendanceSegments.map((segment) => (
                    <span
                      key={segment.id}
                      className={`h-full bg-gradient-to-r ${segment.accent}`}
                      style={{ width: `${segment.percentage}%` }}
                    />
                  ))}
                </div>
              </div>
              <dl className="grid gap-2 text-sm">
                {attendanceSegments.map((segment) => (
                  <RedSurface
                    key={segment.id}
                    as="div"
                    tone="glass"
                    className="flex items-center justify-between rounded-2xl px-4 py-2"
                  >
                    <dt className="text-red-200/75">{segment.label}</dt>
                    <dd className="flex items-center gap-2 font-semibold text-red-50">
                      <span>{segment.formattedValue}</span>
                      <span className="text-xs font-medium uppercase tracking-[0.28em] text-red-200/70">
                        {Math.round(segment.percentage)}%
                      </span>
                    </dd>
                  </RedSurface>
                ))}
              </dl>
            </div>
          </div>
        </RedSurface>
      </div>

      <RedSurface
        id="training-statistics"
        as="article"
        tone="muted"
        className="flex flex-col gap-5 p-6 text-red-50 shadow-[0_25px_70px_rgba(127,29,29,0.38)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-red-50">
            {trainingStats.title}
          </h3>
          <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-100">
            {trainingStats.subtitle}
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {trainingStats.items.map((stat) => (
            <RedSurface
              key={stat.label}
              tone="glass"
              className="flex h-full flex-col justify-between rounded-2xl p-4 transition hover:border-red-400/45 hover:bg-red-900/40"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {stat.label}
              </p>
              <p className="mt-4 text-2xl font-semibold text-red-50">
                {stat.value}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.28em] text-red-200/80">
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
          className="flex flex-col gap-5 p-6 text-red-50 shadow-[0_25px_70px_rgba(127,29,29,0.38)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {competition.title}
            </h3>
            <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-100">
              {competition.subtitle}
            </span>
          </div>
          <ul className="grid gap-4">
            {competition.items.map((meet) => (
              <RedSurface
                key={meet.event}
                as="li"
                tone="glass"
                className="flex flex-col gap-3 rounded-2xl p-4 transition hover:border-red-400/45 hover:bg-red-900/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-red-50">
                    {meet.event}
                  </p>
                  <span className="text-xs uppercase tracking-[0.3em] text-red-200/75">
                    {t("performanceTracking.competitionResults.placementFormat", {
                      placement: meet.placing,
                    })}
                  </span>
                </div>
                <p className="text-sm text-red-100/80">{meet.result}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface
          id="weight-tracking"
          as="article"
          tone="muted"
          className="flex flex-col gap-5 p-6 text-red-50 shadow-[0_25px_70px_rgba(127,29,29,0.38)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-red-50">
              {weightTracking.title}
            </h3>
            <span className="inline-flex items-center rounded-full border border-red-400/30 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-red-100">
              {weightTracking.subtitle}
            </span>
          </div>
          <ol className="relative grid gap-4">
            {weightTracking.entries.map((entry, index) => {
              const isLast = index === weightTracking.entries.length - 1;

              return (
                <li key={entry.label} className="relative pl-8">
                  {!isLast && (
                    <span
                      className="absolute left-[15px] top-7 h-full w-px bg-gradient-to-b from-red-500/30 via-red-400/20 to-transparent"
                      aria-hidden
                    />
                  )}
                  <span
                    className="absolute left-3 top-4 h-5 w-5 rounded-full border border-red-400/50 bg-red-500/20"
                    aria-hidden
                  />
                  <RedSurface
                    tone="glass"
                    className="flex items-center justify-between rounded-2xl px-4 py-3"
                  >
                    <span className="text-xs uppercase tracking-[0.28em] text-red-200/70">
                      {entry.label}
                    </span>
                    <span className="text-lg font-semibold text-red-50">
                      {entry.weight}
                    </span>
                  </RedSurface>
                </li>
              );
            })}
          </ol>
          <p className="text-sm text-red-100/80">{weightTracking.rangeNote}</p>
        </RedSurface>
      </div>
    </section>
  );
}

export default PerformanceTrackingSection;
