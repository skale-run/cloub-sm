import type { ReactElement } from 'react'
import { competitionCalendarEvents } from '../calendar/calendarEvents'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

const levelColors: Record<'Regional' | 'National' | 'International', string> = {
  Regional: 'from-amber-500/30 to-amber-400/40 text-amber-100',
  National: 'from-rose-500/30 to-rose-400/40 text-rose-100',
  International: 'from-fuchsia-500/30 to-fuchsia-400/40 text-fuchsia-100',
}

function CompetitionSection(): ReactElement {
  const events = competitionCalendarEvents.map((event) => ({
    id: event.id,
    title: event.title,
    level: event.level,
    location: event.location,
    dateLabel: dateFormatter.format(new Date(event.start)),
    checkIn: event.checkIn,
  }))

  return (
    <section id="competitions" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Competition Calendar</h2>
          <p className="text-sm text-slate-400/80">Visualise your travel blocks and prepare your race-day checklists.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100">
          Season Peak
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <article
            key={event.id}
            className="group flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-900/40 p-6 text-slate-200 shadow-[0_25px_60px_rgba(8,15,35,0.45)] transition hover:-translate-y-1 hover:border-rose-400/45 hover:from-slate-900/80"
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
              <p className="text-sm text-slate-300/90">{event.dateLabel}</p>
              <p className="text-sm text-slate-400/80">{event.location}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400/70">Logistics</span>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:border-rose-400/60 hover:bg-rose-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
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
