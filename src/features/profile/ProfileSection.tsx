import { X } from 'lucide-react'
import type { FormEvent } from 'react'
import RedSurface from '../../components/RedSurface'
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
    <section id="profile" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-rose-50 sm:text-2xl">My athlete profile</h2>
          <p className="text-sm text-rose-200/75">Keep your credentials current to unlock personalised drills and access.</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/50 bg-rose-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-rose-100">
          Manage & update
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <RedSurface as="form" tone="muted" className="p-6 text-rose-50" onSubmit={onSaveProfile}>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Full name</span>
              <input
                value={profileDraft.fullName}
                onChange={(event) => onProfileChange('fullName', event.target.value)}
                placeholder="e.g. Lina Carter"
                required
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Role</span>
              <input
                value={profileDraft.role}
                onChange={(event) => onProfileChange('role', event.target.value)}
                placeholder="Sprinter / Mid-distance"
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Squad / Tier</span>
              <input
                value={profileDraft.squad}
                onChange={(event) => onProfileChange('squad', event.target.value)}
                placeholder="Elite Performance Squad"
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Email</span>
              <input
                type="email"
                value={profileDraft.email}
                onChange={(event) => onProfileChange('email', event.target.value)}
                placeholder="athlete@clubpulse.io"
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Emergency contact</span>
              <input
                value={profileDraft.emergencyContact}
                onChange={(event) => onProfileChange('emergencyContact', event.target.value)}
                placeholder="Jordan Carter · +44 7700 000000"
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-semibold text-rose-50">Membership ID</span>
              <input
                value={profileDraft.membershipId}
                onChange={(event) => onProfileChange('membershipId', event.target.value)}
                placeholder="CP-2025-184"
                required
                className="rounded-2xl border border-rose-400/35 bg-rose-950/60 px-4 py-3 text-rose-50 placeholder:text-rose-200/60 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/20 px-5 py-2.5 text-sm font-semibold text-rose-100 transition hover:border-rose-400/60 hover:bg-rose-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
            >
              Save profile
            </button>
            <button
              type="button"
              onClick={onResetProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-rose-400/35 bg-rose-950/40 px-5 py-2.5 text-sm font-semibold text-rose-100 transition hover:border-rose-400/55 hover:bg-rose-900/50 hover:text-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
            >
              Reset draft
            </button>
            <button
              type="button"
              onClick={onDeleteProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-rose-400/50 bg-rose-500/15 px-5 py-2.5 text-sm font-semibold text-rose-200 transition hover:border-rose-400/70 hover:bg-rose-500/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
            >
              Delete profile
            </button>
          </div>

          {statusMessage && (
            <p className="mt-4 inline-flex rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
              {statusMessage}
            </p>
          )}
        </RedSurface>

        <RedSurface tone="muted" className="flex flex-col gap-4 rounded-3xl p-6 text-rose-50">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-rose-50">Highlights & achievements</h3>
              <p className="text-sm text-rose-200/75">Capture season wins to keep your motivation board updated.</p>
            </div>
            <RedSurface tone="glass" className="flex w-full gap-2 rounded-2xl p-2 sm:w-auto">
              <input
                value={newAchievement}
                onChange={(event) => onNewAchievementChange(event.target.value)}
                placeholder="Add new highlight"
                className="flex-1 rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm text-rose-50 placeholder:text-rose-200/70 focus:border-rose-400/60 focus:outline-none focus:ring-2 focus:ring-rose-400/40"
              />
              <button
                type="button"
                onClick={onAddAchievement}
                className="inline-flex items-center justify-center rounded-xl bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-400/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                Add
              </button>
            </RedSurface>
          </div>

          <ul className="space-y-3">
            {achievements.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex items-center justify-between gap-3 rounded-2xl border border-rose-400/25 bg-rose-950/35 px-4 py-3 text-sm"
              >
                <span className="text-rose-100">{item}</span>
                <button
                  type="button"
                  onClick={() => onRemoveAchievement(index)}
                  aria-label="Remove"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-400/35 bg-rose-950/50 text-rose-200 transition hover:border-rose-400/60 hover:bg-rose-500/20 hover:text-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
                >
                  <X aria-hidden className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </RedSurface>
      </div>
    </section>
  )
}

export default ProfileSection
