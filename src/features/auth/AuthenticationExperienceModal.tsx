import { useEffect, useMemo, useRef, useState } from 'react'
import { Activity, Award, BarChart3, Users, X } from '../../lucide-react'
import { useAthletePortalModal } from './AthletePortalModalContext'

const highlights = [
  {
    title: 'Elite training blueprints',
    description: 'Unlock coach-curated weekly blocks personalised to your season arc.',
    icon: Activity,
  },
  {
    title: 'Performance intelligence',
    description: 'Track velocity, recovery, and readiness trends with adaptive insights.',
    icon: BarChart3,
  },
  {
    title: 'Community recognition',
    description: 'Share milestones, capture badges, and climb the squad leaderboard.',
    icon: Award,
  },
  {
    title: 'All-access support crew',
    description: 'Coordinate with physio, nutrition, and mentors from a single hub.',
    icon: Users,
  },
]

type AuthMode = 'login' | 'register'

const authCopy: Record<AuthMode, { heading: string; cta: string; description: string }> = {
  login: {
    heading: 'Log in to your athlete HQ',
    description: 'Jump back into your performance cockpit and sync with today’s focus.',
    cta: 'Sign in',
  },
  register: {
    heading: 'Activate your athlete passport',
    description: 'Create your credentials to unlock tailored sessions and squad support.',
    cta: 'Create account',
  },
}

function AuthenticationExperienceModal() {
  const { isOpen, close } = useAthletePortalModal()
  const [mode, setMode] = useState<AuthMode>('login')
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
      }
    }

    const { style } = document.body
    const originalOverflow = style.overflow
    style.overflow = 'hidden'

    window.addEventListener('keydown', handleKeyDown)

    const timer = window.setTimeout(() => {
      closeButtonRef.current?.focus({ preventScroll: true })
    }, 0)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
      style.overflow = originalOverflow
      previouslyFocusedElementRef.current?.focus({ preventScroll: true })
    }
  }, [close, isOpen])

  useEffect(() => {
    if (!isOpen) {
      setMode('login')
    }
  }, [isOpen])

  const { heading, description, cta } = useMemo(() => authCopy[mode], [mode])

  if (!isOpen) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="athlete-auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-rose-950/90 p-6 backdrop-blur-lg"
    >
      <div className="relative flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-rose-400/30 bg-gradient-to-br from-rose-950/95 via-rose-950/80 to-rose-900/70 shadow-[0_55px_160px_rgba(136,19,55,0.55)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,63,94,0.18),transparent_55%)]" aria-hidden />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={close}
          className="absolute right-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-rose-400/40 bg-rose-950/40 text-rose-100 transition hover:border-rose-300/60 hover:bg-rose-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
          aria-label="Close authentication modal"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="grid flex-1 grid-cols-1 gap-8 overflow-y-auto p-10 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex flex-col justify-between gap-10">
            <div className="space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-rose-200/80">
                Athlete portal
              </p>
              <h2 id="athlete-auth-modal-title" className="text-3xl font-semibold text-white sm:text-4xl">
                {heading}
              </h2>
              <p className="max-w-xl text-base text-rose-100/80">{description}</p>
            </div>

            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-rose-400/35 bg-rose-950/35 p-1 text-sm text-rose-100/85">
                {(
                  [
                    { label: 'Log in', value: 'login' },
                    { label: 'Register', value: 'register' },
                  ] as const
                ).map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMode(option.value)}
                    className={`flex-1 rounded-full px-6 py-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                      mode === option.value
                        ? 'bg-rose-500 text-rose-50 shadow-[0_18px_45px_rgba(244,63,94,0.45)]'
                        : 'text-rose-200/75 hover:text-rose-100'
                    }`}
                    aria-pressed={mode === option.value}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {mode === 'login' ? (
                <form className="space-y-4" aria-label="Log in form">
                  <label className="block text-sm font-medium text-rose-100">
                    Email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-2 w-full rounded-2xl border border-rose-400/30 bg-rose-950/35 px-4 py-3 text-base text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="you@club.com"
                      required
                    />
                  </label>
                  <label className="block text-sm font-medium text-rose-100">
                    Password
                    <input
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      className="mt-2 w-full rounded-2xl border border-rose-400/30 bg-rose-950/35 px-4 py-3 text-base text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="••••••••"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-rose-400 via-rose-500 to-amber-300 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_65px_rgba(244,63,94,0.45)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
                  >
                    {cta}
                  </button>
                  <p className="text-center text-xs text-rose-200/75">Forgot password? Contact your coach to reset access.</p>
                </form>
              ) : (
                <form className="space-y-4" aria-label="Register form">
                  <label className="block text-sm font-medium text-rose-100">
                    Full name
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      className="mt-2 w-full rounded-2xl border border-rose-400/30 bg-rose-950/35 px-4 py-3 text-base text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="Jordan Adebayo"
                      required
                    />
                  </label>
                  <label className="block text-sm font-medium text-rose-100">
                    Email
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      className="mt-2 w-full rounded-2xl border border-rose-400/30 bg-rose-950/35 px-4 py-3 text-base text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="you@club.com"
                      required
                    />
                  </label>
                  <label className="block text-sm font-medium text-rose-100">
                    Password
                    <input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      className="mt-2 w-full rounded-2xl border border-rose-400/30 bg-rose-950/35 px-4 py-3 text-base text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                      placeholder="Create a secure passphrase"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-amber-400 to-orange-300 px-4 py-3 text-base font-semibold text-slate-950 shadow-[0_25px_70px_rgba(244,63,94,0.42)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-200"
                  >
                    {cta}
                  </button>
                  <p className="text-center text-xs text-rose-200/75">
                    By creating an account you accept the athlete charter and consent to performance tracking.
                  </p>
                </form>
              )}
            </div>
          </section>

          <aside className="flex flex-col justify-between gap-8 rounded-3xl border border-rose-400/35 bg-rose-950/35 p-8 text-rose-100/85 backdrop-blur">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-rose-200/70">Why athletes love it</p>
              <ul className="space-y-4">
                {highlights.map((highlight) => {
                  const Icon = highlight.icon
                  return (
                    <li
                      key={highlight.title}
                      className="group flex gap-4 rounded-2xl border border-rose-400/35 bg-rose-950/45 p-4 transition hover:border-rose-400/50 hover:bg-rose-500/15"
                    >
                      <span className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-rose-500/15 text-rose-200">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <div className="space-y-1">
                        <p className="font-semibold text-rose-50">{highlight.title}</p>
                        <p className="text-sm text-rose-100/80">{highlight.description}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="rounded-3xl border border-rose-400/30 bg-gradient-to-br from-rose-500/20 via-amber-500/10 to-transparent p-6 text-sm text-rose-100/85">
              <p className="font-semibold text-rose-50">Need help getting started?</p>
              <p className="mt-2 text-rose-200/75">
                Drop a note to <span className="font-medium text-rose-200">coach@aerodash.com</span> or chat with your coaching team in the squad channel.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationExperienceModal

