import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
} from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import type { LucideIcon } from "../../lucide-react";
import {
  Activity,
  CalendarDays,
  ClipboardCheck,
  LineChart,
  Users,
} from "../../lucide-react";
import { fetchJson } from "../../lib/api";
import {
  getFallbackCalendarEvents,
  type TrainingCalendarEvent,
} from "../calendar/calendarEvents";

type AttendanceWeekKey = "week14" | "week15" | "week16";

type AttendanceWeekRecord = {
  key: string;
  sourceKey: string;
  plannedSessions: number;
  attendedSessions: number;
  attendanceRate: number | null;
  rangeStart: string | null;
  rangeEnd: string | null;
  labelKey?: string;
  highlightKey?: string;
};

const fallbackAttendanceWeeks: AttendanceWeekRecord[] = [
  { key: "week14", plannedSessions: 4, attendedSessions: 4 },
  { key: "week15", plannedSessions: 5, attendedSessions: 4 },
  { key: "week16", plannedSessions: 3, attendedSessions: 2 },
].map((week) => ({
  ...week,
  sourceKey: week.key,
  attendanceRate:
    week.plannedSessions > 0
      ? Math.round((week.attendedSessions / week.plannedSessions) * 100)
      : null,
  rangeStart: null,
  rangeEnd: null,
  labelKey: `information.trainingAttendance.byWeek.items.${week.key}.label`,
  highlightKey: `information.trainingAttendance.byWeek.items.${week.key}.highlight`,
}));

type AttendanceInsightKey =
  | "consistencyStreak"
  | "availabilityForms"
  | "readinessIndex";

const attendanceInsightDefinitions: Array<{
  key: AttendanceInsightKey;
  icon: LucideIcon;
}> = [
  { key: "consistencyStreak", icon: ClipboardCheck },
  { key: "availabilityForms", icon: CalendarDays },
  { key: "readinessIndex", icon: LineChart },
];

type RosterStatus = "confirmed" | "pending" | "medicalHold";

type RosterEntryKey = "linaReyes" | "noahPetrov" | "aishaKato" | "jonahHill";

type RosterEntry = {
  id: string;
  status: RosterStatus;
  name?: string | null;
  nameKey?: string;
  role?: string | null;
  roleKey?: string;
  note?: string | null;
  noteKey?: string;
  membershipId?: string | null;
  attendanceRate?: number | null;
  plannedSessions?: number;
  attendedSessions?: number;
  supportiveSessions?: number;
};

const fallbackRosterAttendance: Array<{
  key: RosterEntryKey;
  roleKey: string;
  status: RosterStatus;
  noteKey: string;
}> = [
  {
    key: "linaReyes",
    roleKey: "information.trainingAttendance.roster.roles.linaReyes",
    status: "confirmed",
    noteKey: "information.trainingAttendance.roster.notes.linaReyes",
  },
  {
    key: "noahPetrov",
    roleKey: "information.trainingAttendance.roster.roles.noahPetrov",
    status: "pending",
    noteKey: "information.trainingAttendance.roster.notes.noahPetrov",
  },
  {
    key: "aishaKato",
    roleKey: "information.trainingAttendance.roster.roles.aishaKato",
    status: "medicalHold",
    noteKey: "information.trainingAttendance.roster.notes.aishaKato",
  },
  {
    key: "jonahHill",
    roleKey: "information.trainingAttendance.roster.roles.jonahHill",
    status: "confirmed",
    noteKey: "information.trainingAttendance.roster.notes.jonahHill",
  },
];

const statusBadgeStyles: Record<RosterStatus, string> = {
  confirmed: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  pending: "border-amber-400/30 bg-amber-500/15 text-amber-100",
  medicalHold: "border-rose-400/30 bg-rose-500/15 text-rose-100",
};

const statusSummaryStyles: Record<
  RosterStatus,
  { icon: LucideIcon; track: string; bar: string }
