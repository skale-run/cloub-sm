import { X } from 'lucide-react'
import type { FormEvent } from 'react'
import type { Profile } from './profileTypes'

type ProfileSectionProps = {
  profileDraft: Profile
  onProfileChange: (key: keyof Profile, value: string) => void
  onSaveProfile: (event: FormEvent<HTMLFormElement>) => void
  onResetProfile: () => void
  onDeleteProfile: () => void
  statusMessage: string
  achievements: string[]
  newAchievement: string
  onNewAchievementChange: (value: string) => void
  onAddAchievement: () => void
  onRemoveAchievement: (index: number) => void
}

function ProfileSection({
  profileDraft,
  onProfileChange,
  onSaveProfile,
  onResetProfile,
  onDeleteProfile,
  statusMessage,
  achievements,
  newAchievement,
  onNewAchievementChange,
  onAddAchievement,
  onRemoveAchievement,
}: ProfileSectionProps) {
  return (
    <section id="profile" className="panel">
      <div className="panel__header">
        <h2>My Athlete Profile</h2>
        <span className="panel__tag">Manage & update</span>
      </div>

      <div className="profile">
        <form className="profile__form" onSubmit={onSaveProfile}>
          <div className="form-grid">
            <label>
              Full name
              <input
                value={profileDraft.fullName}
                onChange={(event) => onProfileChange('fullName', event.target.value)}
                placeholder="e.g. Lina Carter"
                required
              />
            </label>
            <label>
              Role
              <input
                value={profileDraft.role}
                onChange={(event) => onProfileChange('role', event.target.value)}
                placeholder="Sprinter / Mid-distance"
              />
            </label>
            <label>
              Squad / Tier
              <input
                value={profileDraft.squad}
                onChange={(event) => onProfileChange('squad', event.target.value)}
                placeholder="Elite Performance Squad"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={profileDraft.email}
                onChange={(event) => onProfileChange('email', event.target.value)}
                placeholder="athlete@clubpulse.io"
              />
            </label>
            <label>
              Emergency contact
              <input
                value={profileDraft.emergencyContact}
                onChange={(event) => onProfileChange('emergencyContact', event.target.value)}
                placeholder="Jordan Carter · +44 7700 000000"
              />
            </label>
            <label>
              Membership ID
              <input
                value={profileDraft.membershipId}
                onChange={(event) => onProfileChange('membershipId', event.target.value)}
                placeholder="CP-2025-184"
                required
              />
            </label>
          </div>
          <div className="profile__actions">
            <button type="submit">Save profile</button>
            <button type="button" onClick={onResetProfile} className="secondary">
              Reset draft
            </button>
            <button type="button" onClick={onDeleteProfile} className="danger">
              Delete profile
            </button>
          </div>
          {statusMessage && <p className="profile__status">{statusMessage}</p>}
        </form>

        <div className="profile__side">
          <div className="achievements">
            <div className="achievements__header">
              <h3>Highlights & achievements</h3>
              <div className="achievements__input-group">
                <input
                  value={newAchievement}
                  onChange={(event) => onNewAchievementChange(event.target.value)}
                  placeholder="Add new highlight"
                />
                <button type="button" onClick={onAddAchievement}>
                  Add
                </button>
              </div>
            </div>
            <ul>
              {achievements.map((item, index) => (
                <li key={item}>
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveAchievement(index)}
                    aria-label="Remove"
                  >
                    <X aria-hidden className="achievements__remove-icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileSection
