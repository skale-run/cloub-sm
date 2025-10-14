import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'
import { trainingCalendarEvents } from '../calendar/calendarEvents'

const attendanceByWeek = [
  {
    label: 'Week 14',
    plannedSessions: 4,
    attendedSessions: 4,
    highlight: 'Perfect attendance',
  },
  {
    label: 'Week 15',
    plannedSessions: 5,
    attendedSessions: 4,
    highlight: 'Missed strength lift · travel delay',
  },
  {
    label: 'Week 16',
    plannedSessions: 3,
    attendedSessions: 2,
    highlight: 'Recovery block · cleared by physio',
  },
]

function TrainingAttendanceSection(): ReactElement {
  const totalPlanned = attendanceByWeek.reduce((total, week) => total + week.plannedSessions, 0)
  const totalAttended = attendanceByWeek.reduce((total, week) => total + week.attendedSessions, 0)
  const attendanceRate = Math.round((totalAttended / totalPlanned) * 100)

  const upcomingSessions = trainingCalendarEvents.slice(0, 3).map((session) => {
    const start = new Date(session.start)
    return {
      id: session.id,
      title: session.title,
      dateLabel: start.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      timeLabel: start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      }),
      coach: session.coach,
    }
  })

  return (
    <section id="training-attendance" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Training attendance</h2>
          <p className="text-sm text-red-200/75">
            Weekly overview of confirmed check-ins and any notes from the staff desk.
          </p>
        </div>
        <span className="inline-flex items-center gap-3 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span>Season rate</span>
          <span className="text-base font-semibold text-red-50">{attendanceRate}%</span>
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)]">
        <RedSurface tone="muted" className="space-y-4 p-6">
          <header className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-red-50">Attendance by week</h3>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {totalAttended} / {totalPlanned} sessions attended
            </p>
          </header>
          <div className="space-y-4">
            {attendanceByWeek.map((week) => {
              const weeklyRate = Math.round((week.attendedSessions / week.plannedSessions) * 100)
              return (
                <RedSurface
                  key={week.label}
                  as="article"
                  tone="glass"
                  className="rounded-2xl p-4 text-red-50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-red-50">{week.label}</p>
                    <span className="text-xs uppercase tracking-[0.3em] text-red-200/80">{weeklyRate}% attendance</span>
                  </div>
                  <p className="mt-2 text-sm text-red-100/80">
                    {week.attendedSessions} of {week.plannedSessions} sessions · {week.highlight}
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-red-950/45">
                    <div
                      className="h-full rounded-full bg-red-400/70"
                      style={{ width: `${weeklyRate}%` }}
                      aria-hidden
                    />
                  </div>
                </RedSurface>
              )
            })}
          </div>
        </RedSurface>

        <RedSurface as="aside" tone="muted" className="flex flex-col gap-4 p-6 text-red-50">
          <h3 className="text-lg font-semibold text-red-50">Upcoming check-ins</h3>
          <ul className="space-y-3">
            {upcomingSessions.map((session) => (
              <RedSurface key={session.id} as="li" tone="glass" className="rounded-2xl p-4">
                <p className="text-sm font-semibold text-red-50">{session.title}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {session.dateLabel} · {session.timeLabel}
                </p>
                <p className="mt-1 text-sm text-red-100/80">Coach {session.coach}</p>
              </RedSurface>
            ))}
          </ul>
        </RedSurface>
      </div>
    </section>
  )
}

export default TrainingAttendanceSection
