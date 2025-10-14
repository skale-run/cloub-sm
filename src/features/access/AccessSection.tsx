import { useMemo } from 'react'
import RedSurface from '../../components/RedSurface'
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
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Club access QR</h2>
          <p className="text-sm text-red-200/75">
            Instantly retrieve your smart gate pass once your profile is saved.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          Instant pass
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface tone="primary" className="flex flex-col gap-6 p-6 text-red-50">
          <p className="text-sm text-red-100/80">Show this code at the smart gate to enter the facility.</p>
          {savedProfile ? (
            <RedSurface
              tone="glass"
              className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <img
                src={qrCodeUrl}
                alt="Club access QR code"
                className="h-44 w-44 rounded-3xl border border-red-400/40 bg-red-950/40 p-3"
              />
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <p className="text-lg font-semibold text-red-50">{savedProfile.fullName}</p>
                <p className="text-sm text-red-100/75">ID · {savedProfile.membershipId}</p>
                <p className="text-sm text-red-200/70">
                  {savedProfile.squad || 'Assign squad to personalise access'}
                </p>
              </div>
            </RedSurface>
          ) : (
            <RedSurface
              tone="dashed"
              className="flex flex-col items-center justify-center gap-4 p-10 text-center text-sm"
            >
              <p>Save your profile to generate a personalised QR code.</p>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Profile required</p>
            </RedSurface>
          )}
        </RedSurface>

        <RedSurface as="aside" tone="muted" className="p-6 text-red-50">
          <h3 className="text-lg font-semibold text-red-50">Access tips</h3>
          <ul className="mt-4 space-y-3 text-sm text-red-100/85">
            <RedSurface as="li" tone="glass" className="p-4">
              QR refreshes automatically every time you save your profile.
            </RedSurface>
            <RedSurface as="li" tone="glass" className="p-4">
              Keep screen brightness high for the scanners at Gate B.
            </RedSurface>
            <RedSurface as="li" tone="glass" className="p-4">
              Add your emergency contact for compliant access accreditation.
            </RedSurface>
          </ul>
        </RedSurface>
      </div>
    </section>
  )
}

export default AccessSection
