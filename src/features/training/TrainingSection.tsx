import type { ReactElement } from 'react'

type TrainingSession = {
  id: string
  title: string
  coach: string
  location: string
  date: string
  time: string
}

const trainingSessions: TrainingSession[] = [
  {
    id: 'ts-1',
    title: 'Explosive Strength & Plyometrics',
    coach: 'Coach Amara Lewis',
    location: 'Arena Studio 2',
    date: 'Mon, 14 Apr',
    time: '06:30 - 08:00',
  },
  {
    id: 'ts-2',
    title: 'Technical Drills & Recovery',
    coach: 'Coach Hugo Martín',
    location: 'Track 1',
    date: 'Wed, 16 Apr',
    time: '18:00 - 20:00',
  },
  {
    id: 'ts-3',
    title: 'Video Review & Strategy Lab',
    coach: 'Analyst Team',
    location: 'HQ Briefing Room',
    date: 'Fri, 18 Apr',
    time: '11:00 - 12:30',
  },
]

function TrainingSection(): ReactElement {
  return (
    <section id="training" className="panel">
      <div className="panel__header">
        <h2>Training Session Calendar</h2>
        <span className="panel__tag">Week 16</span>
      </div>
      <div className="grid-list">
        {trainingSessions.map((session) => (
          <article key={session.id} className="session-card">
            <div className="session-card__header">
              <p className="session-card__date">{session.date}</p>
              <p className="session-card__time">{session.time}</p>
            </div>
            <h3>{session.title}</h3>
            <p className="session-card__meta">{session.location}</p>
            <p className="session-card__meta">Lead: {session.coach}</p>
            <button type="button" className="session-card__cta">
              Confirm Availability
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TrainingSection
