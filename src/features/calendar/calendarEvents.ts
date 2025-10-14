export type TrainingCalendarEvent = {
  id: string
  category: 'training'
  title: string
  location: string
  start: string
  end: string
  coach: string
}

export type CompetitionCalendarEvent = {
  id: string
  category: 'competition'
  title: string
  location: string
  start: string
  end: string
  level: 'Regional' | 'National' | 'International'
  checkIn: string
}

export type CalendarEvent = TrainingCalendarEvent | CompetitionCalendarEvent

export const calendarEvents: CalendarEvent[] = [
  {
    id: 'ts-1',
    category: 'training',
    title: 'Explosive Strength & Plyometrics',
    location: 'Arena Studio 2',
    start: '2025-04-14T06:30:00',
    end: '2025-04-14T08:00:00',
    coach: 'Coach Amara Lewis',
  },
  {
    id: 'ts-2',
    category: 'training',
    title: 'Technical Drills & Recovery',
    location: 'Track 1',
    start: '2025-04-16T18:00:00',
    end: '2025-04-16T20:00:00',
    coach: 'Coach Hugo Martín',
  },
  {
    id: 'ts-3',
    category: 'training',
    title: 'Video Review & Strategy Lab',
    location: 'HQ Briefing Room',
    start: '2025-04-18T11:00:00',
    end: '2025-04-18T12:30:00',
    coach: 'Analyst Team',
  },
  {
    id: 'cc-1',
    category: 'competition',
    title: 'Metropolitan Invitational',
    location: 'New Crest Stadium',
    start: '2025-04-26T08:00:00',
    end: '2025-04-26T18:00:00',
    level: 'Regional',
    checkIn: '08:00',
  },
  {
    id: 'cc-2',
    category: 'competition',
    title: 'Summer National Trials',
    location: 'Capital City Arena',
    start: '2025-05-10T06:30:00',
    end: '2025-05-10T17:00:00',
    level: 'National',
    checkIn: '06:30',
  },
  {
    id: 'cc-3',
    category: 'competition',
    title: 'Continental Grand Prix',
    location: 'Lisbon Athletics Park',
    start: '2025-05-23T07:15:00',
    end: '2025-05-23T20:00:00',
    level: 'International',
    checkIn: '07:15',
  },
]

export const trainingCalendarEvents = calendarEvents.filter(
  (event): event is TrainingCalendarEvent => event.category === 'training',
)

export const competitionCalendarEvents = calendarEvents.filter(
  (event): event is CompetitionCalendarEvent => event.category === 'competition',
)
