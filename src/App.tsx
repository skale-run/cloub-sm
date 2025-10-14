import type { FormEvent } from 'react'
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AccessSection from './features/access/AccessSection'
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
    <div className="app-shell">
      <Sidebar
        open={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onNavigate={handleSidebarNavigate}
        savedProfile={savedProfile}
      />

      <div className="content">
        <Header
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          savedProfile={savedProfile}
        />

        <main className="main">
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
  )
}

export default App
