import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'

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
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Progress insight</h2>
          <p className="text-sm text-red-200/75">Quarter-to-date progression towards the season performance targets.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-3xl border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          Ahead of plan
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface tone="muted" className="rounded-3xl p-6 text-red-50">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-red-50">Performance trend</h3>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Season rating</p>
          </header>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trendPoints.map((point) => (
              <div key={point.label} className="flex flex-col items-center gap-2">
                <RedSurface tone="glass" className="flex h-36 w-full items-end justify-center rounded-2xl p-2">
                  <div className="relative flex h-full w-6 flex-col justify-end">
                    <div
                      className="rounded-t-lg bg-red-400/60"
                      style={{ height: `${point.performance}%` }}
                      aria-hidden
                    />
                    <div
                      className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-red-200/70 bg-red-950"
                      style={{ bottom: `calc(100% - ${point.target}%)` }}
                      aria-hidden
                    />
                  </div>
                </RedSurface>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">{point.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-red-100/80">
            Target line marks desired progression for the quarter. Maintain current training density and continue sleep tracking.
          </p>
        </RedSurface>

        <RedSurface as="aside" tone="muted" className="flex flex-col gap-4 rounded-3xl p-6 text-red-50">
          <h3 className="text-lg font-semibold text-red-50">Coach alerts</h3>
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <RedSurface key={alert.title} as="li" tone="glass" className="rounded-2xl p-4">
                <p className="text-sm font-semibold text-red-50">{alert.title}</p>
                <p className="mt-1 text-sm text-red-100/80">{alert.detail}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>
      </div>
    </section>
  )
}

export default ProgressOverviewSection