> = {
  confirmed: {
    icon: ClipboardCheck,
    track: "bg-emerald-400/15",
    bar: "bg-emerald-400/80",
  },
  pending: {
    icon: CalendarDays,
    track: "bg-amber-400/15",
    bar: "bg-amber-400/80",
  },
  medicalHold: {
    icon: Activity,
    track: "bg-rose-400/15",
    bar: "bg-rose-400/80",
  },
};

type FollowUpActionDefinition = {
  id: "pending" | "medical";
  status: RosterStatus;
  translationKey:
    | "information.trainingAttendance.followUp.actions.pending"
    | "information.trainingAttendance.followUp.actions.medical";
  icon: LucideIcon;
};

const followUpActionDefinitions: FollowUpActionDefinition[] = [
  {
    id: "pending",
    status: "pending",
    translationKey: "information.trainingAttendance.followUp.actions.pending",
    icon: CalendarDays,
  },
  {
    id: "medical",
    status: "medicalHold",
    translationKey: "information.trainingAttendance.followUp.actions.medical",
    icon: Activity,
  },
];

const sessionFocusNotes: Record<
  string,
  { focusKey: string; emphasisKey: string }
> = {
  "ts-1": {
    focusKey: "information.trainingAttendance.sessions.ts1.focus",
    emphasisKey: "information.trainingAttendance.sessions.ts1.emphasis",
  },
  "ts-2": {
    focusKey: "information.trainingAttendance.sessions.ts2.focus",
    emphasisKey: "information.trainingAttendance.sessions.ts2.emphasis",
  },
  "ts-3": {
    focusKey: "information.trainingAttendance.sessions.ts3.focus",
    emphasisKey: "information.trainingAttendance.sessions.ts3.emphasis",
  },
};

const PREVIOUS_ATTENDANCE_RATE = 82;

const fallbackTrainingSessions = getFallbackCalendarEvents().filter(
  (event): event is TrainingCalendarEvent => event.category === "training",
);

type TrainingInsightsWeek = {
  weekKey: string;
  plannedSessions: number;
  attendedLogs: number;
  supportiveLogs: number;
  totalAttendanceLogs: number;
  attendanceRate: number | null;
  rangeStart: string | null;
  rangeEnd: string | null;
};

type TrainingInsightsSummary = {
  totalPlannedSessions: number;
  totalAttendanceLogs: number;
  totalPositiveLogs: number;
  attendanceRate: number | null;
  previousAttendanceRate: number | null;
  rateDelta: number | null;
  bestWeekKey: string | null;
  focusWeekKey: string | null;
};

type TrainingInsightsRosterMember = {
  memberId: string;
  fullName: string;
  role: string | null;
  squad: string | null;
  membershipId: string | null;
  status: RosterStatus;
  lastAttendanceStatus: string | null;
  lastRecordedAt: string | null;
  note: string | null;
  attendanceRate: number | null;
  plannedSessions: number;
  attendedSessions: number;
  supportiveSessions: number;
};

type TrainingInsightsSession = {
  id: string;
  titleKey: string;
  locationKey: string;
  coachKey: string | null;
  start: string;
  end: string;
  focusKey: string | null;
  emphasisKey: string | null;
};

type TrainingInsights = {
  weeks: TrainingInsightsWeek[];
  summary: TrainingInsightsSummary;
  roster: {
    statusCounts: Record<string, number>;
    members: TrainingInsightsRosterMember[];
  };
  sessions: TrainingInsightsSession[];
};

type SessionSource = TrainingInsightsSession | TrainingCalendarEvent;

type TrainingInsightsResponse = {
  trainingInsights?: TrainingInsights;
};

type AttendanceLog = {
  id: string;
  calendarEventId: string;
  memberId: string;
  status: string;
  recordedAt: string | null;
  note: string | null;
  createdAt: string | null;
};

type AttendanceLogsResponse = {
  attendanceLogs?: AttendanceLog[];
};

