import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

type TrainingSession = {
  id: string
  title: string
  coach: string
  location: string
  date: string
  time: string
}

type CompetitionEvent = {
  id: string
  title: string
  level: 'Regional' | 'National' | 'International'
  location: string
  date: string
  checkIn: string
}

type PerformanceMetric = {
  label: string
  value: number
  target: number
  color: string
}

type Profile = {
  fullName: string
  role: string
  squad: string
  email: string
  emergencyContact: string
  membershipId: string
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

const performanceMetrics: PerformanceMetric[] = [
  { label: 'Speed Index', value: 86, target: 92, color: 'var(--color-primary)' },
  {
    label: 'Recovery Quality',
    value: 74,
    target: 85,
    color: 'var(--color-success)',
  },
  {
    label: 'Consistency Score',
    value: 81,
    target: 88,
    color: 'var(--color-warning)',
  },
]

const focusAreas = [
  {
    title: 'Weekly Mileage',
    description: 'Target 48 km · Currently at 44 km',
    trend: '+6% vs last week',
  },
  {
    title: 'Strength Sessions',
    description: 'Completed 3/4 scheduled lifts',
    trend: 'Maintain intensity, add mobility finisher',
  },
  {
    title: 'Sleep & Recovery',
    description: 'Average 7h 10m · Aim for 7h 45m',
    trend: 'Add pre-sleep routine · Reduce screen time',
  },
]

const emptyProfile: Profile = {
  fullName: '',
  role: '',
  squad: '',
  email: '',
  emergencyContact: '',
  membershipId: '',
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDraft, setProfileDraft] = useState<Profile>(emptyProfile)
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null)
  const [achievements, setAchievements] = useState<string[]>([
    'Season-best 400m: 49.20s',
    'Bronze medal · State Indoor Championships',
  ])
  const [newAchievement, setNewAchievement] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const qrCodeUrl = useMemo(() => {
    if (!savedProfile) {
      return ''
    }

    const payload = JSON.stringify({
      member: savedProfile.fullName,
      membershipId: savedProfile.membershipId,
      squad: savedProfile.squad,
    })

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
      payload,
    )}`
  }, [savedProfile])

  const toggleSidebar = () => setSidebarOpen((open) => !open)
  const handleSidebarNavigate = () => setSidebarOpen(false)

  const handleProfileChange = (key: keyof Profile, value: string) => {
    setProfileDraft((previous) => ({ ...previous, [key]: value }))
  }

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!profileDraft.fullName || !profileDraft.membershipId) {
      setStatusMessage('Please complete at least the full name and membership ID before saving.')
      return
    }

    setSavedProfile(profileDraft)
    setStatusMessage('Profile saved. QR code refreshed with the latest details.')
  }

  const handleResetProfile = () => {
    if (savedProfile) {
      setProfileDraft(savedProfile)
      setStatusMessage('Draft reverted to the last saved profile.')
    } else {
      setProfileDraft(emptyProfile)
      setStatusMessage('Profile draft cleared.')
    }
  }

  const handleDeleteProfile = () => {
    setSavedProfile(null)
    setProfileDraft(emptyProfile)
    setStatusMessage('Profile deleted. Create a new one to generate a QR code.')
  }

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return
    setAchievements((previous) => [newAchievement.trim(), ...previous])
    setNewAchievement('')
  }

  const handleRemoveAchievement = (index: number) => {
    setAchievements((previous) => previous.filter((_, idx) => idx !== index))
  }

  return (
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onNavigate={handleSidebarNavigate}
        savedProfile={savedProfile}
      />

      <div className="content">
        <Header
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          savedProfile={savedProfile}
        />

        <main className="main">
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

          <section id="performance" className="panel">
            <div className="panel__header">
              <h2>Performance Dashboard</h2>
              <span className="panel__tag">Live metrics</span>
            </div>
            <div className="performance-grid">
              <div className="performance-grid__primary">
                {performanceMetrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <div className="metric-card__header">
                      <h3>{metric.label}</h3>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="metric-card__bar" role="img" aria-label={`${metric.label} at ${metric.value}%`}>
                      <div
                        className="metric-card__progress"
                        style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                      />
                      <div className="metric-card__target" style={{ left: `${metric.target}%` }} />
                    </div>
                    <p className="metric-card__caption">Target · {metric.target}%</p>
                  </div>
                ))}
              </div>
              <aside className="performance-grid__side">
                <h3>Focus Areas</h3>
                <ul>
                  {focusAreas.map((area) => (
                    <li key={area.title}>
                      <p className="focus-area__title">{area.title}</p>
                      <p className="focus-area__description">{area.description}</p>
                      <p className="focus-area__trend">{area.trend}</p>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section id="profile" className="panel">
            <div className="panel__header">
              <h2>My Athlete Profile</h2>
              <span className="panel__tag">Manage & update</span>
            </div>

            <div className="profile">
              <form className="profile__form" onSubmit={handleSaveProfile}>
                <div className="form-grid">
                  <label>
                    Full name
                    <input
                      value={profileDraft.fullName}
                      onChange={(event) => handleProfileChange('fullName', event.target.value)}
                      placeholder="e.g. Lina Carter"
                      required
                    />
                  </label>
                  <label>
                    Role
                    <input
                      value={profileDraft.role}
                      onChange={(event) => handleProfileChange('role', event.target.value)}
                      placeholder="Sprinter / Mid-distance"
                    />
                  </label>
                  <label>
                    Squad / Tier
                    <input
                      value={profileDraft.squad}
                      onChange={(event) => handleProfileChange('squad', event.target.value)}
                      placeholder="Elite Performance Squad"
                    />
                  </label>
                  <label>
                    Email
                    <input
                      type="email"
                      value={profileDraft.email}
                      onChange={(event) => handleProfileChange('email', event.target.value)}
                      placeholder="athlete@clubpulse.io"
                    />
                  </label>
                  <label>
                    Emergency contact
                    <input
                      value={profileDraft.emergencyContact}
                      onChange={(event) => handleProfileChange('emergencyContact', event.target.value)}
                      placeholder="Jordan Carter · +44 7700 000000"
                    />
                  </label>
                  <label>
                    Membership ID
                    <input
                      value={profileDraft.membershipId}
                      onChange={(event) => handleProfileChange('membershipId', event.target.value)}
                      placeholder="CP-2025-184"
                      required
                    />
                  </label>
                </div>
                <div className="profile__actions">
                  <button type="submit">Save profile</button>
                  <button type="button" onClick={handleResetProfile} className="secondary">
                    Reset draft
                  </button>
                  <button type="button" onClick={handleDeleteProfile} className="danger">
                    Delete profile
                  </button>
                </div>
                {statusMessage && <p className="profile__status">{statusMessage}</p>}
              </form>

              <div className="profile__side">
                <div className="achievements">
                  <div className="achievements__header">
                    <h3>Highlights & achievements</h3>
                    <div className="achievements__input-group">
                      <input
                        value={newAchievement}
                        onChange={(event) => setNewAchievement(event.target.value)}
                        placeholder="Add new highlight"
                      />
                      <button type="button" onClick={handleAddAchievement}>
                        Add
                      </button>
                    </div>
                  </div>
                  <ul>
                    {achievements.map((item, index) => (
                      <li key={item}>
                        <span>{item}</span>
                        <button type="button" onClick={() => handleRemoveAchievement(index)} aria-label="Remove">
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="access" className="panel">
            <div className="panel__header">
              <h2>Club Access QR</h2>
              <span className="panel__tag">Instant pass</span>
            </div>
            <div className="access">
              <div className="access__card">
                <p>Show this code at the smart gate to enter the facility.</p>
                {savedProfile ? (
                  <div className="access__qr">
                    <img src={qrCodeUrl} alt="Club access QR code" />
                    <div className="access__details">
                      <p className="access__name">{savedProfile.fullName}</p>
                      <p className="access__id">ID · {savedProfile.membershipId}</p>
                      <p>{savedProfile.squad || 'Assign squad to personalise access'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="access__placeholder">
                    <p>Save your profile to generate a personalised QR code.</p>
                  </div>
                )}
              </div>
              <aside className="access__notes">
                <h3>Access Tips</h3>
                <ul>
                  <li>QR refreshes automatically every time you save your profile.</li>
                  <li>Keep screen brightness high for the scanners at Gate B.</li>
                  <li>Add your emergency contact for compliant access accreditation.</li>
                </ul>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
