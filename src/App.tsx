import type { FormEvent } from 'react'
import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AccessSection from './features/access/AccessSection'
import CalendarSection from './features/calendar/CalendarSection'
import CompetitionSection from './features/competitions/CompetitionSection'
import PerformanceSection from './features/performance/PerformanceSection'
import ProfileSection from './features/profile/ProfileSection'
import { emptyProfile, type Profile } from './features/profile/profileTypes'
import TrainingSection from './features/training/TrainingSection'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDraft, setProfileDraft] = useState<Profile>(emptyProfile)
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null)
  const [achievements, setAchievements] = useState<string[]>([
    'Season-best 400m: 49.20s',
    'Bronze medal · State Indoor Championships',
  ])
  const [newAchievement, setNewAchievement] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const toggleSidebar = () => setSidebarOpen((open) => !open)
  const handleSidebarNavigate = () => setSidebarOpen(false)

  const handleProfileChange = (key: keyof Profile, value: string) => {
    setProfileDraft((previous) => ({ ...previous, [key]: value }))
  }

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!profileDraft.fullName || !profileDraft.membershipId) {
      setStatusMessage('Please complete at least the full name and membership ID before saving.')
      return
    }

    setSavedProfile(profileDraft)
    setStatusMessage('Profile saved. QR code refreshed with the latest details.')
  }

  const handleResetProfile = () => {
    if (savedProfile) {
      setProfileDraft(savedProfile)
      setStatusMessage('Draft reverted to the last saved profile.')
    } else {
      setProfileDraft(emptyProfile)
      setStatusMessage('Profile draft cleared.')
    }
  }

  const handleDeleteProfile = () => {
    setSavedProfile(null)
    setProfileDraft(emptyProfile)
    setStatusMessage('Profile deleted. Create a new one to generate a QR code.')
  }

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return
    setAchievements((previous) => [newAchievement.trim(), ...previous])
    setNewAchievement('')
  }

  const handleRemoveAchievement = (index: number) => {
    setAchievements((previous) => previous.filter((_, idx) => idx !== index))
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-100">
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={handleSidebarNavigate}
          className="fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-10 lg:py-10">
        <Sidebar
          open={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          onNavigate={handleSidebarNavigate}
          savedProfile={savedProfile}
        />

        <div className="flex flex-1 flex-col rounded-3xl border border-white/5 bg-slate-950/60 shadow-[0_35px_120px_rgba(8,15,35,0.55)] backdrop-blur xl:rounded-[32px]">
          <Header isSidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} savedProfile={savedProfile} />

          <main className="relative z-0 flex-1 space-y-12 px-4 pb-16 pt-6 sm:px-8 lg:px-12">
            <CalendarSection />
            <TrainingSection />
            <CompetitionSection />
            <PerformanceSection />
            <ProfileSection
              profileDraft={profileDraft}
              onProfileChange={handleProfileChange}
              onSaveProfile={handleSaveProfile}
              onResetProfile={handleResetProfile}
              onDeleteProfile={handleDeleteProfile}
              statusMessage={statusMessage}
              achievements={achievements}
              newAchievement={newAchievement}
              onNewAchievementChange={setNewAchievement}
              onAddAchievement={handleAddAchievement}
              onRemoveAchievement={handleRemoveAchievement}
            />
            <AccessSection savedProfile={savedProfile} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