function TrainingAttendanceSection(): ReactElement {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("ar") ? "ar-EG" : "en-US";

  const [insightsData, setInsightsData] = useState<TrainingInsights | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(true);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([]);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(true);
  const [attendanceError, setAttendanceError] = useState<string | null>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
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

  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingInsights(true);
    setInsightsError(null);

    fetchJson<TrainingInsightsResponse>(`/training-insights?weeks=3`, {
      signal: controller.signal,
    })
      .then((payload) => {
        if (payload.trainingInsights) {
          setInsightsData(payload.trainingInsights);
        }
        setIsLoadingInsights(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        setInsightsError(error instanceof Error ? error.message : String(error));
        setIsLoadingInsights(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoadingAttendance(true);
    setAttendanceError(null);

    fetchJson<AttendanceLogsResponse>(`/training-attendance?limit=50`, {
      signal: controller.signal,
    })
      .then((payload) => {
        if (Array.isArray(payload.attendanceLogs)) {
          setAttendanceLogs(payload.attendanceLogs);
        }
        setIsLoadingAttendance(false);
      })
      .catch((error) => {
        if (controller.signal.aborted) {
          return;
        }
        setAttendanceError(error instanceof Error ? error.message : String(error));
        setIsLoadingAttendance(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const attendanceWeeks = useMemo(() => {
    const fallbackKeys = fallbackAttendanceWeeks.map((week) => week.key);

    if (insightsData?.weeks?.length) {
      return insightsData.weeks.map((week, index) => {
        const fallbackWeek = fallbackAttendanceWeeks[index];
        const key = fallbackWeek?.key ?? fallbackKeys[index] ?? week.weekKey ?? `week-${index}`;

        const plannedSessions =
          typeof week.plannedSessions === "number"
            ? week.plannedSessions
            : fallbackWeek?.plannedSessions ?? 0;
        const attendedSessions =
          (typeof week.attendedLogs === "number" ? week.attendedLogs : 0) +
          (typeof week.supportiveLogs === "number" ? week.supportiveLogs : 0);

        return {
          key,
          sourceKey: week.weekKey ?? key,
          plannedSessions,
          attendedSessions:
            attendedSessions > 0
              ? attendedSessions
              : fallbackWeek?.attendedSessions ?? attendedSessions,
          attendanceRate:
            typeof week.attendanceRate === "number"
              ? week.attendanceRate
              : fallbackWeek?.attendanceRate ?? null,
          rangeStart: week.rangeStart ?? fallbackWeek?.rangeStart ?? null,
          rangeEnd: week.rangeEnd ?? fallbackWeek?.rangeEnd ?? null,
          labelKey: fallbackWeek?.labelKey,
          highlightKey: fallbackWeek?.highlightKey,
        } satisfies AttendanceWeekRecord;
      });
    }

    return fallbackAttendanceWeeks;
  }, [insightsData]);

  const attendanceSummary = useMemo(() => {
    if (insightsData?.summary) {
      const {
        totalPlannedSessions,
        totalPositiveLogs,
        attendanceRate,
        previousAttendanceRate,
        rateDelta,
        bestWeekKey,
        focusWeekKey,
      } = insightsData.summary;

      const derivedRate =
        typeof attendanceRate === "number"
          ? Math.round(attendanceRate)
          : totalPlannedSessions
          ? Math.round((totalPositiveLogs / Math.max(totalPlannedSessions, 1)) * 100)
          : 0;

      return {
        totalPlanned: totalPlannedSessions ?? 0,
        totalAttended: totalPositiveLogs ?? 0,
        attendanceRate: derivedRate,
        bestWeek:
          attendanceWeeks.find((week) => week.sourceKey === bestWeekKey) ?? null,
        focusWeek:
          attendanceWeeks.find((week) => week.sourceKey === focusWeekKey) ?? null,
        previousAttendanceRate:
          typeof previousAttendanceRate === "number"
            ? Math.round(previousAttendanceRate)
            : null,
        rateDelta:
          typeof rateDelta === "number" ? Math.round(rateDelta * 10) / 10 : null,
      };
    }

    const summary = attendanceWeeks.reduce(
      (accumulator, week) => {
        accumulator.totalPlanned += week.plannedSessions;
        accumulator.totalAttended += week.attendedSessions;

        const weeklyRate =
          week.plannedSessions > 0
            ? week.attendedSessions / week.plannedSessions
            : 0;
        if (
          accumulator.bestWeek === null ||
          weeklyRate > accumulator.bestRate
        ) {
          accumulator.bestWeek = week;
          accumulator.bestRate = weeklyRate;
        }
        if (
          accumulator.focusWeek === null ||
          weeklyRate < accumulator.focusRate
        ) {
          accumulator.focusWeek = week;
          accumulator.focusRate = weeklyRate;
        }

        return accumulator;
      },
      {
        totalPlanned: 0,
        totalAttended: 0,
        bestWeek: null as AttendanceWeekRecord | null,
        bestRate: -Infinity,
        focusWeek: null as AttendanceWeekRecord | null,
        focusRate: Infinity,
      },
    );

    const attendanceRate = summary.totalPlanned
      ? Math.round((summary.totalAttended / summary.totalPlanned) * 100)
      : 0;

    return {
      totalPlanned: summary.totalPlanned,
      totalAttended: summary.totalAttended,
      attendanceRate,
      bestWeek: summary.bestWeek,
      focusWeek: summary.focusWeek,
      previousAttendanceRate: PREVIOUS_ATTENDANCE_RATE,
      rateDelta: attendanceRate - PREVIOUS_ATTENDANCE_RATE,
    };
  }, [attendanceWeeks, insightsData]);

  const {
    totalAttended,
    totalPlanned,
    attendanceRate,
    bestWeek,
    focusWeek,
    previousAttendanceRate,
    rateDelta,
  } = attendanceSummary;

  const rateDeltaLabel = useMemo(() => {
    const baseline =
      typeof previousAttendanceRate === "number"
        ? previousAttendanceRate
        : PREVIOUS_ATTENDANCE_RATE;
    const computedDelta =
      typeof rateDelta === "number" ? rateDelta : attendanceRate - baseline;
    const formattedDelta = `${computedDelta >= 0 ? "+" : ""}${computedDelta}`;
    return t("information.trainingAttendance.rateDelta", {
      value: formattedDelta,
    });
  }, [attendanceRate, previousAttendanceRate, rateDelta, t]);

  const formatWeekLabel = useCallback(
    (week: AttendanceWeekRecord) => {
      if (week.labelKey) {
        return t(week.labelKey);
      }

      if (week.rangeStart) {
        const start = new Date(week.rangeStart);
        if (week.rangeEnd) {
          const end = new Date(week.rangeEnd);
          return t("information.trainingAttendance.byWeek.rangeLabel", {
            start: dateFormatter.format(start),
            end: dateFormatter.format(end),
            defaultValue: `${dateFormatter.format(start)} – ${dateFormatter.format(end)}`,
          });
        }

        return t("information.trainingAttendance.byWeek.singleDayLabel", {
          date: dateFormatter.format(start),
          defaultValue: dateFormatter.format(start),
        });
      }

      return t("information.trainingAttendance.byWeek.fallbackLabel", {
        defaultValue: t("information.trainingAttendance.byWeek.heading"),
      });
    },
    [dateFormatter, t],
  );

  const formatWeekHighlight = useCallback(
    (week: AttendanceWeekRecord) => {
      if (week.highlightKey) {
        return t(week.highlightKey);
      }

      if (typeof week.attendanceRate === "number") {
        return t("information.trainingAttendance.byWeek.rateHighlight", {
          percent: Math.round(week.attendanceRate),
          defaultValue: `${Math.round(week.attendanceRate)}% attendance`,
        });
      }

      return t("information.trainingAttendance.byWeek.rateHighlight", {
        percent: Math.round(
          week.plannedSessions > 0
            ? (week.attendedSessions / week.plannedSessions) * 100
            : 0,
        ),
        defaultValue: `${week.attendedSessions}/${week.plannedSessions} sessions`,
      });
    },
    [t],
  );

  const bestWeekContent = useMemo(() => {
    if (!bestWeek) {
      return null;
    }

    return {
      label: formatWeekLabel(bestWeek),
      highlight: formatWeekHighlight(bestWeek),
    };
  }, [bestWeek, formatWeekHighlight, formatWeekLabel]);

  const focusWeekContent = useMemo(() => {
    if (!focusWeek) {
      return null;
    }

    return {
      label: formatWeekLabel(focusWeek),
      highlight: formatWeekHighlight(focusWeek),
    };
  }, [focusWeek, formatWeekHighlight, formatWeekLabel]);

  const sessionsSource = useMemo<SessionSource[]>(() => {
    if (insightsData?.sessions?.length) {
      return insightsData.sessions;
    }

    return fallbackTrainingSessions;
  }, [insightsData]);

  const upcomingSessions = useMemo(
    () =>
      sessionsSource.slice(0, 3).map((session) => {
        const start = new Date(session.start);
        const focusKey =
          ("focusKey" in session && session.focusKey) ||
          sessionFocusNotes[session.id]?.focusKey;
        const emphasisKey =
          ("emphasisKey" in session && session.emphasisKey) ||
          sessionFocusNotes[session.id]?.emphasisKey;
        const coachKey = (session as { coachKey?: string | null }).coachKey ?? null;
        return {
          id: session.id,
          title: t(session.titleKey),
          dateLabel: dateFormatter.format(start),
          timeLabel: timeFormatter.format(start),
          coach: coachKey ? t(coachKey) : undefined,
          location: t(session.locationKey),
          focus: focusKey ? t(focusKey) : undefined,
          emphasis: emphasisKey ? t(emphasisKey) : undefined,
        };
      }),
    [dateFormatter, sessionsSource, t, timeFormatter],
  );

  const rosterEntries = useMemo<RosterEntry[]>(() => {
    if (insightsData?.roster?.members?.length) {
      return insightsData.roster.members.map((member) => ({
        id: member.memberId ?? member.membershipId ?? member.fullName,
        status: (member.status ?? "pending") as RosterStatus,
        name: member.fullName,
        role: member.role ?? member.squad ?? null,
        note: member.note,
        membershipId: member.membershipId,
        attendanceRate: member.attendanceRate,
        plannedSessions: member.plannedSessions,
        attendedSessions: member.attendedSessions,
        supportiveSessions: member.supportiveSessions,
      }));
    }

    return fallbackRosterAttendance.map((entry) => ({
      id: entry.key,
      status: entry.status,
      nameKey: `information.trainingAttendance.roster.names.${entry.key}`,
      roleKey: entry.roleKey,
      noteKey: entry.noteKey,
    }));
  }, [insightsData]);

  const rosterStatusCounts = useMemo(() => {
    if (insightsData?.roster?.statusCounts) {
      return {
        confirmed: insightsData.roster.statusCounts.confirmed ?? 0,
        pending: insightsData.roster.statusCounts.pending ?? 0,
        medicalHold: insightsData.roster.statusCounts.medicalHold ?? 0,
      } satisfies Partial<Record<RosterStatus, number>>;
    }

    return rosterEntries.reduce(
      (accumulator, entry) => {
        accumulator[entry.status] = (accumulator[entry.status] ?? 0) + 1;
        return accumulator;
      },
      {} as Partial<Record<RosterStatus, number>>,
    );
  }, [insightsData, rosterEntries]);

  const totalRoster = rosterEntries.length;

  const recentAttendanceLogs = useMemo(
    () => attendanceLogs.slice(0, 6),
    [attendanceLogs],
  );

  const statusBreakdown = useMemo(
    () =>
      (Object.keys(statusBadgeStyles) as RosterStatus[]).map((status) => {
        const count = rosterStatusCounts[status] ?? 0;
        const percent =
          totalRoster === 0 ? 0 : Math.round((count / totalRoster) * 100);
        const summaryStyle = statusSummaryStyles[status];
        const SummaryIcon = summaryStyle.icon;
        return {
          status,
          count,
          percent,
          SummaryIcon,
          trackClassName: summaryStyle.track,
          barClassName: summaryStyle.bar,
        };
      }),
    [rosterStatusCounts, totalRoster],
  );

  const followUpActions = useMemo(
    () =>
      followUpActionDefinitions
        .map((definition) => {
          const count = rosterStatusCounts[definition.status] ?? 0;
          if (!count) {
            return null;
          }

          return {
            id: definition.id,
            icon: definition.icon,
            count,
            translationKey: definition.translationKey,
          };
        })
        .filter(Boolean) as Array<{
          id: "pending" | "medical";
          icon: LucideIcon;
          count: number;
          translationKey: FollowUpActionDefinition["translationKey"];
        }>,
    [rosterStatusCounts],
  );

  const pendingRosterCount = rosterStatusCounts.pending ?? 0;

  const insights = useMemo(
    () =>
      attendanceInsightDefinitions.map((definition) => {
        const baseKey = `information.trainingAttendance.insights.${definition.key}`;
        const label = t(`${baseKey}.label`);
        const Icon = definition.icon;

        if (definition.key === "availabilityForms") {
          const value = t(`${baseKey}.value`, { count: pendingRosterCount });
          const detail =
            pendingRosterCount === 0
              ? t(`${baseKey}.detailCleared`)
              : t(`${baseKey}.detailPending`, { count: pendingRosterCount });

          return { key: definition.key, label, value, detail, Icon };
        }

        return {
          key: definition.key,
          label,
          value: t(`${baseKey}.value`),
          detail: t(`${baseKey}.detail`),
          Icon,
        };
      }),
    [pendingRosterCount, t],
  );

  return (
    <section
      id="training-attendance"
      className="space-y-6"
      aria-busy={isLoadingInsights}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("information.trainingAttendance.heading")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("information.trainingAttendance.description")}
          </p>
        </div>
        <span className="inline-flex items-center gap-4 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span className="flex flex-col items-end gap-1 text-right">
            <span className="text-[0.75rem] tracking-[0.4em] text-red-200/75">
              {t("information.trainingAttendance.seasonRate.label")}
            </span>
            <span className="text-base font-semibold text-red-50">
              {t("information.trainingAttendance.seasonRate.value", {
                percent: attendanceRate,
              })}
            </span>
          </span>
          <span className="rounded-full border border-red-400/40 bg-red-500/15 px-3 py-1 text-[0.7rem] font-semibold tracking-[0.2em] text-red-100/85">
            {rateDeltaLabel}
          </span>
        </span>
      </div>
      {insightsError ? (
        <div className="rounded-2xl border border-red-400/40 bg-red-950/50 p-4 text-sm text-red-100">
          {t("information.trainingAttendance.errors.insights", {
            defaultValue:
              "We couldn't refresh the latest attendance insights. Showing your most recent saved overview.",
          })}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
        <RedSurface tone="muted" className="space-y-4 p-6">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-red-50">
              {t("information.trainingAttendance.byWeek.heading")}
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("information.trainingAttendance.byWeek.summary", {
                attended: totalAttended,
                planned: totalPlanned,
              })}
            </p>
          </header>
          <div className="space-y-2 text-xs text-red-100/70">
            {bestWeekContent ? (
              <p>
                {t("information.trainingAttendance.byWeek.peak", {
                  label: bestWeekContent.label,
                  highlight: bestWeekContent.highlight,
                })}
              </p>
            ) : null}
            {focusWeekContent ? (
              <p>
                {t("information.trainingAttendance.byWeek.focus", {
                  label: focusWeekContent.label,
                  highlight: focusWeekContent.highlight,
                })}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {insights.map((insight) => {
              const InsightIcon = insight.Icon;
              return (
                <RedSurface
                  key={insight.key}
                  tone="glass"
                  className="flex flex-col gap-2 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                      {insight.label}
                    </p>
                    <InsightIcon
                      className="h-5 w-5 text-red-200/80"
                      aria-hidden
                    />
                  </div>
                  <p className="text-lg font-semibold text-red-50">
                    {insight.value}
                  </p>
                  <p className="text-xs text-red-100/80">
                    {insight.detail}
                  </p>
                </RedSurface>
              );
            })}
          </div>
          <div className="space-y-4">
            {attendanceByWeek.map((week) => {
              const weeklyRate = Math.round(
                (week.attendedSessions / week.plannedSessions) * 100,
              );
              return (
                <RedSurface
                  key={week.key}
                  as="article"
                  tone="glass"
                  className="rounded-2xl p-4 text-red-50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-red-50">
                      {t(
                        `information.trainingAttendance.byWeek.items.${week.key}.label`,
                      )}
                    </p>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-200/80">
                      {t(
                        "information.trainingAttendance.byWeek.weeklyAttendance",
                        { percent: weeklyRate },
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-red-100/80">
                    {t(
                      "information.trainingAttendance.byWeek.sessions",
                      {
                        attended: week.attendedSessions,
                        planned: week.plannedSessions,
                        highlight: t(
                          `information.trainingAttendance.byWeek.items.${week.key}.highlight`,
                        ),
                      },
                    )}
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-red-950/45">
                    <div
                      className="h-full rounded-full bg-red-400/70"
                      style={{ width: `${weeklyRate}%` }}
                      aria-hidden
                    />
                  </div>
                </RedSurface>
              );
            })}
          </div>
        </RedSurface>

        <div className="space-y-4">
          <RedSurface
            as="aside"
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-red-50">
                {t("information.trainingAttendance.upcoming.heading")}
              </h3>
              <CalendarDays className="h-5 w-5 text-red-200/75" aria-hidden />
            </div>
            <ul className="space-y-3">
              {upcomingSessions.map((session) => (
                <RedSurface
                  key={session.id}
                  as="li"
                  tone="glass"
                  className="rounded-2xl p-4"
                >
                  <p className="text-sm font-semibold text-red-50">
                    {session.title}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/70">
                    {session.dateLabel} · {session.timeLabel}
                  </p>
                  <p className="mt-1 text-xs text-red-100/75">
                    {session.location}
                  </p>
                  <p className="mt-1 text-sm text-red-100/80">
                    {t("training.lead", { coach: session.coach })}
                  </p>
                  {session.focus ? (
                    <p className="mt-3 text-xs text-red-100/80">{session.focus}</p>
                  ) : null}
                  {session.emphasis ? (
                    <p className="text-[0.7rem] uppercase tracking-[0.35em] text-red-200/70">
                      {session.emphasis}
                    </p>
                  ) : null}
                </RedSurface>
              ))}
            </ul>
          </RedSurface>

          {followUpActions.length > 0 ? (
            <RedSurface
              as="section"
              tone="muted"
              className="flex flex-col gap-4 p-6 text-red-50"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-red-50">
                    {t("information.trainingAttendance.followUp.heading")}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                    {t("information.trainingAttendance.followUp.helper")}
                  </p>
                </div>
                <ClipboardCheck className="h-5 w-5 text-red-200/75" aria-hidden />
              </div>
              <ul className="space-y-3">
                {followUpActions.map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <li
                      key={action.id}
                      className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="rounded-full border border-red-400/40 bg-red-500/15 p-2 text-red-100/85">
                          <ActionIcon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-red-50">
                            {t(`${action.translationKey}.label`)}
                          </p>
                          <p className="text-xs text-red-100/80">
                            {t(`${action.translationKey}.detail`, {
                              count: action.count,
                            })}
                          </p>
                          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-red-200/70">
                            {t(`${action.translationKey}.emphasis`, {
                              count: action.count,
                            })}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </RedSurface>
          ) : null}

          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-red-50">
                  {t("information.trainingAttendance.logs.heading", {
                    defaultValue: "Recent attendance logs",
                  })}
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.trainingAttendance.logs.helper", {
                    defaultValue: "Latest check-ins recorded across sessions",
                  })}
                </p>
              </div>
              <ClipboardCheck className="h-5 w-5 text-red-200/75" aria-hidden />
            </div>
            {attendanceError ? (
              <p className="text-xs text-red-100/75">
                {t("information.trainingAttendance.logs.error", {
                  defaultValue:
                    "We couldn't refresh attendance logs right now. Showing the most recent snapshot.",
                })}
              </p>
            ) : null}
            {recentAttendanceLogs.length === 0 ? (
              <p className="text-xs text-red-100/75">
                {isLoadingAttendance
                  ? t("information.trainingAttendance.logs.loading", {
                      defaultValue: "Loading attendance activity…",
                    })
                  : t("information.trainingAttendance.logs.empty", {
                      defaultValue: "No attendance has been recorded for this period.",
                    })}
              </p>
            ) : (
              <ul className="space-y-3">
                {recentAttendanceLogs.map((log) => {
                  const recordedAt = log.recordedAt
                    ? new Date(log.recordedAt)
                    : log.createdAt
                    ? new Date(log.createdAt)
                    : null;
                  const rosterMatch = rosterEntries.find(
                    (entry) => entry.id === log.memberId || entry.membershipId === log.memberId,
                  );
                  const memberName = rosterMatch
                    ? rosterMatch.nameKey
                      ? t(rosterMatch.nameKey)
                      : rosterMatch.name ??
                        rosterMatch.membershipId ??
                        log.memberId
                    : log.memberId;
                  const statusLabel = t(
                    `information.trainingAttendance.logs.status.${log.status}`,
                    {
                      defaultValue: log.status.replace(/^(.)/, (char) => char.toUpperCase()),
                    },
                  );
                  const timestampLabel = recordedAt
                    ? `${dateFormatter.format(recordedAt)} · ${timeFormatter.format(recordedAt)}`
                    : t("information.trainingAttendance.logs.recordedFallback", {
                        defaultValue: "Time not recorded",
                      });

                  return (
                    <li
                      key={log.id}
                      className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-red-50">{memberName}</p>
                          <p className="text-xs text-red-200/75">{timestampLabel}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-100">
                          {statusLabel}
                        </span>
                      </div>
                      {log.note ? (
                        <p className="mt-2 text-xs text-red-100/75">{log.note}</p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </RedSurface>

          <RedSurface
            as="section"
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-red-50">
                  {t("information.trainingAttendance.teamStatus.heading")}
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.trainingAttendance.teamStatus.helper")}
                </p>
              </div>
              <Users className="h-5 w-5 text-red-200/75" aria-hidden />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {statusBreakdown.map((status) => (
                <RedSurface
                  key={status.status}
                  tone="glass"
                  className="rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                        {t(
                          `information.trainingAttendance.statuses.${status.status}.label`,
                        )}
                      </p>
                      <p className="text-lg font-semibold text-red-50">
                        {t(
                          `information.trainingAttendance.statuses.${status.status}.count`,
                          { count: status.count },
                        )}
                      </p>
                    </div>
                    <status.SummaryIcon
                      className="h-5 w-5 text-red-200/80"
                      aria-hidden
                    />
                  </div>
                  <div
                    className={`mt-3 h-1.5 rounded-full ${status.trackClassName}`}
                  >
                    <div
                      className={`h-full rounded-full ${status.barClassName}`}
                      style={{ width: `${status.percent}%` }}
                      aria-hidden
                    />
                  </div>
                  <p className="mt-2 text-xs text-red-100/75">
                    {t(
                      "information.trainingAttendance.statuses.percent",
                      {
                        percent: status.percent,
                      },
                    )}
                  </p>
                </RedSurface>
              ))}
            </div>
            <ul className="space-y-3">
              {rosterEntries.map((entry) => {
                const name = entry.nameKey
                  ? t(entry.nameKey)
                  : entry.name ??
                    entry.membershipId ??
                    t("information.trainingAttendance.roster.unknownMember", {
                      defaultValue: "Roster member",
                    });
                const roleLabel = entry.roleKey
                  ? t(entry.roleKey)
                  : entry.role ??
                    t("information.trainingAttendance.roster.roleFallback", {
                      defaultValue: "Squad member",
                    });
                const note = entry.noteKey
                  ? t(entry.noteKey)
                  : entry.note ??
                    t("information.trainingAttendance.roster.noNote", {
                      defaultValue: "No recent updates recorded.",
                    });

                return (
                  <li
                    key={entry.id}
                    className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-red-50">{name}</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                          {roleLabel}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${statusBadgeStyles[entry.status]}`}
                      >
                        {t(
                          `information.trainingAttendance.statuses.${entry.status}.label`,
                        )}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-red-100/75">{note}</p>
                  </li>
                );
              })}
            </ul>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default TrainingAttendanceSection;
