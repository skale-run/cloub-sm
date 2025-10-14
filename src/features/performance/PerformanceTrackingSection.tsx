import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'

const technicalMilestones = [
  {
    phase: 'Block phase',
    milestone: 'Shin angles within 45° for first three steps',
    status: 'Verified on Apr 12 video review',
  },
  {
    phase: 'Acceleration',
    milestone: 'Maintain horizontal force through 30m mark',
    status: 'Needs second cue · schedule sled sprints',
  },
]

const attendanceSummary = {
  totalSessions: 46,
  attended: 42,
  excused: 3,
  missed: 1,
}

const trainingStatistics = [
  { label: 'Total hours', value: '118h', trend: '+6% vs last block' },
  { label: 'Sessions logged', value: '64', trend: 'Target: 72 sessions' },
  { label: 'Load score', value: 'Moderate', trend: 'Maintain during taper' },
]

const competitionResults = [
  { event: 'Metropolitan Invitational', result: '400m · 49.20s', placing: 'Bronze' },
  { event: 'State Indoor Championships', result: '200m · 21.80s', placing: 'Finalist' },
]

const weightTrend = [
  { label: 'Week 13', weight: '78.4 kg' },
  { label: 'Week 14', weight: '78.1 kg' },
  { label: 'Week 15', weight: '77.9 kg' },
  { label: 'Week 16', weight: '78.0 kg' },
]

function PerformanceTrackingSection(): ReactElement {
  const attendanceRate = Math.round((attendanceSummary.attended / attendanceSummary.totalSessions) * 100)

  return (
    <section className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-rose-50 sm:text-2xl">Performance tracking</h2>
        <p className="text-sm text-rose-200/75">
          Draft dashboard for monitoring technical progress, presence milestones and competitive readiness.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <RedSurface id="technical-progress" as="article" tone="muted" className="space-y-4 p-6 text-rose-50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-rose-50">Technical progress</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-rose-200/70">Last audit · Apr 12</span>
          </div>
          <ul className="space-y-3">
            {technicalMilestones.map((item) => (
              <RedSurface key={item.phase} as="li" tone="glass" className="rounded-2xl p-4">
                <p className="text-sm font-semibold text-rose-50">{item.phase}</p>
                <p className="mt-1 text-sm text-rose-100/80">{item.milestone}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-rose-200/80">{item.status}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface id="attendance-total" as="article" tone="muted" className="space-y-4 p-6 text-rose-50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-rose-50">Total attendance</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-rose-200/70">{attendanceSummary.totalSessions} sessions</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-rose-400/50 bg-rose-950 text-2xl font-semibold text-rose-50">
              {attendanceRate}%
            </div>
            <dl className="grid flex-1 gap-2 text-sm">
              <RedSurface as="div" tone="glass" className="flex items-center justify-between rounded-2xl px-4 py-2">
                <dt className="text-rose-200/70">Attended</dt>
                <dd className="font-semibold text-rose-50">{attendanceSummary.attended}</dd>
              </RedSurface>
              <RedSurface as="div" tone="glass" className="flex items-center justify-between rounded-2xl px-4 py-2">
                <dt className="text-rose-200/70">Excused</dt>
                <dd className="font-semibold text-rose-50">{attendanceSummary.excused}</dd>
              </RedSurface>
              <RedSurface as="div" tone="glass" className="flex items-center justify-between rounded-2xl px-4 py-2">
                <dt className="text-rose-200/70">Unexcused</dt>
                <dd className="font-semibold text-rose-50">{attendanceSummary.missed}</dd>
              </RedSurface>
            </dl>
          </div>
        </RedSurface>
      </div>

      <RedSurface id="training-statistics" as="article" tone="muted" className="space-y-4 p-6 text-rose-50">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-rose-50">Training statistics</h3>
          <span className="text-xs uppercase tracking-[0.3em] text-rose-200/70">Block summary</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {trainingStatistics.map((stat) => (
            <RedSurface key={stat.label} tone="glass" className="rounded-2xl p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200/70">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-rose-50">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-rose-200/80">{stat.trend}</p>
            </RedSurface>
          ))}
        </div>
      </RedSurface>

      <div className="grid gap-6 lg:grid-cols-2">
        <RedSurface id="competition-results" as="article" tone="muted" className="space-y-4 p-6 text-rose-50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-rose-50">Competition results</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-rose-200/70">Season highlights</span>
          </div>
          <ul className="space-y-3">
            {competitionResults.map((meet) => (
              <RedSurface key={meet.event} as="li" tone="glass" className="rounded-2xl p-4">
                <p className="text-sm font-semibold text-rose-50">{meet.event}</p>
                <p className="mt-1 text-sm text-rose-100/80">{meet.result}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-rose-200/80">Placement · {meet.placing}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>

        <RedSurface id="weight-tracking" as="article" tone="muted" className="space-y-4 p-6 text-rose-50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-rose-50">Body weight log</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-rose-200/70">Weekly check-ins</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {weightTrend.map((entry) => (
              <RedSurface key={entry.label} tone="glass" className="rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-rose-200/70">{entry.label}</p>
                <p className="mt-2 text-lg font-semibold text-rose-50">{entry.weight}</p>
              </RedSurface>
            ))}
          </div>
          <p className="text-sm text-rose-100/80">
            Range target 77.8 kg – 78.4 kg. Flag a nutrition review if weight drifts outside band for two consecutive weeks.
          </p>
        </RedSurface>
      </div>
    </section>
  )
}

export default PerformanceTrackingSection
