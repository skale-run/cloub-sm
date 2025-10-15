import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import {
  CalendarDays,
  ChevronUp,
  ClipboardCheck,
  Flag,
  Users,
} from "../../lucide-react";

type HighlightItem = {
  title: string;
  detail: string;
};

type ActionItem = {
  title: string;
  owner: string;
  due: string;
  status: string;
};

type CompetencyScore = {
  label: string;
  score: number;
  note: string;
};

function CoachEvaluationSection(): ReactElement {
  const { t } = useTranslation();

  const evaluationSummary = {
    overallScore: 4.2,
    leadCoach: t("coachEvaluation.summary.leadCoach.value"),
    lastReview: t("coachEvaluation.summary.lastReview.value"),
    nextReview: t("coachEvaluation.summary.nextTouchpoint.value"),
    momentum: t("coachEvaluation.summary.momentum.value"),
    focusStatement: t("coachEvaluation.summary.focusStatement"),
  };

  const highlightWins = t("coachEvaluation.highlightWins.items", {
    returnObjects: true,
  }) as HighlightItem[];

  const watchList = t("coachEvaluation.watchList.items", {
    returnObjects: true,
  }) as HighlightItem[];

  const actionItems = t("coachEvaluation.accountability.items", {
    returnObjects: true,
  }) as ActionItem[];

  const competencyScores = t("coachEvaluation.competencySnapshot.scores", {
    returnObjects: true,
  }) as CompetencyScore[];

  const statusChipClassName =
    "inline-flex items-center rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-100";

  const overallScoreLabel = evaluationSummary.overallScore.toFixed(1);

  return (
    <section id="coach-evaluation" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("coachEvaluation.heading")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("coachEvaluation.description")}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/45 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100 shadow-[0_12px_35px_rgba(250,204,21,0.25)]">
          <ChevronUp size={16} className="text-amber-200" aria-hidden />
          {t("coachEvaluation.overallLabel")} · {overallScoreLabel} / 5
        </span>
      </div>

      <RedSurface tone="muted" className="space-y-8 rounded-3xl p-6 text-red-50 sm:p-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.focusLabel")}
            </p>
            <p className="text-sm text-red-100/80">
              {evaluationSummary.focusStatement}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/40 bg-gradient-to-r from-red-500/25 via-red-500/10 to-transparent px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:from-red-500/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            <ClipboardCheck size={16} aria-hidden />
            {t("coachEvaluation.addNote")}
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RedSurface tone="glass" className="flex flex-col gap-3 rounded-2xl p-4 shadow-[0_18px_55px_rgba(127,29,29,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("coachEvaluation.summary.leadCoach.label")}
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-100/90">
                <Users size={18} aria-hidden />
              </span>
            </div>
            <p className="text-sm font-semibold text-red-50">
              {evaluationSummary.leadCoach}
            </p>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-3 rounded-2xl p-4 shadow-[0_18px_55px_rgba(127,29,29,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("coachEvaluation.summary.lastReview.label")}
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-100/90">
                <CalendarDays size={18} aria-hidden />
              </span>
            </div>
            <p className="text-sm font-semibold text-red-50">
              {evaluationSummary.lastReview}
            </p>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-3 rounded-2xl p-4 shadow-[0_18px_55px_rgba(127,29,29,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("coachEvaluation.summary.nextTouchpoint.label")}
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/15 text-red-100/90">
                <CalendarDays size={18} aria-hidden />
              </span>
            </div>
            <p className="text-sm font-semibold text-red-50">
              {evaluationSummary.nextReview}
            </p>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-3 rounded-2xl p-4 shadow-[0_18px_55px_rgba(127,29,29,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("coachEvaluation.summary.momentum.label")}
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/20 text-amber-100">
                <Flag size={18} aria-hidden />
              </span>
            </div>
            <p className="text-sm font-semibold text-red-50">
              {evaluationSummary.momentum}
            </p>
          </RedSurface>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <RedSurface tone="glass" className="rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.highlightWins.heading")}
                </p>
                <ul className="mt-4 space-y-3">
                  {highlightWins.map((item) => (
                    <RedSurface
                      key={item.title}
                      as="li"
                      tone="glass"
                      className="grid gap-1 rounded-2xl border border-red-400/20 bg-red-900/30 p-3 text-sm text-red-100/85"
                    >
                      <p className="font-semibold text-red-50">{item.title}</p>
                      <p>{item.detail}</p>
                    </RedSurface>
                  ))}
                </ul>
              </RedSurface>

              <RedSurface tone="glass" className="rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.watchList.heading")}
                </p>
                <ul className="mt-4 space-y-3">
                  {watchList.map((item) => (
                    <RedSurface
                      key={item.title}
                      as="li"
                      tone="glass"
                      className="grid gap-1 rounded-2xl border border-red-400/20 bg-red-900/30 p-3 text-sm text-red-100/85"
                    >
                      <p className="font-semibold text-red-50">{item.title}</p>
                      <p>{item.detail}</p>
                    </RedSurface>
                  ))}
                </ul>
              </RedSurface>
            </div>

            <RedSurface tone="glass" className="rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.accountability.heading")}
                </p>
                <span className={statusChipClassName}>
                  {t("coachEvaluation.accountability.updatedLabel")}
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {actionItems.map((item) => (
                  <RedSurface
                    key={item.title}
                    as="li"
                    tone="glass"
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/25 bg-red-950/40 px-4 py-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-red-50">
                        {item.title}
                      </p>
                      <p className="text-xs text-red-100/70">
                        {t("coachEvaluation.accountability.ownerPrefix", {
                          owner: item.owner,
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-right text-xs text-red-100/75">
                      <span className={statusChipClassName}>{item.status}</span>
                      <p>
                        {t("coachEvaluation.accountability.dueLabel", {
                          date: item.due,
                        })}
                      </p>
                    </div>
                  </RedSurface>
                ))}
              </ul>
            </RedSurface>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.competencySnapshot.heading")}
            </h3>
            <ul className="space-y-4">
              {competencyScores.map((competency) => (
                <RedSurface
                  key={competency.label}
                  as="li"
                  tone="glass"
                  className="rounded-2xl p-4 text-red-50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-red-50">
                      {competency.label}
                    </p>
                    <span className="text-sm font-semibold text-red-50">
                      {competency.score.toFixed(1)} / 5
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-red-100/80">
                    {competency.note}
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-red-950/45" role="presentation">
                    <div
                      role="progressbar"
                      aria-label={competency.label}
                      aria-valuenow={competency.score}
                      aria-valuemin={0}
                      aria-valuemax={5}
                      className="h-full rounded-full bg-gradient-to-r from-amber-400/80 via-amber-300/80 to-red-300/80"
                      style={{ width: `${(competency.score / 5) * 100}%` }}
                    />
                  </div>
                </RedSurface>
              ))}
            </ul>
          </div>
        </div>
      </RedSurface>
    </section>
  );
}

export default CoachEvaluationSection;
