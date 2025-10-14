import type { ReactElement } from 'react'

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
        <h2 className="text-xl font-semibold text-white sm:text-2xl">Performance tracking</h2>
        <p className="text-sm text-slate-400/80">
          Draft dashboard for monitoring technical progress, presence milestones and competitive readiness.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <article id="technical-progress" className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Technical progress</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Last audit · Apr 12</span>
          </div>
          <ul className="space-y-3">
            {technicalMilestones.map((item) => (
              <li key={item.phase} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{item.phase}</p>
                <p className="mt-1 text-sm text-slate-300/90">{item.milestone}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-sky-200/80">{item.status}</p>
              </li>
            ))}
          </ul>
        </article>

        <article id="attendance-total" className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Total attendance</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400/70">{attendanceSummary.totalSessions} sessions</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-sky-400/50 bg-slate-950 text-2xl font-semibold text-white">
              {attendanceRate}%
            </div>
            <dl className="grid flex-1 gap-2 text-sm">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                <dt className="text-slate-400/80">Attended</dt>
                <dd className="font-semibold text-white">{attendanceSummary.attended}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                <dt className="text-slate-400/80">Excused</dt>
                <dd className="font-semibold text-white">{attendanceSummary.excused}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-2">
                <dt className="text-slate-400/80">Unexcused</dt>
                <dd className="font-semibold text-white">{attendanceSummary.missed}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>

      <article id="training-statistics" className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">Training statistics</h3>
          <span className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Block summary</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {trainingStatistics.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">{stat.label}</p>
              <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-sky-200/80">{stat.trend}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-6 lg:grid-cols-2">
        <article id="competition-results" className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Competition results</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Season highlights</span>
          </div>
          <ul className="space-y-3">
            {competitionResults.map((meet) => (
              <li key={meet.event} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">{meet.event}</p>
                <p className="mt-1 text-sm text-slate-300/90">{meet.result}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-sky-200/80">Placement · {meet.placing}</p>
              </li>
            ))}
          </ul>
        </article>

        <article id="weight-tracking" className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-white">Body weight log</h3>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Weekly check-ins</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {weightTrend.map((entry) => (
              <div key={entry.label} className="rounded-2xl border border-white/5 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">{entry.label}</p>
                <p className="mt-2 text-lg font-semibold text-white">{entry.weight}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-300/90">
            Range target 77.8 kg – 78.4 kg. Flag a nutrition review if weight drifts outside band for two consecutive weeks.
          </p>
        </article>
      </div>
    </section>
  )
}

export default PerformanceTrackingSection
