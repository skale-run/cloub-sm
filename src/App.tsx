import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import AccessSection from './features/access/AccessSection'
import CalendarSection from './features/calendar/CalendarSection'
import CoachEvaluationSection from './features/evaluations/CoachEvaluationSection'
import ProgressOverviewSection from './features/evaluations/ProgressOverviewSection'
import AcademicRecordSection from './features/information/AcademicRecordSection'
import BillingSection from './features/information/BillingSection'
import TrainingAttendanceSection from './features/information/TrainingAttendanceSection'
import PerformanceTrackingSection from './features/performance/PerformanceTrackingSection'
import ProfileSection from './features/profile/ProfileSection'
import { emptyProfile, type Profile } from './features/profile/profileTypes'
import { normalizePath, type RoutePath } from './routes'

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

  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    const { pathname } = window.location
    const normalized = normalizePath(pathname)

    return normalized
  })

  useEffect(() => {
    const { pathname } = window.location
    const normalized = normalizePath(pathname)

    if (normalized !== pathname) {
      window.history.replaceState(null, '', normalized)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePath(window.location.pathname)

      if (normalized !== window.location.pathname) {
        window.history.replaceState(null, '', normalized)
      }

      setCurrentPath(normalized)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigateTo = (path: RoutePath) => {
    const normalized = normalizePath(path)

    if (window.location.pathname !== normalized) {
      window.history.pushState(null, '', normalized)
    }

    setCurrentPath(normalized)
  }

  const toggleSidebar = () => setSidebarOpen((open) => !open)
  const handleSidebarNavigate = () => setSidebarOpen(false)

  useEffect(() => {
    if (!sidebarOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sidebarOpen])

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

      <Sidebar
        open={sidebarOpen}
        onToggleSidebar={toggleSidebar}
        onNavigate={handleSidebarNavigate}
        onNavigateTo={navigateTo}
        currentPath={currentPath}
        savedProfile={savedProfile}
      />

      <div className="relative flex min-h-screen flex-col lg:pl-[24rem]">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="flex flex-1 flex-col rounded-3xl border border-white/5 bg-slate-950/60 shadow-[0_35px_120px_rgba(8,15,35,0.55)] backdrop-blur xl:rounded-[32px]">
            <Header isSidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} savedProfile={savedProfile} />

            <main className="relative z-0 flex-1 space-y-12 px-4 pb-16 pt-6 sm:px-8 lg:px-12">
              {(() => {
                switch (currentPath) {
                  case '/calendar':
                    return <CalendarSection />
                  case '/academic-record':
                    return <AcademicRecordSection />
                  case '/billing':
                    return <BillingSection />
                  case '/training-attendance':
                    return <TrainingAttendanceSection />
                  case '/coach-evaluation':
                    return <CoachEvaluationSection />
                  case '/progress-overview':
                    return <ProgressOverviewSection />
                  case '/performance-tracking':
                    return <PerformanceTrackingSection />
                  case '/profile':
                    return (
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
                    )
                  case '/access':
                    return <AccessSection savedProfile={savedProfile} />
                  default:
                    return <CalendarSection />
                }
              })()}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
