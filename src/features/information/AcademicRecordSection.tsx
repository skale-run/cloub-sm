import type { ReactElement } from 'react'

const academicModules = [
  {
    code: 'SPRT201',
    title: 'Applied Sports Psychology',
    credits: 3,
    status: 'On track',
    nextEvaluation: 'May 12',
  },
  {
    code: 'BIO305',
    title: 'Advanced Biomechanics Lab',
    credits: 4,
    status: 'Lab report due',
    nextEvaluation: 'Apr 28',
  },
  {
    code: 'NUT210',
    title: 'Performance Nutrition Strategies',
    credits: 2,
    status: 'Completed',
    nextEvaluation: '—',
  },
]

function AcademicRecordSection(): ReactElement {
  return (
    <section id="academic-record" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Academic record</h2>
          <p className="text-sm text-slate-400/80">
            Keep eligibility requirements aligned with your current semester planning.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">
          18 / 24 credits
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {academicModules.map((module) => (
          <article
            key={module.code}
            className="flex h-full flex-col gap-3 rounded-3xl border border-white/5 bg-slate-900/60 p-5 text-slate-200 shadow-[0_22px_55px_rgba(8,15,35,0.45)]"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400/70">
              <span>{module.code}</span>
              <span>{module.credits} credits</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{module.title}</h3>
            <p className="text-sm text-slate-300/90">Status · {module.status}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-sky-200/80">
              Next evaluation · {module.nextEvaluation}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AcademicRecordSection
