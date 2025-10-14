import type { ReactElement } from 'react'

type CompetitionEvent = {
  id: string
  title: string
  level: 'Regional' | 'National' | 'International'
  location: string
  date: string
  checkIn: string
}

const competitionCalendar: CompetitionEvent[] = [
  {
    id: 'cc-1',
    title: 'Metropolitan Invitational',
    level: 'Regional',
    location: 'New Crest Stadium',
    date: 'Sat, 26 Apr',
    checkIn: '08:00',
  },
  {
    id: 'cc-2',
    title: 'Summer National Trials',
    level: 'National',
    location: 'Capital City Arena',
    date: 'Sat, 10 May',
    checkIn: '06:30',
  },
  {
    id: 'cc-3',
    title: 'Continental Grand Prix',
    level: 'International',
    location: 'Lisbon Athletics Park',
    date: 'Fri, 23 May',
    checkIn: '07:15',
  },
]

const levelColors: Record<CompetitionEvent['level'], string> = {
  Regional: 'from-emerald-500/30 to-emerald-400/40 text-emerald-100',
  National: 'from-sky-500/30 to-sky-400/40 text-sky-100',
  International: 'from-fuchsia-500/30 to-fuchsia-400/40 text-fuchsia-100',
}

function CompetitionSection(): ReactElement {
  return (
    <section id="competitions" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Competition Calendar</h2>
          <p className="text-sm text-slate-400/80">Visualise your travel blocks and prepare your race-day checklists.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-100">
          Season Peak
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {competitionCalendar.map((event) => (
          <article
            key={event.id}
            className="group flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/40 p-6 text-slate-200 shadow-[0_25px_60px_rgba(8,15,35,0.45)] transition hover:-translate-y-1 hover:border-fuchsia-400/40 hover:from-slate-900/80"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center rounded-full bg-gradient-to-r px-3 py-1 text-xs font-semibold uppercase tracking-wide ${levelColors[event.level]}`}
              >
                {event.level}
              </span>
              <span className="text-xs uppercase tracking-wide text-slate-400/70">Check-in {event.checkIn}</span>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-white">{event.title}</h3>
              <p className="text-sm text-slate-300/90">{event.date}</p>
              <p className="text-sm text-slate-400/80">{event.location}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400/70">Logistics</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:border-fuchsia-400/60 hover:bg-fuchsia-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fuchsia-300"
              >
                Travel briefing
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CompetitionSection
