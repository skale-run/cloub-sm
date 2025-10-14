import type { ReactElement } from "react";
import RedSurface from "../../components/RedSurface";
import type { LucideIcon } from "../../lucide-react";
import {
  Award,
  CalendarDays,
  ClipboardCheck,
  Flag,
  GaugeCircle,
  GraduationCap,
} from "../../lucide-react";

type SummaryInsight = {
  label: string;
  value: string;
  context: string;
  icon: LucideIcon;
};

type ChecklistItem = {
  label: string;
  status: string;
  detail: string;
};

type AdvisorNote = {
  title: string;
  description: string;
  action?: string;
};

const summaryInsights: SummaryInsight[] = [
  {
    label: "Current GPA",
    value: "3.82",
    context: "+0.12 this term",
    icon: GaugeCircle,
  },
  {
    label: "Scholarship eligibility",
    value: "Secure",
    context: "Meets 3.5 GPA minimum",
    icon: Award,
  },
  {
    label: "Graduation path",
    value: "62 / 90 credits",
    context: "On schedule — 2 terms remaining",
    icon: GraduationCap,
  },
];

const creditDistribution = [
  {
    label: "Core sciences",
    value: "9 credits",
    context: "Biomechanics, physiology blocks",
  },
  {
    label: "Performance labs",
    value: "6 credits",
    context: "Lab hours logged weekly",
  },
  {
    label: "Leadership & electives",
    value: "3 credits",
    context: "Sport psych & mentoring",
  },
];

const upcomingEvaluations = [
  {
    module: "Applied Sports Psychology",
    type: "Midterm reflection",
    date: "May 12",
  },
  {
    module: "Advanced Biomechanics Lab",
    type: "Lab report submission",
    date: "Apr 28",
  },
  {
    module: "Performance Nutrition Strategies",
    type: "Capstone workshop",
    date: "Jun 02",
  },
];

const academicModules = [
  {
    code: "SPRT201",
    title: "Applied Sports Psychology",
    credits: 3,
    status: "On track",
    grade: "A-",
    focus: "Mental conditioning focus project",
    nextEvaluation: "May 12",
    progress: 78,
  },
  {
    code: "BIO305",
    title: "Advanced Biomechanics Lab",
    credits: 4,
    status: "Lab report due",
    grade: "B+",
    focus: "Video gait analysis and report",
    nextEvaluation: "Apr 28",
    progress: 54,
  },
  {
    code: "NUT210",
    title: "Performance Nutrition Strategies",
    credits: 2,
    status: "Completed",
    grade: "A",
    focus: "Team fueling protocols delivered",
    nextEvaluation: "—",
    progress: 100,
  },
];

const statusStyles: Record<string, string> = {
  "On track": "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  Completed: "bg-blue-500/10 text-blue-200 border-blue-400/40",
  "Lab report due": "bg-amber-500/15 text-amber-200 border-amber-400/40",
};

const checklistStatusStyles: Record<
  string,
  { badge: string; icon: LucideIcon; iconWrapper: string }
