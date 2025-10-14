import type { ReactElement } from 'react'
import { trainingCalendarEvents } from '../calendar/calendarEvents'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

function TrainingSection(): ReactElement {
  const sessions = trainingCalendarEvents.map((session) => {
    const start = new Date(session.start)
    const end = new Date(session.end)

    return {
      id: session.id,
      title: session.title,
      coach: session.coach,
      location: session.location,
      dateLabel: dateFormatter.format(start),
      timeLabel: `${timeFormatter.format(start)} – ${timeFormatter.format(end)}`,
    }
  })

  return (
    <section id="training" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Training Session Calendar</h2>
          <p className="text-sm text-slate-400/80">Stay aligned with the squad and confirm your availability early.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-100">
          Week 16
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sessions.map((session) => (
          <article
            key={session.id}
            className="group relative flex h-full flex-col justify-between rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_20px_50px_rgba(8,15,35,0.45)] transition hover:-translate-y-1 hover:border-sky-400/40 hover:bg-slate-900/70"
          >
            <div className="flex items-start justify-between text-xs uppercase tracking-wide text-slate-400/70">
              <span>{session.dateLabel}</span>
              <span>{session.timeLabel}</span>
            </div>
            <div className="mt-4 space-y-3">
              <h3 className="text-lg font-semibold text-white">{session.title}</h3>
              <p className="text-sm text-slate-300/90">{session.location}</p>
              <p className="text-sm text-slate-400/80">Lead · {session.coach}</p>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center rounded-2xl border border-sky-400/40 bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-400/60 hover:bg-sky-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Confirm availability
            </button>
            <div
              className="pointer-events-none absolute inset-x-6 bottom-6 -z-10 h-24 rounded-[40px] bg-sky-500/10 opacity-70 blur-3xl transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrainingSection
