const navItems = [
  {
    href: '#training',
    label: 'Training Sessions',
    description: 'Plan & confirm attendance',
    icon: '📅',
  },
  {
    href: '#competitions',
    label: 'Competitions',
    description: 'Track meet logistics',
    icon: '🏟️',
  },
  {
    href: '#performance',
    label: 'Performance',
    description: 'Monitor key metrics',
    icon: '📊',
  },
  {
    href: '#profile',
    label: 'My Profile',
    description: 'Update credentials',
    icon: '🧾',
  },
  {
    href: '#access',
    label: 'Club Access',
    description: 'Facility QR pass',
    icon: '🎫',
  },
] as const

const readinessHighlights = [
  { label: 'Readiness', value: '82% · Primed' },
  { label: 'Sleep score', value: '7h 10m' },
  { label: 'Hydration', value: 'On target' },
]

type SidebarProfile = {
  fullName: string
  role: string
  squad: string
  membershipId: string
}

type SidebarProps = {
  open: boolean
  onToggleSidebar: () => void
  onNavigate?: () => void
  savedProfile: SidebarProfile | null
}

function Sidebar({ open, onToggleSidebar, onNavigate, savedProfile }: SidebarProps) {
  const handleNavigate = () => {
    if (open) {
      onNavigate?.()
    }
  }

  return (
    <aside id="app-sidebar" className={`sidebar ${open ? 'open' : ''}`} aria-label="Primary navigation">
      <button
        type="button"
        className="sidebar__close"
        onClick={onToggleSidebar}
        aria-label="Close navigation"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className="sidebar__brand">
        <span className="sidebar__logo" aria-hidden="true">
          🏃‍♂️
        </span>
        <div>
          <p className="sidebar__title">ClubPulse</p>
          <p className="sidebar__subtitle">Athlete Command Hub</p>
        </div>
      </div>

      <section className="sidebar__section" aria-label="Navigation">
        <p className="sidebar__section-title">Navigate</p>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="sidebar__nav-item" onClick={handleNavigate}>
              <span className="sidebar__nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar__nav-text">
                <span className="sidebar__nav-label">{item.label}</span>
                <span className="sidebar__nav-description">{item.description}</span>
              </span>
            </a>
          ))}
        </nav>
      </section>

      <section className="sidebar__section" aria-label="Readiness overview">
        <p className="sidebar__section-title">Today&apos;s readiness</p>
        <ul className="sidebar__metrics">
          {readinessHighlights.map((item) => (
            <li key={item.label} className="sidebar__metric">
              <span className="sidebar__metric-label">{item.label}</span>
              <span className="sidebar__metric-value">{item.value}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="sidebar__section sidebar__profile-card" aria-live="polite">
        <p className="sidebar__section-title">Member snapshot</p>
        {savedProfile ? (
          <dl className="sidebar__profile-details">
            <div>
              <dt>Member</dt>
              <dd>{savedProfile.fullName}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{savedProfile.role || 'Assign a role'}</dd>
            </div>
            <div>
              <dt>Squad</dt>
              <dd>{savedProfile.squad || 'Update squad to personalise drills'}</dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>{savedProfile.membershipId}</dd>
            </div>
          </dl>
        ) : (
          <p className="sidebar__profile-empty">
            Save your athlete profile to unlock tailored navigation insights.
          </p>
        )}
      </div>

      <div className="sidebar__footer">
        <p>Season 2025 · Wave 2 Squad</p>
        <p className="sidebar__footer-highlight">Next rest day: Sun, 20 Apr</p>
      </div>
    </aside>
  )
}

export default Sidebar
