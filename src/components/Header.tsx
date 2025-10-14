import { Menu, Moon, Sun } from 'lucide-react'
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

function Header({ isSidebarOpen, onToggleSidebar, savedProfile, onOpenAthletePortal }: HeaderProps) {
  const { mode } = useTheme()
  const ThemeIcon = mode === 'dark' ? Moon : Sun

  const greeting = savedProfile?.fullName || 'Athlete'
  const profileDetails = savedProfile ? [savedProfile.role, savedProfile.squad].filter(Boolean) : []
  const profileMeta = savedProfile
    ? profileDetails.length > 0
      ? profileDetails.join(' · ')
      : 'Keep your profile current to unlock drills.'
    : 'Complete your profile to customise squad insights.'

  return (
    <header className="relative overflow-hidden rounded-t-3xl border-b border-red-500/30 bg-gradient-to-br from-red-950/95 via-red-900/75 to-red-800/55 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 translate-x-16 rotate-6 bg-gradient-to-br from-red-500/25 via-transparent to-transparent blur-3xl lg:block" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
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
        </div>

        <div className="flex w-full flex-col gap-4 rounded-3xl border border-red-500/30 bg-red-950/35 p-5 text-sm text-red-100/85 shadow-[0_25px_70px_rgba(127,29,29,0.35)] backdrop-blur lg:max-w-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">Today</p>
            <p className="mt-1 text-lg font-semibold text-red-50">14 April 2025</p>
            <p className="mt-2 text-sm leading-relaxed text-red-100/80">
              Focus: Speed refinement · Hydration priority
            </p>
          </div>
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
    </header>
  )
}

export default Header

