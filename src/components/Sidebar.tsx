import {
  Activity,
  Award,
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  GaugeCircle,
  GraduationCap,
  LineChart,
  Scale,
  Users,
  X,
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  description: string
  Icon: typeof Activity
}

type NavSection = {
  heading: string
  items: ReadonlyArray<NavItem>
}

const navSections: ReadonlyArray<NavSection> = [
  {
    heading: 'Calendar',
    items: [
      {
        href: '#calendar',
        label: 'Season calendar',
        description: 'Review meets and key sessions',
        Icon: CalendarDays,
      },
    ],
  },
  {
    heading: 'Information',
    items: [
      {
        href: '#academic-record',
        label: 'Academic record',
        description: 'Monitor course eligibility',
        Icon: GraduationCap,
      },
      {
        href: '#billing',
        label: 'Billing overview',
        description: 'Track invoices & payments',
        Icon: CreditCard,
      },
      {
        href: '#training-attendance',
        label: 'Training attendance',
        description: 'See check-ins by week',
        Icon: ClipboardCheck,
      },
    ],
  },
  {
    heading: 'Evaluations',
    items: [
      {
        href: '#coach-evaluation',
        label: 'Coach evaluation',
        description: 'Latest staff feedback',
        Icon: Users,
      },
      {
        href: '#progress-overview',
        label: 'Progress insight',
        description: 'Growth trends & alerts',
        Icon: LineChart,
      },
    ],
  },
  {
    heading: 'Performance tracking',
    items: [
      {
        href: '#technical-progress',
        label: 'Technical progress',
        description: 'Skill milestones by phase',
        Icon: GaugeCircle,
      },
      {
        href: '#attendance-total',
        label: 'Total attendance',
        description: 'Season presence summary',
        Icon: ClipboardCheck,
      },
      {
        href: '#training-statistics',
        label: 'Training statistics',
        description: 'Hours, sessions & load',
        Icon: BarChart3,
      },
      {
        href: '#competition-results',
        label: 'Competition results',
        description: 'Recent podium finishes',
        Icon: Award,
      },
      {
        href: '#weight-tracking',
        label: 'Body weight log',
        description: 'Monitor weight stability',
        Icon: Scale,
      },
    ],
  },
]

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
    <aside
      id="app-sidebar"
      className={`relative z-40 w-full max-w-sm shrink-0 rounded-3xl border border-white/5 bg-slate-950/80 shadow-[0_30px_80px_rgba(8,15,35,0.6)] backdrop-blur transition-transform duration-300 ease-out lg:static lg:translate-x-0 lg:max-w-xs ${
        open ? 'translate-x-0' : '-translate-x-[120%] lg:-translate-x-0'
      }`}
      aria-label="Primary navigation"
    >
      <div className="flex h-full flex-col gap-8 p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/30 via-sky-500/10 to-transparent text-sky-200">
              <Activity className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Club Section Manager</p>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400/70">Athlete Command Hub</p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 text-slate-300 transition hover:border-sky-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <section className="space-y-5" aria-label="Navigation">
          {navSections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400/70">
                {section.heading}
              </p>
              <nav className="grid gap-2">
                {section.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavigate}
                    className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-400/40 hover:bg-slate-900/60 hover:text-white"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900/70 text-sky-200 group-hover:bg-sky-500/15">
                      <item.Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-xs text-slate-400/80">{item.description}</span>
                    </span>
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </section>

        <section className="space-y-4" aria-label="Readiness overview">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400/70">Today&apos;s readiness</p>
          <ul className="grid gap-3">
            {readinessHighlights.map((item) => (
              <li
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200"
              >
                <span className="text-xs uppercase tracking-wide text-slate-400/80">{item.label}</span>
                <span className="font-semibold text-white">{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-5" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400/70">Member snapshot</p>
          {savedProfile ? (
            <dl className="grid gap-3 text-sm text-slate-200">
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-wide text-slate-400/80">Member</dt>
                <dd className="font-semibold text-white">{savedProfile.fullName}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-wide text-slate-400/80">Role</dt>
                <dd>{savedProfile.role || 'Assign a role'}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-wide text-slate-400/80">Squad</dt>
                <dd>{savedProfile.squad || 'Update squad to personalise drills'}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-wide text-slate-400/80">ID</dt>
                <dd className="font-medium tracking-wide text-sky-200">{savedProfile.membershipId}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm leading-relaxed text-slate-300/80">
              Save your athlete profile to unlock tailored navigation insights.
            </p>
          )}
        </section>

        <div className="mt-auto space-y-1 text-xs text-slate-400/80">
          <p>Season 2025 · Wave 2 Squad</p>
          <p className="font-semibold text-sky-200">Next rest day: Sun, 20 Apr</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
