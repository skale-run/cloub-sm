import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
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

type Translate = (key: string, options?: Record<string, unknown>) => string;

const SUMMARY_INSIGHTS = [
  { key: "currentGpa", icon: GaugeCircle },
  { key: "scholarshipStanding", icon: Award },
  { key: "graduationPlan", icon: GraduationCap },
] as const;

const CREDIT_DISTRIBUTION = [
  { key: "coreCurriculum" },
  { key: "researchLabs" },
  { key: "electives" },
] as const;

const UPCOMING_EVALUATIONS = [
  { key: "capstonePresentation" },
  { key: "researchColloquium" },
  { key: "internshipReflection" },
] as const;

type ModuleStatus = "onTrack" | "completed" | "actionNeeded";

type ModuleTranslationKey =
  | "capstoneResearchStudio"
  | "dataVisualizationLab"
  | "communityImpactSeminar";

type ModuleConfig = {
  code: string;
  translationKey: ModuleTranslationKey;
  credits: number;
  status: ModuleStatus;
  grade: string;
  progress: number;
};

const ACADEMIC_MODULES: ModuleConfig[] = [
  {
    code: "CS 482",
    translationKey: "capstoneResearchStudio",
    credits: 4,
    status: "onTrack",
    grade: "A-",
    progress: 78,
  },
  {
    code: "STAT 325",
    translationKey: "dataVisualizationLab",
    credits: 3,
    status: "actionNeeded",
    grade: "B+",
    progress: 54,
  },
  {
    code: "SOC 210",
    translationKey: "communityImpactSeminar",
    credits: 2,
    status: "completed",
    grade: "A",
    progress: 100,
  },
];

const statusStyles: Record<ModuleStatus, string> = {
  onTrack: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  completed: "bg-blue-500/10 text-blue-200 border-blue-400/40",
  actionNeeded: "bg-amber-500/15 text-amber-200 border-amber-400/40",
};

type ChecklistStatus = "onTrack" | "reviewNeeded" | "scheduled";

const checklistStatusStyles: Record<
  ChecklistStatus,
  { badge: string; icon: LucideIcon; iconWrapper: string }
