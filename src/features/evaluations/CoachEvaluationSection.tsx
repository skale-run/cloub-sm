import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'

const competencyScores = [
  { label: 'Explosive starts', score: 4.5, note: 'Improved block exit · maintain shin angle drills' },
  { label: 'Speed endurance', score: 4.2, note: 'Hold form in final 60m · add resisted runs' },
  { label: 'Race tactics', score: 4.0, note: 'Continue video briefs · refine lane positioning' },
  { label: 'Recovery habits', score: 3.8, note: 'Consistency improving · log hydration daily' },
]

function CoachEvaluationSection(): ReactElement {
  return (
    <section id="coach-evaluation" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Coach evaluation</h2>
          <p className="text-sm text-red-200/75">Snapshot from the latest bi-weekly meeting with the coaching staff.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-3xl border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">
          Overall · 4.2 / 5
        </span>
      </div>

      <RedSurface tone="muted" className="space-y-4 p-6 text-red-50">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Focus for next review</p>
            <p className="text-sm text-red-100/80">Sharpen top-end speed for national trials in May.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            Add coach note
          </button>
        </header>

        <ul className="space-y-4">
          {competencyScores.map((competency) => (
            <RedSurface key={competency.label} as="li" tone="glass" className="rounded-2xl p-4 text-red-50">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold text-red-50">{competency.label}</p>
                <span className="text-sm font-semibold text-red-50">{competency.score.toFixed(1)} / 5</span>
              </div>
              <p className="mt-2 text-sm text-red-100/80">{competency.note}</p>
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
      </RedSurface>
    </section>
  )
}

export default CoachEvaluationSection
