import { useTheme } from '../theme.js'

type HeaderProfile = {
  fullName: string
  role: string
  squad: string
}

type HeaderProps = {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  savedProfile: HeaderProfile | null
}

const focusChips = [
  { label: 'Next session', value: 'Wed · 06:30 Track 1' },
  { label: 'Season goal', value: 'Sub 49s 400m' },
  { label: 'Coach note', value: 'Refine drive phase' },
]

function Header({ isSidebarOpen, onToggleSidebar, savedProfile }: HeaderProps) {
  const { mode } = useTheme()

  const greeting = savedProfile?.fullName || 'Athlete'
  const profileDetails = savedProfile ? [savedProfile.role, savedProfile.squad].filter(Boolean) : []
  const profileMeta = savedProfile
    ? profileDetails.length > 0
      ? profileDetails.join(' · ')
      : 'Keep your profile current to unlock drills.'
    : 'Complete your profile to customise squad insights.'

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar__menu"
        onClick={onToggleSidebar}
        aria-label="Toggle navigation"
        aria-expanded={isSidebarOpen}
        aria-controls="app-sidebar"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="topbar__overview">
        <div className="topbar__intro">
          <p className="topbar__eyebrow">Performance centre</p>
          <h1>Welcome back, {greeting} 👋</h1>
          <p>{profileMeta}</p>
        </div>
        <div className="topbar__overview-right">
          <div className="topbar__chips" aria-label="Coaching reminders">
            {focusChips.map((chip) => (
              <span key={chip.label} className="topbar__chip">
                <span className="topbar__chip-label">{chip.label}</span>
                <span className="topbar__chip-value">{chip.value}</span>
              </span>
            ))}
          </div>
          <div className="topbar__insight">
            <div className="topbar__today">
              <p className="topbar__date">14 April 2025</p>
              <p className="topbar__status">Focus: Speed refinement · Hydration priority</p>
            </div>
            <div
              className="topbar__theme topbar__theme--static"
              role="status"
              aria-label={`Dark mode ${mode === 'dark' ? 'enabled' : 'disabled'}`}
            >
              <span aria-hidden="true">{mode === 'dark' ? '🌙' : '☀️'}</span>
              <span className="topbar__theme-label">{mode === 'dark' ? 'Dark mode' : 'Light mode'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