> = {
  "On track": {
    badge: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    icon: ClipboardCheck,
    iconWrapper:
      "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  },
  "Review needed": {
    badge: "border border-amber-400/40 bg-amber-500/15 text-amber-200",
    icon: Flag,
    iconWrapper:
      "border border-amber-400/40 bg-amber-500/15 text-amber-200",
  },
  Scheduled: {
    badge: "border border-sky-400/40 bg-sky-500/15 text-sky-200",
    icon: CalendarDays,
    iconWrapper:
      "border border-sky-400/40 bg-sky-500/15 text-sky-200",
  },
};

const eligibilityChecklist: ChecklistItem[] = [
  {
    label: "Maintain 12 credit NCAA minimum",
    status: "On track",
    detail: "18 credits secured with room for one elective add-on.",
  },
  {
    label: "Submit biomechanics lab report",
    status: "Review needed",
    detail: "Draft 60% complete — upload by Apr 28 to avoid penalty.",
  },
  {
    label: "Advising session with Coach Rivera",
    status: "Scheduled",
    detail: "Career planning touchpoint confirmed for Apr 22.",
  },
];

const advisorNotes: AdvisorNote[] = [
  {
    title: "Capstone integration",
    description:
      "Tie performance nutrition deliverables into upcoming sport psychology reflection for a cohesive submission.",
    action: "Combine artifacts",
  },
  {
    title: "Scholarship renewal",
    description:
      "GPA comfortably above 3.5 threshold — submit renewal paperwork after final spring grades are posted.",
    action: "Prep documents",
  },
  {
    title: "Leadership hours",
    description:
      "Log final two peer-mentoring sessions to close out leadership elective requirement before finals week.",
  },
];

function AcademicRecordSection(): ReactElement {
  return (
    <section id="academic-record" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Academic record
          </h2>
          <p className="text-sm text-red-200/75">
            Keep eligibility requirements aligned with your current semester
            planning.
          </p>
        </div>
        <div className="inline-flex flex-col items-start gap-1 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-red-200/70">
            Credit pacing
          </span>
          <span className="text-sm font-semibold text-red-100">
            18 / 24 credits in progress
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-red-200/70">
            Maintaining eligibility margin
          </span>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <RedSurface
          tone="muted"
          className="flex flex-col gap-6 p-6 text-red-50"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Credit load overview
            </p>
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl font-semibold">18</span>
              <span className="text-sm text-red-200/80">
                of 24 target credits confirmed for the current semester
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-red-500/20">
              <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-red-400 via-red-300 to-rose-300" />
            </div>
            <p className="text-xs text-red-200/80">
              6 additional credits available for optional sport science
              electives to maintain eligibility.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {creditDistribution.map((creditArea) => (
              <div
                key={creditArea.label}
                className="rounded-2xl border border-red-500/20 bg-red-900/30 p-3"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-red-200/60">
                  {creditArea.label}
                </p>
                <p className="text-sm font-semibold text-red-50">
                  {creditArea.value}
                </p>
                <p className="text-xs text-red-200/70">{creditArea.context}</p>
              </div>
            ))}
          </div>
        </RedSurface>
        <RedSurface
          tone="muted"
          className="flex flex-col gap-4 p-6 text-red-50"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Program insights
            </p>
          </div>
          <dl className="grid gap-3">
            {summaryInsights.map((insight) => (
              <div key={insight.label} className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/40 bg-red-500/10 text-red-100">
                    <insight.icon size={18} />
                  </span>
                  <dt className="text-sm text-red-200/70">{insight.label}</dt>
                </div>
                <dd className="text-lg font-semibold text-red-50">
                  {insight.value}
                </dd>
                <span className="text-xs text-red-200/70">
                  {insight.context}
                </span>
              </div>
            ))}
          </dl>
        </RedSurface>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {academicModules.map((module) => (
            <RedSurface
              key={module.code}
              as="article"
              tone="muted"
              className="flex h-full flex-col gap-4 p-5 text-red-50"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-red-200/70">
                <span>{module.code}</span>
                <span>{module.credits} credits</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-50">
                    {module.title}
                  </h3>
                  <p className="text-sm text-red-100/80">{module.focus}</p>
                </div>
                <span className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-200">
                  {module.grade}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em]">
                <span
                  className={`rounded-full border px-3 py-1 ${statusStyles[module.status]}`}
                >
                  {module.status}
                </span>
                <span className="text-red-200/80">
                  Next evaluation · {module.nextEvaluation}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-red-200/60">
                  <span>Focus checkpoint</span>
                  <span>{module.progress}% complete</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-red-500/20">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-red-400 via-red-300 to-rose-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            </RedSurface>
          ))}
        </div>

        <div className="grid gap-4">
          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Upcoming evaluations
              </p>
              <span className="text-xs text-red-200/60">Next 30 days</span>
            </div>
            <ul className="space-y-3">
              {upcomingEvaluations.map((evaluation) => (
                <li
                  key={`${evaluation.module}-${evaluation.date}`}
                  className="space-y-1 rounded-2xl border border-red-500/20 bg-red-900/30 p-3"
                >
                  <p className="text-sm font-semibold text-red-50">
                    {evaluation.module}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                    {evaluation.type}
                  </p>
                  <p className="text-sm text-red-100/80">Due {evaluation.date}</p>
                </li>
              ))}
            </ul>
          </RedSurface>

          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Eligibility checklist
              </p>
              <span className="text-xs text-red-200/60">Auto-synced daily</span>
            </div>
            <ul className="space-y-3">
              {eligibilityChecklist.map((item) => {
                const statusConfig =
                  checklistStatusStyles[item.status] ??
                  checklistStatusStyles["On track"];
                const Icon = statusConfig.icon;

                return (
                  <li
                    key={item.label}
                    className="flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-900/30 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${statusConfig.iconWrapper}`}
                        >
                          <Icon size={18} />
                        </span>
                        <p className="text-sm font-semibold text-red-50">
                          {item.label}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] ${statusConfig.badge}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-red-200/70">{item.detail}</p>
                  </li>
                );
              })}
            </ul>
          </RedSurface>

          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 p-6 text-red-50"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Advisor guidance
              </p>
              <span className="text-xs text-red-200/60">Last sync Apr 10</span>
            </div>
            <ul className="space-y-3">
              {advisorNotes.map((note) => (
                <li
                  key={note.title}
                  className="flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-900/30 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-red-50">
                        {note.title}
                      </p>
                      <p className="text-sm text-red-100/80">
                        {note.description}
                      </p>
                    </div>
                    {note.action ? (
                      <span className="inline-flex items-center rounded-full border border-red-400/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-red-200/70">
                        {note.action}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default AcademicRecordSection;