> = {
  onTrack: {
    badge: "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    icon: ClipboardCheck,
    iconWrapper:
      "border border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  },
  reviewNeeded: {
    badge: "border border-amber-400/40 bg-amber-500/15 text-amber-200",
    icon: Flag,
    iconWrapper: "border border-amber-400/40 bg-amber-500/15 text-amber-200",
  },
  scheduled: {
    badge: "border border-sky-400/40 bg-sky-500/15 text-sky-200",
    icon: CalendarDays,
    iconWrapper: "border border-sky-400/40 bg-sky-500/15 text-sky-200",
  },
};

const ELIGIBILITY_CHECKLIST = [
  { key: "financialAid", status: "onTrack" as const },
  { key: "internshipPaperwork", status: "reviewNeeded" as const },
  { key: "advisorMeeting", status: "scheduled" as const },
];

const ADVISOR_NOTES = [
  { key: "degreeAudit", hasAction: true },
  { key: "researchFunding", hasAction: true },
  { key: "careerMentorship", hasAction: false },
] as const;

function AcademicRecordSection(): ReactElement {
  const { t } = useTranslation();
  const confirmedCredits = 18;
  const targetCredits = 24;
  const optionalCredits = 6;

  return (
    <section id="academic-record" className="space-y-6">
      <SectionHeader
        t={t}
        confirmedCredits={confirmedCredits}
        targetCredits={targetCredits}
      />

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <CreditOverviewCard
          t={t}
          confirmedCredits={confirmedCredits}
          targetCredits={targetCredits}
          optionalCredits={optionalCredits}
        />
        <ProgramInsightsCard t={t} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <ModuleGrid t={t} modules={ACADEMIC_MODULES} />
        <div className="grid gap-4">
          <UpcomingEvaluationsCard t={t} />
          <ChecklistCard t={t} />
          <AdvisorGuidanceCard t={t} />
        </div>
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  t: Translate;
  confirmedCredits: number;
  targetCredits: number;
};

function SectionHeader({
  t,
  confirmedCredits,
  targetCredits,
}: SectionHeaderProps): ReactElement {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
          {t("information.academic.heading")}
        </h2>
        <p className="text-sm text-red-200/75">
          {t("information.academic.description")}
        </p>
      </div>
      <div className="inline-flex flex-col items-start gap-1 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-red-200/70">
          {t("information.academic.creditBadge.label")}
        </span>
        <span className="text-sm font-semibold text-red-100">
          {t("information.academic.creditBadge.value", {
            current: confirmedCredits,
            target: targetCredits,
          })}
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.creditBadge.helper")}
        </span>
      </div>
    </div>
  );
}

type CreditOverviewCardProps = {
  t: Translate;
  confirmedCredits: number;
  targetCredits: number;
  optionalCredits: number;
};

function CreditOverviewCard({
  t,
  confirmedCredits,
  targetCredits,
  optionalCredits,
}: CreditOverviewCardProps): ReactElement {
  return (
    <RedSurface tone="muted" className="flex flex-col gap-6 p-6 text-red-50">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.creditLoad.heading")}
        </p>
        <div className="flex flex-wrap items-end gap-3">
          <span className="text-4xl font-semibold">{confirmedCredits}</span>
          <span className="text-sm text-red-200/80">
            {t("information.academic.creditLoad.caption", {
              current: confirmedCredits,
              target: targetCredits,
            })}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-2 overflow-hidden rounded-full bg-red-500/20">
          <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-red-400 via-red-300 to-rose-300" />
        </div>
        <p className="text-xs text-red-200/80">
          {t("information.academic.creditLoad.helper", {
            available: optionalCredits,
          })}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {CREDIT_DISTRIBUTION.map((creditArea) => (
          <div
            key={creditArea.key}
            className="rounded-2xl border border-red-500/20 bg-red-900/30 p-3"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-red-200/60">
              {t(
                `information.academic.creditDistribution.${creditArea.key}.label`,
              )}
            </p>
            <p className="text-sm font-semibold text-red-50">
              {t(
                `information.academic.creditDistribution.${creditArea.key}.value`,
              )}
            </p>
            <p className="text-xs text-red-200/70">
              {t(
                `information.academic.creditDistribution.${creditArea.key}.context`,
              )}
            </p>
          </div>
        ))}
      </div>
    </RedSurface>
  );
}

type ProgramInsightsCardProps = {
  t: Translate;
};

function ProgramInsightsCard({ t }: ProgramInsightsCardProps): ReactElement {
  return (
    <RedSurface tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.programInsights.heading")}
        </p>
      </div>
      <dl className="grid gap-3">
        {SUMMARY_INSIGHTS.map((insight) => (
          <div key={insight.key} className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/40 bg-red-500/10 text-red-100">
                <insight.icon size={18} />
              </span>
              <dt className="text-sm text-red-200/70">
                {t(`information.academic.summaryInsights.${insight.key}.label`)}
              </dt>
            </div>
            <dd className="text-lg font-semibold text-red-50">
              {t(`information.academic.summaryInsights.${insight.key}.value`)}
            </dd>
            <span className="text-xs text-red-200/70">
              {t(`information.academic.summaryInsights.${insight.key}.context`)}
            </span>
          </div>
        ))}
      </dl>
    </RedSurface>
  );
}

type ModuleGridProps = {
  t: Translate;
  modules: ModuleConfig[];
};

function ModuleGrid({ t, modules }: ModuleGridProps): ReactElement {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {modules.map((module) => {
        const nextEvaluationDate = t(
          `information.academic.modules.${module.translationKey}.nextEvaluationDate`,
        );

        return (
          <RedSurface
            key={module.code}
            as="article"
            tone="muted"
            className="flex h-full flex-col gap-4 p-5 text-red-50"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-red-200/70">
              <span>{module.code}</span>
              <span>
                {t("information.academic.modules.credits", {
                  count: module.credits,
                })}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-red-50">
                  {t(
                    `information.academic.modules.${module.translationKey}.title`,
                  )}
                </h3>
                <p className="text-sm text-red-100/80">
                  {t(
                    `information.academic.modules.${module.translationKey}.focus`,
                  )}
                </p>
              </div>
              <span className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-200">
                {module.grade}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em]">
              <span
                className={`rounded-full border px-3 py-1 ${statusStyles[module.status]}`}
              >
                {t(`information.academic.moduleStatuses.${module.status}`)}
              </span>
              <span className="text-red-200/80">
                {t("information.academic.modules.nextEvaluationLabel", {
                  date: nextEvaluationDate,
                })}
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-red-200/60">
                <span>{t("information.academic.modules.focusCheckpoint")}</span>
                <span>
                  {t("information.academic.modules.progress", {
                    percent: module.progress,
                  })}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-red-500/20">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-red-400 via-red-300 to-rose-300"
                  style={{ width: `${module.progress}%` }}
                />
              </div>
            </div>
          </RedSurface>
        );
      })}
    </div>
  );
}

