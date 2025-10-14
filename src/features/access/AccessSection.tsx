import { useMemo } from 'react'
import type { Profile } from '../profile/profileTypes'

type AccessSectionProps = {
  savedProfile: Profile | null
}

function AccessSection({ savedProfile }: AccessSectionProps) {
  const qrCodeUrl = useMemo(() => {
    if (!savedProfile) {
      return ''
    }

    const payload = JSON.stringify({
      member: savedProfile.fullName,
      membershipId: savedProfile.membershipId,
      squad: savedProfile.squad,
    })

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(payload)}`
  }, [savedProfile])

  return (
    <section id="access" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Club access QR</h2>
          <p className="text-sm text-slate-400/80">Instantly retrieve your smart gate pass once your profile is saved.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100">
          Instant pass
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 p-6 text-slate-200 shadow-[0_25px_60px_rgba(8,15,35,0.45)]">
          <p className="text-sm text-slate-300/90">Show this code at the smart gate to enter the facility.</p>
          {savedProfile ? (
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_25px_60px_rgba(8,15,35,0.35)] sm:flex-row sm:items-start sm:justify-between">
              <img
                src={qrCodeUrl}
                alt="Club access QR code"
                className="h-44 w-44 rounded-3xl border border-white/10 bg-white/5 p-3"
              />
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <p className="text-lg font-semibold text-white">{savedProfile.fullName}</p>
                <p className="text-sm text-slate-300/80">ID · {savedProfile.membershipId}</p>
                <p className="text-sm text-slate-400/80">
                  {savedProfile.squad || 'Assign squad to personalise access'}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/20 bg-white/5 p-10 text-center text-sm text-slate-300/80">
              <p>Save your profile to generate a personalised QR code.</p>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Profile required</p>
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-white/5 bg-slate-900/60 p-6 text-slate-200">
          <h3 className="text-lg font-semibold text-white">Access tips</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300/90">
            <li className="rounded-2xl border border-white/5 bg-white/5 p-4">
              QR refreshes automatically every time you save your profile.
            </li>
            <li className="rounded-2xl border border-white/5 bg-white/5 p-4">
              Keep screen brightness high for the scanners at Gate B.
            </li>
            <li className="rounded-2xl border border-white/5 bg-white/5 p-4">
              Add your emergency contact for compliant access accreditation.
            </li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default AccessSection
