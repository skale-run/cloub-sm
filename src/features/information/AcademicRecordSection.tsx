import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'

const summaryInsights = [
  {
    label: 'Current GPA',
    value: '3.82',
    context: '+0.12 this term',
  },
  {
    label: 'Scholarship eligibility',
    value: 'Secure',
    context: 'Meets 3.5 GPA minimum',
  },
  {
    label: 'Graduation path',
    value: '62 / 90 credits',
    context: 'On schedule — 2 terms remaining',
  },
]

const upcomingEvaluations = [
  {
    module: 'Applied Sports Psychology',
    type: 'Midterm reflection',
    date: 'May 12',
  },
  {
    module: 'Advanced Biomechanics Lab',
    type: 'Lab report submission',
    date: 'Apr 28',
  },
  {
    module: 'Performance Nutrition Strategies',
    type: 'Capstone workshop',
    date: 'Jun 02',
  },
]

const academicModules = [
  {
    code: 'SPRT201',
    title: 'Applied Sports Psychology',
    credits: 3,
    status: 'On track',
    grade: 'A-',
    focus: 'Mental conditioning focus project',
    nextEvaluation: 'May 12',
  },
  {
    code: 'BIO305',
    title: 'Advanced Biomechanics Lab',
    credits: 4,
    status: 'Lab report due',
    grade: 'B+',
    focus: 'Video gait analysis and report',
    nextEvaluation: 'Apr 28',
  },
  {
    code: 'NUT210',
    title: 'Performance Nutrition Strategies',
    credits: 2,
    status: 'Completed',
    grade: 'A',
    focus: 'Team fueling protocols delivered',
    nextEvaluation: '—',
  },
]

const statusStyles: Record<string, string> = {
  'On track': 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40',
  Completed: 'bg-blue-500/10 text-blue-200 border-blue-400/40',
  'Lab report due': 'bg-amber-500/15 text-amber-200 border-amber-400/40',
}

function AcademicRecordSection(): ReactElement {
  return (
    <section id="academic-record" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Academic record</h2>
          <p className="text-sm text-red-200/75">
            Keep eligibility requirements aligned with your current semester planning.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          18 / 24 credits in progress
        </span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <RedSurface tone="muted" className="flex flex-col gap-6 p-6 text-red-50">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Credit load overview</p>
            <div className="flex flex-wrap items-end gap-3">
              <span className="text-4xl font-semibold">18</span>
              <span className="text-sm text-red-200/80">
                of 24 target credits confirmed for the current semester
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-2 overflow-hidden rounded-full bg-red-500/20">
              <span className="block h-full w-3/4 rounded-full bg-gradient-to-r from-red-400 via-red-300 to-rose-300" />
            </div>
            <p className="text-xs text-red-200/80">
              6 additional credits available for optional sport science electives to maintain eligibility.
            </p>
          </div>
        </RedSurface>
        <RedSurface tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Program insights</p>
          </div>
          <dl className="grid gap-3">
            {summaryInsights.map((insight) => (
              <div key={insight.label} className="flex flex-col gap-0.5">
                <dt className="text-sm text-red-200/70">{insight.label}</dt>
                <dd className="text-lg font-semibold text-red-50">{insight.value}</dd>
                <span className="text-xs text-red-200/70">{insight.context}</span>
              </div>
            ))}
          </dl>
        </RedSurface>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {academicModules.map((module) => (
            <RedSurface
              key={module.code}
              as="article"
              tone="muted"
              className="flex h-full flex-col gap-4 p-5 text-red-50"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-red-200/70">
                <span>{module.code}</span>
                <span>{module.credits} credits</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-50">{module.title}</h3>
                  <p className="text-sm text-red-100/80">{module.focus}</p>
                </div>
                <span className="rounded-lg bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-200">{module.grade}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs uppercase tracking-[0.3em]">
                <span className={`rounded-full border px-3 py-1 ${statusStyles[module.status]}`}>
                  {module.status}
                </span>
                <span className="text-red-200/80">Next evaluation · {module.nextEvaluation}</span>
              </div>
            </RedSurface>
          ))}
        </div>

        <RedSurface tone="muted" className="flex h-full flex-col gap-4 p-6 text-red-50">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Upcoming evaluations</p>
            <span className="text-xs text-red-200/60">Next 30 days</span>
          </div>
          <ul className="space-y-3">
            {upcomingEvaluations.map((evaluation) => (
              <li key={`${evaluation.module}-${evaluation.date}`} className="space-y-1">
                <p className="text-sm font-semibold text-red-50">{evaluation.module}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">{evaluation.type}</p>
                <p className="text-sm text-red-100/80">Due {evaluation.date}</p>
              </li>
            ))}
          </ul>
        </RedSurface>
      </div>
    </section>
  )
}

export default AcademicRecordSection
