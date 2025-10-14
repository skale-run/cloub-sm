import type { ReactElement } from 'react'

type PerformanceMetric = {
  label: string
  value: number
  target: number
  color: string
}

type FocusArea = {
  title: string
  description: string
  trend: string
}

const performanceMetrics: PerformanceMetric[] = [
  { label: 'Speed Index', value: 86, target: 92, color: '#38bdf8' },
  { label: 'Recovery Quality', value: 74, target: 85, color: '#34d399' },
  { label: 'Consistency Score', value: 81, target: 88, color: '#facc15' },
]

const focusAreas: FocusArea[] = [
  {
    title: 'Weekly Mileage',
    description: 'Target 48 km · Currently at 44 km',
    trend: '+6% vs last week',
  },
  {
    title: 'Strength Sessions',
    description: 'Completed 3/4 scheduled lifts',
    trend: 'Maintain intensity, add mobility finisher',
  },
  {
    title: 'Sleep & Recovery',
    description: 'Average 7h 10m · Aim for 7h 45m',
    trend: 'Add pre-sleep routine · Reduce screen time',
  },
]

function PerformanceSection(): ReactElement {
  return (
    <section id="performance" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Performance Dashboard</h2>
          <p className="text-sm text-slate-400/80">Track the live KPIs that shape your next taper and podium run.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">
          Live metrics
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="grid gap-5">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-white">{metric.label}</h3>
                <span className="text-2xl font-semibold text-white">{metric.value}%</span>
              </div>
              <div className="relative mt-5 h-2 rounded-full bg-slate-800/70">
                <div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                  aria-hidden
                />
                <div
                  className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-white/60 bg-slate-950"
                  style={{ left: `${metric.target}%` }}
                  aria-hidden
                />
              </div>
              <p className="mt-4 text-sm text-slate-400/80">Target · {metric.target}%</p>
            </div>
          ))}
        </div>

        <aside className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200">
          <h3 className="text-lg font-semibold text-white">Focus areas</h3>
          <ul className="space-y-4">
            {focusAreas.map((area) => (
              <li key={area.title} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{area.title}</p>
                <p className="mt-1 text-sm text-slate-300/90">{area.description}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-sky-200/80">{area.trend}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default PerformanceSection
