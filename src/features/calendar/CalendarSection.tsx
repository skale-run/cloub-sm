import type { ReactElement } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { calendarEvents, type CalendarEvent } from './calendarEvents'

type CalendarView = 'month' | 'week' | 'day'

type DayOption = {
  key: string
  date: Date
  label: string
  shortLabel: string
}

type WeekBucket = {
  id: string
  label: string
  range: string
  days: {
    key: string
    date: Date
    label: string
    events: CalendarEvent[]
  }[]
}

type MonthBucket = {
  id: string
  label: string
  events: CalendarEvent[]
}

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
})

const dayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  day: 'numeric',
})

const longDayFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

const rangeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
})

const typeStyles: Record<CalendarEvent['category'], string> = {
  training: 'border-rose-400/40 bg-rose-500/15 text-rose-100',
  competition: 'border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-100',
}

function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0] ?? ''
}

function startOfWeek(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const diff = day === 0 ? -6 : 1 - day
  result.setDate(result.getDate() + diff)
  result.setHours(0, 0, 0, 0)
  return result
}

function endOfWeek(date: Date): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + 6)
  return result
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function CalendarSection(): ReactElement {
  const sortedEvents = useMemo(
    () =>
      [...calendarEvents].sort(
        (first, second) => new Date(first.start).getTime() - new Date(second.start).getTime(),
      ),
    [],
  )

  const months = useMemo(() => {
    const monthBuckets = new Map<string, MonthBucket>()

    sortedEvents.forEach((event) => {
      const startDate = new Date(event.start)
      const monthKey = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`
      const bucket = monthBuckets.get(monthKey)

      if (bucket) {
        bucket.events.push(event)
      } else {
        monthBuckets.set(monthKey, {
          id: monthKey,
          label: monthFormatter.format(startDate),
          events: [event],
        })
      }
    })

    return Array.from(monthBuckets.values())
  }, [sortedEvents])

  const weeks = useMemo(() => {
    const weekBuckets = new Map<string, WeekBucket>()

    sortedEvents.forEach((event) => {
      const startDate = new Date(event.start)
      const weekStart = startOfWeek(startDate)
      const weekKey = getDateKey(weekStart)

      if (!weekBuckets.has(weekKey)) {
        const weekEnd = endOfWeek(new Date(weekStart))

        weekBuckets.set(weekKey, {
          id: weekKey,
          label: `Week of ${rangeFormatter.format(weekStart)}`,
          range: `${rangeFormatter.format(weekStart)} – ${rangeFormatter.format(weekEnd)}`,
          days: Array.from({ length: 7 }).map((_, index) => {
            const dayDate = new Date(weekStart)
            dayDate.setDate(weekStart.getDate() + index)
            dayDate.setHours(0, 0, 0, 0)

            return {
              key: getDateKey(dayDate),
              date: dayDate,
              label: dayFormatter.format(dayDate),
              events: [],
            }
          }),
        })
      }

      const bucket = weekBuckets.get(weekKey)

      if (!bucket) return

      const matchingDay = bucket.days.find((day) => day.key === getDateKey(startDate))

      if (matchingDay) {
        matchingDay.events.push(event)
      }
    })

    return Array.from(weekBuckets.values()).map((bucket) => ({
      ...bucket,
      days: bucket.days.map((day) => ({
        ...day,
        events: day.events.sort(
          (first, second) => new Date(first.start).getTime() - new Date(second.start).getTime(),
        ),
      })),
    }))
  }, [sortedEvents])

  const dayOptions = useMemo(() => {
    const seen = new Map<string, DayOption>()

    sortedEvents.forEach((event) => {
      const startDate = new Date(event.start)
      const key = getDateKey(startDate)

      if (!seen.has(key)) {
        seen.set(key, {
          key,
          date: startDate,
          label: longDayFormatter.format(startDate),
          shortLabel: dayFormatter.format(startDate),
        })
      }
    })

    return Array.from(seen.values()).sort((first, second) => first.date.getTime() - second.date.getTime())
  }, [sortedEvents])

  const [view, setView] = useState<CalendarView>('month')
  const [selectedDayKey, setSelectedDayKey] = useState<string>(dayOptions[0]?.key ?? '')

  useEffect(() => {
    if (dayOptions.length === 0) {
      setSelectedDayKey('')
      return
    }

    const hasSelectedDay = dayOptions.some((option) => option.key === selectedDayKey)

    if (!hasSelectedDay) {
      setSelectedDayKey(dayOptions[0].key)
    }
  }, [dayOptions, selectedDayKey])

  const selectedDay = dayOptions.find((option) => option.key === selectedDayKey)
  const eventsOnSelectedDay = selectedDay
    ? sortedEvents.filter((event) => isSameDay(new Date(event.start), selectedDay.date))
    : []

  return (
    <section id="calendar" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Integrated Team Calendar</h2>
          <p className="text-sm text-slate-400/80">
            Switch between monthly, weekly, and daily perspectives to coordinate every training session and
            competition.
          </p>
        </div>
        <div className="inline-flex rounded-full border border-white/10 bg-slate-900/80 p-1 text-xs font-semibold text-slate-300">
          {(['month', 'week', 'day'] satisfies CalendarView[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setView(option)}
              className={`rounded-full px-4 py-1.5 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 ${
                view === option
                  ? 'bg-rose-500/20 text-white shadow-[0_8px_20px_rgba(244,63,94,0.25)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {view === 'month' ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {months.map((month) => (
            <article
              key={month.id}
              className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_25px_70px_rgba(8,15,35,0.45)]"
            >
              <header className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{month.label}</h3>
                <span className="text-xs uppercase tracking-[0.35em] text-slate-400/70">{month.events.length} events</span>
              </header>
              <div className="space-y-4">
                {month.events.map((event) => {
                  const startDate = new Date(event.start)
                  const endDate = new Date(event.end)

                  return (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-white/5 bg-slate-950/60 p-4 transition hover:border-rose-400/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400/80">
                        <span className="font-semibold text-slate-200">{dayFormatter.format(startDate)}</span>
                        <span>
                          {timeFormatter.format(startDate)} – {timeFormatter.format(endDate)}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-white">{event.title}</p>
                          <p className="text-sm text-slate-400/80">{event.location}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[event.category]}`}>
                          {event.category === 'training' ? 'Training Session' : 'Competition Day'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {view === 'week' ? (
        <div className="space-y-5">
          {weeks.map((week) => (
            <article
              key={week.id}
              className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_25px_70px_rgba(8,15,35,0.45)]"
            >
              <header className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{week.label}</h3>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400/70">{week.range}</p>
                </div>
                <span className="text-xs text-slate-400/80">
                  {week.days.reduce((total, day) => total + day.events.length, 0)} scheduled events
                </span>
              </header>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
                {week.days.map((day) => (
                  <div
                    key={day.key}
                    className={`flex flex-col gap-3 rounded-2xl border p-4 transition ${
                      day.events.length > 0
                        ? 'border-rose-400/30 bg-slate-950/60'
                        : 'border-white/5 bg-slate-950/40 text-slate-500'
                    }`}
                  >
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-400/80">{day.label}</div>
                    <div className="space-y-3">
                      {day.events.length > 0 ? (
                        day.events.map((event) => {
                          const startDate = new Date(event.start)
                          const endDate = new Date(event.end)

                          return (
                            <div key={event.id} className="rounded-xl border border-white/5 bg-slate-900/60 p-3">
                              <p className="text-sm font-semibold text-white">{event.title}</p>
                              <p className="text-xs text-slate-400/80">
                                {timeFormatter.format(startDate)} – {timeFormatter.format(endDate)}
                              </p>
                              <p className="mt-1 text-xs text-slate-400/70">{event.location}</p>
                              <span className={`mt-2 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.25em] ${typeStyles[event.category]}`}>
                                {event.category === 'training' ? 'Training' : 'Competition'}
                              </span>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-xs text-slate-500">No events scheduled</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {view === 'day' ? (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {dayOptions.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setSelectedDayKey(option.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 ${
                  selectedDayKey === option.key
                    ? 'border-rose-400/50 bg-rose-500/20 text-white shadow-[0_12px_30px_rgba(244,63,94,0.2)]'
                    : 'border-white/10 bg-slate-900/60 text-slate-300 hover:text-white'
                }`}
              >
                {option.shortLabel}
              </button>
            ))}
          </div>

          <article className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200 shadow-[0_25px_70px_rgba(8,15,35,0.45)]">
            <header className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{selectedDay?.label ?? 'No day selected'}</h3>
                <p className="text-sm text-slate-400/80">All training sessions and competition duties for this date.</p>
              </div>
              <span className="text-xs uppercase tracking-[0.35em] text-slate-400/70">
                {eventsOnSelectedDay.length} {eventsOnSelectedDay.length === 1 ? 'event' : 'events'}
              </span>
            </header>

            <div className="mt-6 space-y-4">
              {eventsOnSelectedDay.length > 0 ? (
                eventsOnSelectedDay.map((event) => {
                  const startDate = new Date(event.start)
                  const endDate = new Date(event.end)

                  return (
                    <div
                      key={event.id}
                      className="rounded-2xl border border-white/5 bg-slate-950/60 p-5 transition hover:border-rose-400/40"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-400/80">
                        <span>
                          {timeFormatter.format(startDate)} – {timeFormatter.format(endDate)}
                        </span>
                        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${typeStyles[event.category]}`}>
                          {event.category === 'training' ? 'Training Session' : 'Competition Day'}
                        </span>
                      </div>
                      <div className="mt-3 space-y-1">
                        <p className="text-base font-semibold text-white">{event.title}</p>
                        <p className="text-sm text-slate-400/80">{event.location}</p>
                        {event.category === 'training' ? (
                          <p className="text-xs text-slate-400/70">Lead · {event.coach}</p>
                        ) : (
                          <p className="text-xs text-slate-400/70">Check-in {event.checkIn}</p>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-slate-500">No scheduled activity on this date.</p>
              )}
            </div>
          </article>
        </div>
      ) : null}
    </section>
  )
}

export default CalendarSection