type UpcomingEvaluationsCardProps = {
  t: Translate;
};

function UpcomingEvaluationsCard({
  t,
}: UpcomingEvaluationsCardProps): ReactElement {
  return (
    <RedSurface tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.upcomingEvaluations.heading")}
        </p>
        <span className="text-xs text-red-200/60">
          {t("information.academic.upcomingEvaluations.helper")}
        </span>
      </div>
      <ul className="space-y-3">
        {UPCOMING_EVALUATIONS.map((evaluation) => {
          const date = t(
            `information.academic.upcomingEvaluations.${evaluation.key}.date`,
          );

          return (
            <li
              key={evaluation.key}
              className="space-y-1 rounded-2xl border border-red-500/20 bg-red-900/30 p-3"
            >
              <p className="text-sm font-semibold text-red-50">
                {t(
                  `information.academic.upcomingEvaluations.${evaluation.key}.module`,
                )}
              </p>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t(
                  `information.academic.upcomingEvaluations.${evaluation.key}.type`,
                )}
              </p>
              <p className="text-sm text-red-100/80">
                {t("information.academic.upcomingEvaluations.dateLabel", {
                  date,
                })}
              </p>
            </li>
          );
        })}
      </ul>
    </RedSurface>
  );
}

type ChecklistCardProps = {
  t: Translate;
};

function ChecklistCard({ t }: ChecklistCardProps): ReactElement {
  return (
    <RedSurface tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.checklist.heading")}
        </p>
        <span className="text-xs text-red-200/60">
          {t("information.academic.checklist.helper")}
        </span>
      </div>
      <ul className="space-y-3">
        {ELIGIBILITY_CHECKLIST.map((item) => {
          const statusConfig = checklistStatusStyles[item.status];
          const Icon = statusConfig.icon;

          return (
            <li
              key={item.key}
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
                    {t(
                      `information.academic.checklist.items.${item.key}.label`,
                    )}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] ${statusConfig.badge}`}
                >
                  {t(`information.academic.checklist.statuses.${item.status}`)}
                </span>
              </div>
              <p className="text-xs text-red-200/70">
                {t(`information.academic.checklist.items.${item.key}.detail`)}
              </p>
            </li>
          );
        })}
      </ul>
    </RedSurface>
  );
}

type AdvisorGuidanceCardProps = {
  t: Translate;
};

function AdvisorGuidanceCard({ t }: AdvisorGuidanceCardProps): ReactElement {
  return (
    <RedSurface tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
          {t("information.academic.advisor.heading")}
        </p>
        <span className="text-xs text-red-200/60">
          {t("information.academic.advisor.helper")}
        </span>
      </div>
      <ul className="space-y-3">
        {ADVISOR_NOTES.map((note) => (
          <li
            key={note.key}
            className="flex flex-col gap-2 rounded-2xl border border-red-500/20 bg-red-900/30 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-red-50">
                  {t(`information.academic.advisor.notes.${note.key}.title`)}
                </p>
                <p className="text-sm text-red-100/80">
                  {t(
                    `information.academic.advisor.notes.${note.key}.description`,
                  )}
                </p>
              </div>
              {note.hasAction ? (
                <span className="inline-flex items-center rounded-full border border-red-400/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-red-200/70">
                  {t(`information.academic.advisor.notes.${note.key}.action`)}
                </span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </RedSurface>
  );
}

export default AcademicRecordSection;
