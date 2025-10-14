import { useMemo, type ReactElement } from "react";
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
import { trainingCalendarEvents } from "../calendar/calendarEvents";

type AttendanceWeekKey = "week14" | "week15" | "week16";

const attendanceByWeek: Array<{
  key: AttendanceWeekKey;
  plannedSessions: number;
  attendedSessions: number;
}> = [
  { key: "week14", plannedSessions: 4, attendedSessions: 4 },
  { key: "week15", plannedSessions: 5, attendedSessions: 4 },
  { key: "week16", plannedSessions: 3, attendedSessions: 2 },
];

const attendanceInsights = [
  { key: "consistencyStreak", icon: ClipboardCheck },
  { key: "availabilityForms", icon: CalendarDays },
  { key: "readinessIndex", icon: LineChart },
] as const;

type RosterStatus = "confirmed" | "pending" | "medicalHold";

type RosterEntryKey = "linaReyes" | "noahPetrov" | "aishaKato" | "jonahHill";

const rosterAttendance: Array<{
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
  (typeof trainingCalendarEvents)[number]["id"],
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

function TrainingAttendanceSection(): ReactElement {
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith("ar") ? "ar-EG" : "en-US";

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

  const totalPlanned = attendanceByWeek.reduce(
    (total, week) => total + week.plannedSessions,
    0,
  );
  const totalAttended = attendanceByWeek.reduce(
    (total, week) => total + week.attendedSessions,
    0,
  );
  const attendanceRate = Math.round((totalAttended / totalPlanned) * 100);
  const previousAttendanceRate = 82;
  const rateDelta = attendanceRate - previousAttendanceRate;
  const formattedDelta = `${rateDelta >= 0 ? "+" : ""}${rateDelta}`;
  const rateDeltaLabel = t("information.trainingAttendance.rateDelta", {
    value: formattedDelta,
  });

  const upcomingSessions = trainingCalendarEvents.slice(0, 3).map((session) => {
    const start = new Date(session.start);
    const focus = sessionFocusNotes[session.id];
    return {
      id: session.id,
      title: t(session.titleKey),
      dateLabel: dateFormatter.format(start),
      timeLabel: timeFormatter.format(start),
      coach: t(session.coachKey),
      location: t(session.locationKey),
      focus: focus ? t(focus.focusKey) : undefined,
      emphasis: focus ? t(focus.emphasisKey) : undefined,
    };
  });

  const totalRoster = rosterAttendance.length;

  const rosterStatusCounts = rosterAttendance.reduce(
    (accumulator, entry) => {
      accumulator[entry.status] = (accumulator[entry.status] ?? 0) + 1;
      return accumulator;
    },
    {} as Partial<Record<RosterStatus, number>>,
  );

  const statusBreakdown = (Object.keys(statusBadgeStyles) as RosterStatus[]).map(
    (status) => {
      const count = rosterStatusCounts[status] ?? 0;
      const percent = totalRoster === 0 ? 0 : Math.round((count / totalRoster) * 100);
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
    },
  );

  const followUpActions = followUpActionDefinitions
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
  }>;

  const weeklyAttendanceRanking = attendanceByWeek.reduce(
    (
      accumulator,
      week,
    ): {
      bestWeek: (typeof attendanceByWeek)[number] | null;
      bestRate: number;
      focusWeek: (typeof attendanceByWeek)[number] | null;
      focusRate: number;
    } => {
      const weeklyRate = week.attendedSessions / week.plannedSessions;
      if (accumulator.bestWeek === null || weeklyRate > accumulator.bestRate) {
        accumulator.bestWeek = week;
        accumulator.bestRate = weeklyRate;
      }
      if (accumulator.focusWeek === null || weeklyRate < accumulator.focusRate) {
        accumulator.focusWeek = week;
        accumulator.focusRate = weeklyRate;
      }
      return accumulator;
    },
    {
      bestWeek: null,
      bestRate: -Infinity,
      focusWeek: null,
      focusRate: Infinity,
    },
  );

  const bestWeek = weeklyAttendanceRanking.bestWeek;
  const focusWeek = weeklyAttendanceRanking.focusWeek;

  return (
    <section id="training-attendance" className="space-y-6">
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
            {bestWeek ? (
              <p>
                {t("information.trainingAttendance.byWeek.peak", {
                  label: t(
                    `information.trainingAttendance.byWeek.items.${bestWeek.key}.label`,
                  ),
                  highlight: t(
                    `information.trainingAttendance.byWeek.items.${bestWeek.key}.highlight`,
                  ),
                })}
              </p>
            ) : null}
            {focusWeek ? (
              <p>
                {t("information.trainingAttendance.byWeek.focus", {
                  label: t(
                    `information.trainingAttendance.byWeek.items.${focusWeek.key}.label`,
                  ),
                  highlight: t(
                    `information.trainingAttendance.byWeek.items.${focusWeek.key}.highlight`,
                  ),
                })}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {attendanceInsights.map((insight) => {
              const InsightIcon = insight.icon;
              return (
                <RedSurface
                  key={insight.key}
                  tone="glass"
                  className="flex flex-col gap-2 rounded-2xl p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                      {t(
                        `information.trainingAttendance.insights.${insight.key}.label`,
                      )}
                    </p>
                    <InsightIcon
                      className="h-5 w-5 text-red-200/80"
                      aria-hidden
                    />
                  </div>
                  <p className="text-lg font-semibold text-red-50">
                    {t(
                      `information.trainingAttendance.insights.${insight.key}.value`,
                    )}
                  </p>
                  <p className="text-xs text-red-100/80">
                    {t(
                      `information.trainingAttendance.insights.${insight.key}.detail`,
                    )}
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
              {rosterAttendance.map((entry) => (
                <li
                  key={entry.key}
                  className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-red-50">
                        {t(
                          `information.trainingAttendance.roster.names.${entry.key}`,
                        )}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                        {t(entry.roleKey)}
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
                  <p className="mt-2 text-xs text-red-100/75">
                    {t(entry.noteKey)}
                  </p>
                </li>
              ))}
            </ul>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default TrainingAttendanceSection;
