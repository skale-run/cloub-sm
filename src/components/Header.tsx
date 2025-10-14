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
  onOpenAuthModal: () => void
}

const focusChips = [
  { label: 'Next session', value: 'Wed · 06:30 Track 1' },
  { label: 'Season goal', value: 'Sub 49s 400m' },
  { label: 'Coach note', value: 'Refine drive phase' },
]

function Header({ isSidebarOpen, onToggleSidebar, savedProfile, onOpenAuthModal }: HeaderProps) {
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
    <header className="relative overflow-hidden rounded-t-3xl border-b border-white/5 bg-gradient-to-br from-midnight-900/95 via-midnight-900/75 to-slate-900/30 px-4 py-6 sm:px-8 sm:py-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 translate-x-16 rotate-6 bg-gradient-to-br from-sky-500/20 via-transparent to-transparent blur-3xl lg:block" />

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-start gap-4">
            <button
              type="button"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-100 shadow-[0_18px_45px_rgba(8,15,35,0.6)] transition hover:border-sky-500/60 hover:text-sky-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 lg:hidden"
              onClick={onToggleSidebar}
              aria-label={`${isSidebarOpen ? 'Close' : 'Open'} navigation`}
              aria-expanded={isSidebarOpen}
              aria-controls="app-sidebar"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300/70">Performance centre</p>
              <h1 className="text-2xl font-semibold text-white sm:text-3xl sm:leading-tight">
                Welcome back, <span className="font-display text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text">{greeting}</span> 👋
              </h1>
              <p className="max-w-xl text-sm text-slate-300/80">{profileMeta}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {focusChips.map((chip) => (
              <span
                key={chip.label}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200/90 transition hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-white"
              >
                <span className="text-xs uppercase tracking-wider text-sky-200/70 group-hover:text-sky-100">{chip.label}</span>
                <span className="font-medium">{chip.value}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200/80 shadow-[0_20px_60px_rgba(8,15,35,0.55)] backdrop-blur">
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
          >
            Access athlete portal
          </button>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-300/70">Today</p>
            <p className="mt-1 text-lg font-semibold text-white">14 April 2025</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
              Focus: Speed refinement · Hydration priority
            </p>
          </div>
          <div
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/40 px-3 py-2 text-xs font-medium uppercase tracking-wider text-slate-200/70"
            role="status"
            aria-label={`Dark mode ${mode === 'dark' ? 'enabled' : 'disabled'}`}
          >
            <ThemeIcon aria-hidden className="h-4 w-4 text-sky-300" />
            <span>{mode === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
