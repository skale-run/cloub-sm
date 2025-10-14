import { useState } from 'react'
import {
  Activity,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Flag,
  GaugeCircle,
  Menu,
  Moon,
  Sun,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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
  onOpenAthletePortal: () => void
}

const focusChips = [
  { label: 'Next session', value: 'Wed · 06:30 Track 1' },
  { label: 'Season goal', value: 'Sub 49s 400m' },
  { label: 'Coach note', value: 'Refine drive phase' },
]

type PerformanceHighlight = {
  label: string
  value: string
  helper: string
  icon: LucideIcon
}

const performanceHighlights: PerformanceHighlight[] = [
  {
    label: 'Readiness score',
    value: '82 / 100',
    helper: '+5 vs 7-day average',
    icon: GaugeCircle,
  },
  {
    label: 'Acute training load',
    value: '1.23 ATL',
    helper: 'Sits within performance band',
    icon: Activity,
  },
  {
    label: 'Season ranking',
    value: '3rd nationally',
    helper: 'Finals target locked in',
    icon: Flag,
  },
]

const milestone = {
  title: 'Continental trials heat',
  subtitle: 'Berlin Olympic Stadium',
  countdown: '12 days out',
}

const coachInsights = [
  'Keep 40m acceleration splits under 4.90s',
  'Activate hip-mobility circuit before track session',
  'Log hydration touchpoints before evening recovery',
]

