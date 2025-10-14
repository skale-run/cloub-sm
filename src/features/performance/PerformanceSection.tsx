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
  { label: 'Speed Index', value: 86, target: 92, color: 'var(--color-primary)' },
  {
    label: 'Recovery Quality',
    value: 74,
    target: 85,
    color: 'var(--color-success)',
  },
  {
    label: 'Consistency Score',
    value: 81,
    target: 88,
    color: 'var(--color-warning)',
  },
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
    <section id="performance" className="panel">
      <div className="panel__header">
        <h2>Performance Dashboard</h2>
        <span className="panel__tag">Live metrics</span>
      </div>
      <div className="performance-grid">
        <div className="performance-grid__primary">
          {performanceMetrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <div className="metric-card__header">
                <h3>{metric.label}</h3>
                <span>{metric.value}%</span>
              </div>
              <div
                className="metric-card__bar"
                role="img"
                aria-label={`${metric.label} at ${metric.value}%`}
              >
                <div
                  className="metric-card__progress"
                  style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                />
                <div className="metric-card__target" style={{ left: `${metric.target}%` }} />
              </div>
              <p className="metric-card__caption">Target · {metric.target}%</p>
            </div>
          ))}
        </div>
        <aside className="performance-grid__side">
          <h3>Focus Areas</h3>
          <ul>
            {focusAreas.map((area) => (
              <li key={area.title}>
                <p className="focus-area__title">{area.title}</p>
                <p className="focus-area__description">{area.description}</p>
                <p className="focus-area__trend">{area.trend}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default PerformanceSection
