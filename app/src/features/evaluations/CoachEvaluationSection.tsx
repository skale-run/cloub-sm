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
        <span className="inline-flex items-center gap-2 rounded-3xl border border-amber-400/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
          <ChevronUp size={16} className="text-amber-200" aria-hidden />
          {t("coachEvaluation.overallLabel")} · {evaluationSummary.overallScore.toFixed(1)} / 5
        </span>
      </div>

      <RedSurface tone="muted" className="space-y-6 rounded-3xl p-6 text-red-50">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.focusLabel")}
            </p>
            <p className="text-sm text-red-100/80">
              {evaluationSummary.focusStatement}
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            <ClipboardCheck size={16} aria-hidden />
            {t("coachEvaluation.addNote")}
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.summary.leadCoach.label")}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <Users size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.leadCoach}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.summary.lastReview.label")}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <CalendarDays size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.lastReview}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.summary.nextTouchpoint.label")}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <CalendarDays size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.nextReview}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {t("coachEvaluation.summary.momentum.label")}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <Flag size={18} aria-hidden className="text-amber-200/90" />
              {evaluationSummary.momentum}
            </div>
          </RedSurface>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <RedSurface tone="glass" className="rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.highlightWins.heading")}
                </p>
                <ul className="mt-3 space-y-3">
                  {highlightWins.map((item) => (
                    <li key={item.title} className="space-y-1">
                      <p className="text-sm font-semibold text-red-50">
                        {item.title}
                      </p>
                      <p className="text-sm text-red-100/80">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </RedSurface>

              <RedSurface tone="glass" className="rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.watchList.heading")}
                </p>
                <ul className="mt-3 space-y-3">
                  {watchList.map((item) => (
                    <li key={item.title} className="space-y-1">
                      <p className="text-sm font-semibold text-red-50">
                        {item.title}
                      </p>
                      <p className="text-sm text-red-100/80">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </RedSurface>
            </div>

            <RedSurface tone="glass" className="rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("coachEvaluation.accountability.heading")}
                </p>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
                  {t("coachEvaluation.accountability.updatedLabel")}
                </span>
              </div>
              <ul className="mt-3 space-y-3">
                {actionItems.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-500/10 px-3 py-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-red-50">
                        {item.title}
                      </p>
                      <p className="text-xs text-red-100/70">
                        {t("coachEvaluation.accountability.ownerPrefix", { owner: item.owner })}
                      </p>
                    </div>
                    <div className="text-right text-xs text-red-100/70">
                      <p className="font-semibold uppercase tracking-[0.25em] text-red-100">
                        {item.status}
                      </p>
                      <p>{t("coachEvaluation.accountability.dueLabel", { date: item.due })}</p>
                    </div>
                  </li>
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
                  <div className="mt-3 h-2 rounded-full bg-red-950/45">
                    <div
                      className="h-full rounded-full bg-amber-400/70"
                      style={{ width: `${(competency.score / 5) * 100}%` }}
                      aria-hidden
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