function Header({ isSidebarOpen, onToggleSidebar, savedProfile, onOpenAthletePortal }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const { mode } = useTheme()
  const ThemeIcon = mode === 'dark' ? Moon : Sun
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  const greeting = savedProfile?.fullName || 'Athlete'
  const profileDetails = savedProfile ? [savedProfile.role, savedProfile.squad].filter(Boolean) : []
  const profileMeta = savedProfile
    ? profileDetails.length > 0
      ? profileDetails.join(' · ')
      : 'Keep your profile current to unlock drills.'
    : 'Complete your profile to customise squad insights.'
  const summaryHighlight = performanceHighlights[0]
  const detailPanelId = 'header-detail-panel'
  const detailToggleLabel = `${isExpanded ? 'Show less' : 'Show more'} detail`
  const DetailIcon = isExpanded ? ChevronUp : ChevronDown

  return (
    <header className="relative overflow-hidden rounded-t-3xl border-b border-red-500/30 bg-gradient-to-br from-red-950/95 via-red-900/75 to-red-800/55 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 translate-x-16 rotate-6 bg-gradient-to-br from-red-500/25 via-transparent to-transparent blur-3xl lg:block" />

      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsExpanded((previous) => !previous)}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-red-100/80 transition hover:border-red-300/70 hover:bg-red-900/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            aria-pressed={isExpanded}
            aria-expanded={isExpanded}
            aria-controls={detailPanelId}
          >
            <DetailIcon aria-hidden className="h-4 w-4" />
            {detailToggleLabel}
          </button>
        </div>

        <div
          id={detailPanelId}
          className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"
          aria-live="polite"
        >
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-start gap-4">
              <button
                type="button"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/40 text-red-100 shadow-[0_22px_60px_rgba(127,29,29,0.4)] transition hover:border-red-300/70 hover:bg-red-900/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:hidden"
              onClick={onToggleSidebar}
              aria-label={`${isSidebarOpen ? 'Close' : 'Open'} navigation`}
              aria-expanded={isSidebarOpen}
              aria-controls="app-sidebar"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-red-200/70">Performance centre</p>
              <h1 className="text-2xl font-semibold text-red-50 sm:text-3xl sm:leading-tight">
                Welcome back,{' '}
                <span className="font-display text-transparent bg-gradient-to-r from-red-100 via-red-200 to-red-400 bg-clip-text">
                  {greeting}
                </span>{' '}
                👋
              </h1>
              <p className="max-w-xl text-sm text-red-100/75">{profileMeta}</p>
            </div>
          </div>

          {isExpanded ? (
            <>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {focusChips.map((chip) => (
                  <div
                    key={chip.label}
                    className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-red-500/30 bg-red-950/35 px-4 py-3 text-sm text-red-50/90 transition hover:border-red-400/50 hover:bg-red-900/50 hover:text-red-50"
                  >
                    <span className="text-xs uppercase tracking-wider text-red-200/70 group-hover:text-red-100">{chip.label}</span>
                    <span className="font-medium text-right text-red-100">{chip.value}</span>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {performanceHighlights.map(({ icon: Icon, label, value, helper }) => (
                  <div
                    key={label}
                    className="group relative overflow-hidden rounded-2xl border border-red-500/25 bg-red-950/35 p-4 text-red-100 transition hover:border-red-400/50 hover:bg-red-900/45"
                  >
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-red-500/15 blur-3xl transition-opacity group-hover:opacity-70"
                      aria-hidden
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-red-200/70">{label}</p>
                        <p className="mt-2 text-xl font-semibold text-red-50">{value}</p>
                        <p className="mt-2 text-xs text-red-100/70">{helper}</p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-900/55 text-red-100 shadow-inner shadow-red-900/50">
                        <Icon aria-hidden className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-red-500/25 bg-red-950/40 px-4 py-4 text-red-100/80">
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Quick snapshot</p>
              <p className="mt-2 text-sm font-medium text-red-50">
                {summaryHighlight.value} readiness · {milestone.countdown}
              </p>
              <p className="mt-1 text-xs text-red-100/70">
                Focus today: Speed refinement &middot; Hydration priority
              </p>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-4 rounded-3xl border border-red-500/30 bg-red-950/35 p-5 text-sm text-red-100/85 shadow-[0_25px_70px_rgba(127,29,29,0.35)] backdrop-blur lg:max-w-sm">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">Today</p>
            <p className="text-lg font-semibold text-red-50">{formattedDate}</p>
            <p className="text-sm leading-relaxed text-red-100/80">Focus: Speed refinement · Hydration priority</p>
          </div>

          {isExpanded ? (
            <>
              <div className="relative overflow-hidden rounded-2xl border border-red-500/25 bg-gradient-to-br from-red-900/60 via-red-950/60 to-red-950/30 p-4">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.18),transparent_55%)]" aria-hidden />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Readiness</p>
                    <p className="mt-2 text-sm font-medium text-red-50">Ready to push</p>
                    <p className="mt-2 text-xs text-red-100/70">HRV trending upward · Sleep depth stable</p>
                  </div>
                  <div className="relative" aria-hidden>
                    <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-red-900/60 ring-2 ring-red-500/40">
                      <span className="text-xl font-semibold text-red-50">82</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-red-500/25 bg-red-950/45 p-4 text-sm text-red-100/80">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-900/55 text-red-100">
                  <CalendarDays aria-hidden className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-red-200/70">Next milestone</p>
                  <p className="mt-1 text-base font-semibold text-red-50">{milestone.title}</p>
                  <p className="mt-1 text-xs text-red-100/70">
                    {milestone.subtitle} · {milestone.countdown}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-red-500/20 bg-red-950/45 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Coach insights</p>
                <ul className="mt-3 space-y-2 text-sm text-red-100/80">
                  {coachInsights.map((insight) => (
                    <li key={insight} className="flex items-start gap-3">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-300" aria-hidden />
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 rounded-2xl border border-red-500/25 bg-red-950/45 p-4 text-sm text-red-100/80">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-900/55 text-red-100">
                <CalendarDays aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-widest text-red-200/70">Next milestone</p>
                <p className="mt-1 text-base font-semibold text-red-50">{milestone.countdown}</p>
                <p className="mt-1 text-xs text-red-100/70">{milestone.title}</p>
              </div>
            </div>
          )}

          <div
            className="flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-950/45 px-3 py-2 text-xs font-medium uppercase tracking-wider text-red-100/80"
            role="status"
            aria-label={`Dark mode ${mode === 'dark' ? 'enabled' : 'disabled'}`}
          >
            <ThemeIcon aria-hidden className="h-4 w-4 text-red-300" />
            <span>{mode === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          </div>

          <button
            type="button"
            onClick={onOpenAthletePortal}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-500 via-red-400 to-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_18px_50px_rgba(220,38,38,0.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
          >
            Access athlete portal
          </button>
        </div>
        </div>
      </div>
      </header>
  )
}

export default Header

