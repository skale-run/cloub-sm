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

function CompetitionSection(): ReactElement {
  return (
    <section id="competitions" className="panel">
      <div className="panel__header">
        <h2>Competition Calendar</h2>
        <span className="panel__tag panel__tag--accent">Season Peak</span>
      </div>
      <div className="grid-list grid-list--compact">
        {competitionCalendar.map((event) => (
          <article key={event.id} className="competition-card">
            <header>
              <p className="competition-card__level">{event.level}</p>
              <h3>{event.title}</h3>
            </header>
            <div className="competition-card__details">
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
            <footer>
              <span className="competition-card__checkin">Check-in {event.checkIn}</span>
              <button type="button" className="competition-card__cta">
                Travel Briefing
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CompetitionSection
