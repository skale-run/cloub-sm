import type { ReactElement } from "react";
import RedSurface from "../../components/RedSurface";
import {
  CalendarDays,
  ChevronUp,
  ClipboardCheck,
  Flag,
  Users,
} from "../../lucide-react";

const evaluationSummary = {
  overallScore: 4.2,
  leadCoach: "Coach Amara Lewis",
  lastReview: "Apr 18, 2024",
  nextReview: "May 2, 2024",
  momentum: "Positive trend",
  focusStatement: "Sharpen top-end speed for national trials in May.",
};

const highlightWins = [
  {
    title: "Block work clicking",
    detail:
      "Explosive phase is cleaner after contrast sprints · keep 2x weekly rhythm drills.",
  },
  {
    title: "Race rehearsal",
    detail:
      "Confidence high following indoor meet simulation · pre-race routine locked in.",
  },
];

const watchList = [
  {
    title: "Late-race relaxation",
    detail:
      "Neck and jaw tension returning under fatigue · integrate breathing reset cue.",
  },
  {
    title: "Regeneration block",
    detail:
      "Sleep quality dipped on travel week · align physio flush with light tempo day.",
  },
];

const actionItems = [
  {
    title: "30m fly timing",
    owner: "Coach Lewis",
    due: "Apr 26",
    status: "Scheduled",
  },
  {
    title: "Sprint mechanics video review",
    owner: "Athlete",
    due: "Apr 24",
    status: "In progress",
  },
  {
    title: "Hydration tracker check-in",
    owner: "Performance staff",
    due: "Weekly",
    status: "On track",
  },
];

const competencyScores = [
  {
    label: "Explosive starts",
    score: 4.5,
    note: "Improved block exit · maintain shin angle drills",
  },
  {
    label: "Speed endurance",
    score: 4.2,
    note: "Hold form in final 60m · add resisted runs",
  },
  {
    label: "Race tactics",
    score: 4.0,
    note: "Continue video briefs · refine lane positioning",
  },
  {
    label: "Recovery habits",
    score: 3.8,
    note: "Consistency improving · log hydration daily",
  },
];

function CoachEvaluationSection(): ReactElement {
  return (
    <section id="coach-evaluation" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Coach evaluation
          </h2>
          <p className="text-sm text-red-200/75">
            Snapshot from the latest bi-weekly meeting with the coaching staff.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-3xl border border-amber-400/40 bg-amber-500/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
          <ChevronUp size={16} className="text-amber-200" aria-hidden />
          Overall · {evaluationSummary.overallScore.toFixed(1)} / 5
        </span>
      </div>

      <RedSurface tone="muted" className="space-y-6 rounded-3xl p-6 text-red-50">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Focus for next review
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
            Add coach note
          </button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Lead coach
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <Users size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.leadCoach}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Last review
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <CalendarDays size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.lastReview}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Next touchpoint
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-red-50">
              <CalendarDays size={18} aria-hidden className="text-red-200/80" />
              {evaluationSummary.nextReview}
            </div>
          </RedSurface>
          <RedSurface tone="glass" className="flex flex-col gap-1 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              Momentum
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
                  Momentum drivers
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
                  Watch closely
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
                  Accountability board
                </p>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
                  Updated weekly
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
                        Owner · {item.owner}
                      </p>
                    </div>
                    <div className="text-right text-xs text-red-100/70">
                      <p className="font-semibold uppercase tracking-[0.25em] text-red-100">
                        {item.status}
                      </p>
                      <p>Due {item.due}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </RedSurface>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-[0.3em] text-red-200/70">
              Competency snapshot
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
