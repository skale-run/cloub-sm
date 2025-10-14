import type { ReactElement } from 'react'

const trendPoints = [
  { label: 'Jan', performance: 72, target: 70 },
  { label: 'Feb', performance: 75, target: 72 },
  { label: 'Mar', performance: 78, target: 75 },
  { label: 'Apr', performance: 82, target: 78 },
]

const alerts = [
  {
    title: 'Acceleration split',
    detail: 'Average 30m time dropped by 0.11s · keep resisted sprint block.',
  },
  {
    title: 'Strength progression',
    detail: 'Back squat at 1.8x BW · maintain 3-week wave loading.',
  },
]

function ProgressOverviewSection(): ReactElement {
  return (
    <section id="progress-overview" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Progress insight</h2>
          <p className="text-sm text-slate-400/80">Quarter-to-date progression towards the season performance targets.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-3xl border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">
          Ahead of plan
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Performance trend</h3>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Season rating</p>
          </header>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {trendPoints.map((point) => (
              <div key={point.label} className="flex flex-col items-center gap-2">
                <div className="flex h-36 w-full items-end justify-center rounded-2xl border border-white/5 bg-white/5 p-2">
                  <div className="relative flex h-full w-6 flex-col justify-end">
                    <div
                      className="rounded-t-lg bg-sky-400/60"
                      style={{ height: `${point.performance}%` }}
                      aria-hidden
                    />
                    <div
                      className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white/70 bg-slate-950"
                      style={{ bottom: `calc(100% - ${point.target}%)` }}
                      aria-hidden
                    />
                  </div>
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">{point.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-300/90">
            Target line marks desired progression for the quarter. Maintain current training density and continue sleep tracking.
          </p>
        </div>

        <aside className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200">
          <h3 className="text-lg font-semibold text-white">Coach alerts</h3>
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={alert.title} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{alert.title}</p>
                <p className="mt-1 text-sm text-slate-300/90">{alert.detail}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default ProgressOverviewSection
