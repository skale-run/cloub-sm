import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import RedSurface from './components/RedSurface'
import Sidebar from './components/Sidebar'
import AccessSection from './features/access/AccessSection'
import AuthenticationExperienceModal from './features/auth/AuthenticationExperienceModal'
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

const pageTitles: Record<RoutePath, string> = {
  '/calendar': 'Calendar overview',
  '/academic-record': 'Academic record',
  '/billing': 'Billing',
  '/training-attendance': 'Training attendance',
  '/coach-evaluation': 'Coach evaluation',
  '/progress-overview': 'Progress overview',
  '/performance-tracking': 'Performance tracking',
  '/profile': 'Profile',
  '/access': 'Access management',
}

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
    <>
      <div className="relative min-h-screen overflow-x-hidden text-red-100">
        {sidebarOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={handleSidebarNavigate}
            className="fixed inset-0 z-30 bg-red-950/70 backdrop-blur-sm lg:hidden"
          />
        ) : null}

        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-start lg:gap-8 lg:px-10 lg:py-10">
          <Sidebar
            open={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            onNavigate={handleSidebarNavigate}
            onNavigateTo={navigateTo}
            currentPath={currentPath}
            savedProfile={savedProfile}
          />

          <RedSurface
            tone="primary"
            className="flex flex-1 flex-col overflow-x-hidden xl:rounded-[32px]"
          >
            <Header
              isSidebarOpen={sidebarOpen}
              onToggleSidebar={toggleSidebar}
              pageTitle={pageTitles[currentPath] ?? 'Overview'}
            />

            <main className="relative z-0 flex-1 space-y-10 px-4 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-12">
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
          </RedSurface>
        </div>
      </div>
      <AuthenticationExperienceModal />
    </>
  )
}

export default App
