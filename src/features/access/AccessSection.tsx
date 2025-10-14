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

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
      payload,
    )}`
  }, [savedProfile])

  return (
    <section id="access" className="panel">
      <div className="panel__header">
        <h2>Club Access QR</h2>
        <span className="panel__tag">Instant pass</span>
      </div>
      <div className="access">
        <div className="access__card">
          <p>Show this code at the smart gate to enter the facility.</p>
          {savedProfile ? (
            <div className="access__qr">
              <img src={qrCodeUrl} alt="Club access QR code" />
              <div className="access__details">
                <p className="access__name">{savedProfile.fullName}</p>
                <p className="access__id">ID · {savedProfile.membershipId}</p>
                <p>{savedProfile.squad || 'Assign squad to personalise access'}</p>
              </div>
            </div>
          ) : (
            <div className="access__placeholder">
              <p>Save your profile to generate a personalised QR code.</p>
            </div>
          )}
        </div>
        <aside className="access__notes">
          <h3>Access Tips</h3>
          <ul>
            <li>QR refreshes automatically every time you save your profile.</li>
            <li>Keep screen brightness high for the scanners at Gate B.</li>
            <li>Add your emergency contact for compliant access accreditation.</li>
          </ul>
        </aside>
      </div>
    </section>
  )
}

export default AccessSection
