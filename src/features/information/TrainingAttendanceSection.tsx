import type { ReactElement } from "react";
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

const attendanceByWeek = [
  {
    label: "Week 14",
    plannedSessions: 4,
    attendedSessions: 4,
    highlight: "Perfect attendance",
  },
  {
    label: "Week 15",
    plannedSessions: 5,
    attendedSessions: 4,
    highlight: "Missed strength lift · travel delay",
  },
  {
    label: "Week 16",
    plannedSessions: 3,
    attendedSessions: 2,
    highlight: "Recovery block · cleared by physio",
  },
];

const attendanceInsights: Array<{
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}> = [
  {
    label: "Consistency streak",
    value: "6 sessions",
    detail: "Zero misses since April 2 · new personal best",
    icon: ClipboardCheck,
  },
  {
    label: "Availability forms",
    value: "3 pending",
    detail: "Travel squad confirmations required before Friday",
    icon: CalendarDays,
  },
  {
    label: "Readiness index",
    value: "92%",
    detail: "Coach feedback + physio clearance trending up",
    icon: LineChart,
  },
];

const rosterAttendance = [
  {
    athlete: "Lina Reyes",
    role: "400m hurdles",
    status: "Confirmed",
    note: "Checked in via mobile app · 18:05",
  },
  {
    athlete: "Noah Petrov",
    role: "800m",
    status: "Pending",
    note: "Flight arrives 14:20 · needs remote warm-up brief",
  },
  {
    athlete: "Aisha Kato",
    role: "Relay anchor",
    status: "Medical hold",
    note: "Clearing return-to-sprint test at Thursday physio",
  },
  {
    athlete: "Jonah Hill",
    role: "Shot put",
    status: "Confirmed",
    note: "Strength block moved to 07:30 with Hugo",
  },
];

const statusBadgeStyles: Record<
  (typeof rosterAttendance)[number]["status"],
  string
> = {
  Confirmed: "border-emerald-400/30 bg-emerald-500/15 text-emerald-100",
  Pending: "border-amber-400/30 bg-amber-500/15 text-amber-100",
  "Medical hold": "border-rose-400/30 bg-rose-500/15 text-rose-100",
};

const statusSummaryStyles = {
  Confirmed: {
    icon: ClipboardCheck,
    track: "bg-emerald-400/15",
    bar: "bg-emerald-400/80",
  },
  Pending: {
    icon: CalendarDays,
    track: "bg-amber-400/15",
    bar: "bg-amber-400/80",
  },
  "Medical hold": {
    icon: Activity,
    track: "bg-rose-400/15",
    bar: "bg-rose-400/80",
  },
} satisfies Record<
  (typeof rosterAttendance)[number]["status"],
  { icon: LucideIcon; track: string; bar: string }
>;

type RosterStatus = (typeof rosterAttendance)[number]["status"];

type FollowUpAction = {
  id: string;
  label: string;
  detail: string;
  emphasis: string;
  icon: LucideIcon;
};

const sessionFocusNotes: Record<
  (typeof trainingCalendarEvents)[number]["id"],
  { focus: string; emphasis: string }
> = {
  "ts-1": {
    focus: "Velocity testing during strength sets—assign check-in tablets near racks.",
    emphasis: "Wellness survey opens 30 minutes prior; capture RPE after each block.",
  },
  "ts-2": {
    focus: "Travel squad tune-up with individual mobility protocols staged on arrival.",
    emphasis: "Ensure hydration scans are logged before main warm-up lap.",
  },
  "ts-3": {
    focus: "Film room breakdown with positional pairings and leadership huddles.",
    emphasis: "Circulate remote check-in link for athletes on modified plans.",
  },
};

function TrainingAttendanceSection(): ReactElement {
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
  const rateDeltaLabel = `${rateDelta >= 0 ? "+" : ""}${rateDelta}% vs last block`;

  const upcomingSessions = trainingCalendarEvents.slice(0, 3).map((session) => {
    const start = new Date(session.start);
    const focus = sessionFocusNotes[session.id];
    return {
      id: session.id,
      title: session.title,
      dateLabel: start.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      timeLabel: start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      coach: session.coach,
      location: session.location,
      focus: focus?.focus,
      emphasis: focus?.emphasis,
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

  const followUpActions = [
    rosterStatusCounts.Pending
      ? {
          id: "pending",
          label: "Confirm travel arrivals",
          detail: `${rosterStatusCounts.Pending} athlete${
            rosterStatusCounts.Pending > 1 ? "s" : ""
          } are awaiting travel desk confirmation and location briefings.`,
          emphasis: "Send reminder before Thursday noon logistics call.",
          icon: CalendarDays,
        }
      : null,
    rosterStatusCounts["Medical hold"]
      ? {
          id: "medical",
          label: "Coordinate medical reviews",
          detail: `${rosterStatusCounts["Medical hold"]} athlete${
            (rosterStatusCounts["Medical hold"] ?? 0) > 1 ? "s" : ""
          } flagged for clearance need updated return timelines.`,
          emphasis: "Sync physio notes with coaching staff before Friday block plan.",
          icon: Activity,
        }
      : null,
  ].filter(Boolean) as FollowUpAction[];

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
            Training attendance
          </h2>
          <p className="text-sm text-red-200/75">
            Weekly overview of confirmed check-ins and any notes from the staff
            desk.
          </p>
        </div>
        <span className="inline-flex items-center gap-4 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span className="flex flex-col items-end gap-1 text-right">
            <span className="text-[0.75rem] tracking-[0.4em] text-red-200/75">
              Season rate
            </span>
            <span className="text-base font-semibold text-red-50">
              {attendanceRate}%
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
              Attendance by week
            </h3>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {totalAttended} / {totalPlanned} sessions attended
            </p>
          </header>
          <div className="space-y-2 text-xs text-red-100/70">
            {bestWeek ? (
              <p>
                Peak execution: {bestWeek.label} · {bestWeek.highlight}
              </p>
            ) : null}
            {focusWeek ? (
              <p>
                Upcoming focus: {focusWeek.label} · {focusWeek.highlight}
              </p>
            ) : null}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {attendanceInsights.map((insight) => {
              const InsightIcon = insight.icon;
              return (
                <RedSurface
                  key={insight.label}
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
                  <p className="text-xs text-red-100/80">{insight.detail}</p>
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
                  key={week.label}
                  as="article"
                  tone="glass"
                  className="rounded-2xl p-4 text-red-50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-red-50">
                      {week.label}
                    </p>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-200/80">
                      {weeklyRate}% attendance
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-red-100/80">
                    {week.attendedSessions} of {week.plannedSessions} sessions ·{" "}
                    {week.highlight}
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
                Upcoming check-ins
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
                    Coach {session.coach}
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
                    Follow-up actions
                  </h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                    Check-in priorities this week
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
                            {action.label}
                          </p>
                          <p className="text-xs text-red-100/80">{action.detail}</p>
                          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-red-200/70">
                            {action.emphasis}
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
                  Team check-in status
                </h3>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  Live roster availability
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
                        {status.status}
                      </p>
                      <p className="text-lg font-semibold text-red-50">
                        {status.count} athlete{status.count === 1 ? "" : "s"}
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
                    {status.percent}% of roster
                  </p>
                </RedSurface>
              ))}
            </div>
            <ul className="space-y-3">
              {rosterAttendance.map((entry) => (
                <li
                  key={entry.athlete}
                  className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-red-50">
                        {entry.athlete}
                      </p>
                      <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                        {entry.role}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${statusBadgeStyles[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-red-100/75">{entry.note}</p>
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
