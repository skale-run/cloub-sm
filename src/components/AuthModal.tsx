import {
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

type AuthMode = 'login' | 'register'

type AuthModalProps = {
  open: boolean
  onClose: () => void
}

const marketingHighlights = [
  {
    title: 'Unified programme operating system',
    description:
      'Layer calendars, testing data, and communication in one shared workspace for staff and athletes.',
  },
  {
    title: 'Decisions fuelled by live telemetry',
    description:
      'Stream GPS, force plate, and recovery insights to every coach so feedback lands in the same session.',
  },
  {
    title: 'Storytelling dashboards in minutes',
    description:
      'Spin up sponsor-ready visuals with automated highlights, milestones, and athlete spotlights.',
  },
]

const programmeBadges = ['NCAA D1', 'Pro camps', 'Elite academies']

const formCopy: Record<
  AuthMode,
  {
    title: string
    subtitle: string
    cta: string
  }
> = {
  login: {
    title: 'Welcome back to Cloub',
    subtitle:
      'Sign in to sync your personal dashboard, review progress, and unlock the latest performance drops.',
    cta: 'Sign in to dashboard',
  },
  register: {
    title: 'Create your athlete hub',
    subtitle:
      'Onboard your programme in under a minute, invite coaches, and centralise your performance workflows.',
    cta: 'Launch your workspace',
  },
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login')
  const firstFieldRef = useRef<HTMLInputElement | null>(null)

  const { title, subtitle, cta } = useMemo(() => formCopy[mode], [mode])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setMode('login')
      return
    }

    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return
    }

    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = 'hidden'

    const timeout = window.setTimeout(() => {
      firstFieldRef.current?.focus()
    }, 100)

    return () => {
      window.clearTimeout(timeout)
      style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/85 px-4 py-10 backdrop-blur">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-subtitle"
        className="relative grid w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/70 shadow-[0_45px_140px_rgba(8,15,35,0.7)] backdrop-blur-xl lg:grid-cols-[1.1fr,0.9fr]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-900/60 text-slate-200 transition hover:border-sky-400/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          aria-label="Close authentication"
        >
          <span className="text-xl leading-none">×</span>
        </button>

        <section className="relative hidden h-full flex-col justify-between gap-10 bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-slate-950/90 p-12 text-slate-100 lg:flex">
          <div className="pointer-events-none absolute inset-0 opacity-80" aria-hidden>
            <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-sky-400/25 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
          </div>

          <div className="relative space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-100/80">
              Elevate every rep
            </span>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white">
              Orchestrate your entire performance ecosystem in one command centre.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-100/80">
              Cloub pairs scheduling discipline with cinematic storytelling so your athletes, staff, and partners stay in lockstep.
              Launch personalised dashboards, automate updates, and celebrate every milestone in real time.
            </p>
          </div>

          <ul className="relative space-y-5 text-sm">
            {marketingHighlights.map((highlight) => (
              <li key={highlight.title} className="flex items-start gap-4">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-400/25 text-sm font-semibold text-sky-100">
                  ✓
                </span>
                <div className="space-y-1">
                  <p className="font-semibold text-white/95">{highlight.title}</p>
                  <p className="text-slate-100/75">{highlight.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col gap-5 rounded-3xl border border-white/15 bg-white/5 p-6 shadow-[0_18px_45px_rgba(8,15,35,0.55)]">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-100/70">
              {programmeBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/20 bg-white/10 px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
            <p className="text-lg font-semibold text-white">Trusted across 140+ high-performance programmes</p>
            <blockquote className="space-y-2 text-sm text-slate-100/80">
              <p>
                “Within a week our staff finally had a single pulse on athlete readiness. Reviews that took hours now take minutes.”
              </p>
              <cite className="block text-xs uppercase tracking-[0.28em] text-sky-100/70">
                Coach Rivera · Velocity Elite
              </cite>
            </blockquote>
          </div>
        </section>

        <section className="flex flex-col gap-8 bg-slate-950/80 px-6 py-8 sm:px-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 rounded-full px-4 py-2 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${mode === 'login' ? 'bg-sky-500/20 text-white shadow-[0_12px_28px_rgba(14,165,233,0.35)]' : 'text-slate-300/85 hover:text-white'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 rounded-full px-4 py-2 font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${mode === 'register' ? 'bg-sky-500/20 text-white shadow-[0_12px_28px_rgba(14,165,233,0.35)]' : 'text-slate-300/85 hover:text-white'}`}
              >
                Register
              </button>
            </div>

            <div className="space-y-3">
              <h3 id="auth-modal-title" className="text-2xl font-semibold text-white">
                {title}
              </h3>
              <p id="auth-modal-subtitle" className="text-sm leading-relaxed text-slate-300/85">
                {subtitle}
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {mode === 'register' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-200/90">First name</span>
                  <input
                    ref={mode === 'register' ? firstFieldRef : undefined}
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="Jordan"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500/70 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-slate-200/90">Last name</span>
                  <input
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Taylor"
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500/70 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                  />
                </label>
              </div>
            ) : null}

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200/90">Email</span>
              <input
                ref={mode === 'login' ? firstFieldRef : undefined}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="athlete@program.com"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500/70 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-slate-200/90">Password</span>
              <input
                type="password"
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder="••••••••"
                required
                minLength={8}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500/70 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
              />
            </label>

            {mode === 'register' ? (
              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-200/90">Confirm password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-500/70 focus:border-sky-400/60 focus:outline-none focus:ring-2 focus:ring-sky-400/30"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between text-xs text-slate-300/80">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="h-4 w-4 rounded border border-white/20 bg-slate-900/60 text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                  />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-sky-300 transition hover:text-sky-200">
                  Forgot password?
                </a>
              </div>
            )}

            {mode === 'register' ? (
              <label className="flex items-start gap-3 text-xs text-slate-300/85">
                <input
                  type="checkbox"
                  name="updates"
                  className="mt-1 h-4 w-4 rounded border border-white/20 bg-slate-900/60 text-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
                />
                <span>
                  Keep me in the loop on performance playbooks, early product drops, and invite-only training intensives.
                </span>
              </label>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-sky-400 via-sky-500 to-violet-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
            >
              {cta}
            </button>
          </form>

          <p className="text-xs text-slate-400">
            By continuing you agree to our{' '}
            <a href="#" className="text-sky-300 transition hover:text-sky-200">
              terms of service
            </a>{' '}
            and{' '}
            <a href="#" className="text-sky-300 transition hover:text-sky-200">
              privacy policy
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}

export default AuthModal
