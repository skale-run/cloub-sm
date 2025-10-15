import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import RedSurface from "./components/RedSurface";
import Sidebar from "./components/Sidebar";
import AccessSection from "./features/access/AccessSection";
import AuthenticationExperienceModal from "./features/auth/AuthenticationExperienceModal";
import CalendarSection from "./features/calendar/CalendarSection";
import CoachEvaluationSection from "./features/evaluations/CoachEvaluationSection";
import ProgressOverviewSection from "./features/evaluations/ProgressOverviewSection";
import AcademicRecordSection from "./features/information/AcademicRecordSection";
import BillingSection from "./features/information/BillingSection";
import TrainingAttendanceSection from "./features/information/TrainingAttendanceSection";
import PerformanceTrackingSection from "./features/performance/PerformanceTrackingSection";
import ProfileSection from "./features/profile/ProfileSection";
import { emptyProfile, type Profile } from "./features/profile/profileTypes";
import LandingPage from "./features/landing/LandingPage";
import { landingPath, normalizePath, type RoutePath } from "./routes";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)" as const;
const PROFILE_DRAFT_STORAGE_KEY = "cloub-profile-draft" as const;
const SAVED_PROFILE_STORAGE_KEY = "cloub-saved-profile" as const;
const ACHIEVEMENTS_STORAGE_KEY = "cloub-profile-achievements" as const;

function getStoredJsonValue<T extends Record<string, unknown>>(
  key: string,
  fallback: T,
): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    const parsed = JSON.parse(rawValue) as unknown;
    if (parsed === null || typeof parsed !== "object") {
      return fallback;
    }

    return { ...fallback, ...(parsed as Record<string, unknown>) } as T;
  } catch (error) {
    console.error(`Failed to parse localStorage value for "${key}"`, error);
    return fallback;
  }
}

const QUOTA_ERROR_NAMES = new Set([
  "QuotaExceededError",
  "NS_ERROR_DOM_QUOTA_REACHED",
]);

function saveJsonToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (
      error instanceof DOMException &&
      (QUOTA_ERROR_NAMES.has(error.name) || error.code === 22)
    ) {
      console.warn(
        `Skipping persisting "${key}" in localStorage because it exceeds the storage quota.`,
        error,
      );
      return;
    }

    console.error(`Failed to persist localStorage value for "${key}"`, error);
  }
}

function getStoredArrayValue(key: string, fallback: string[]): string[] {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return fallback;
    }

    return parsed.filter((item): item is string => typeof item === "string");
  } catch (error) {
    console.error(`Failed to parse localStorage value for "${key}"`, error);
    return fallback;
  }
}

function getStoredProfileOrNull(): Profile | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(SAVED_PROFILE_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    if (parsed === null || typeof parsed !== "object") {
      return null;
    }

    return { ...emptyProfile, ...(parsed as Record<string, unknown>) } as Profile;
  } catch (error) {
    console.error(
      `Failed to parse localStorage value for "${SAVED_PROFILE_STORAGE_KEY}"`,
      error,
    );
    return null;
  }
}

const getIsDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia(DESKTOP_BREAKPOINT).matches;

function App() {
  const { t } = useTranslation();
  const pageTitles = useMemo(() => ({
    [landingPath]: t("app.pageTitles.landing"),
    "/calendar": t("app.pageTitles.calendar"),
    "/academic-record": t("app.pageTitles.academicRecord"),
    "/billing": t("app.pageTitles.billing"),
    "/training-attendance": t("app.pageTitles.trainingAttendance"),
    "/coach-evaluation": t("app.pageTitles.coachEvaluation"),
    "/progress-overview": t("app.pageTitles.progressOverview"),
    "/performance-tracking": t("app.pageTitles.performanceTracking"),
    "/profile": t("app.pageTitles.profile"),
    "/access": t("app.pageTitles.access"),
  }), [t]);
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const [sidebarOpen, setSidebarOpen] = useState(getIsDesktop);
  const [profileDraft, setProfileDraft] = useState<Profile>(() =>
    getStoredJsonValue(PROFILE_DRAFT_STORAGE_KEY, emptyProfile),
  );
  const [savedProfile, setSavedProfile] = useState<Profile | null>(
    getStoredProfileOrNull,
  );
  const [achievements, setAchievements] = useState<string[]>(() =>
    getStoredArrayValue(ACHIEVEMENTS_STORAGE_KEY, [
      "Gold medal · Regional Taekwondo Open",
      "Certified · Kukkiwon 2nd Dan Promotion",
    ]),
  );
  const [newAchievement, setNewAchievement] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    const { pathname } = window.location;
    const normalized = normalizePath(pathname);

    return normalized;
  });

  useEffect(() => {
    const { pathname } = window.location;
    const normalized = normalizePath(pathname);

    if (normalized !== pathname) {
      window.history.replaceState(null, "", normalized);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const normalized = normalizePath(window.location.pathname);

      if (normalized !== window.location.pathname) {
        window.history.replaceState(null, "", normalized);
      }

      setCurrentPath(normalized);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (path: RoutePath) => {
    const normalized = normalizePath(path);

    if (window.location.pathname !== normalized) {
      window.history.pushState(null, "", normalized);
    }

    setCurrentPath(normalized);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
      if (event.matches) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    setIsDesktop(mediaQuery.matches);
    setSidebarOpen(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const handleSidebarNavigate = () => {
    if (isDesktop) {
      return;
    }

    setSidebarOpen(false);
  };

  useEffect(() => {
    if (!sidebarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    saveJsonToStorage(PROFILE_DRAFT_STORAGE_KEY, profileDraft);
  }, [profileDraft]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (savedProfile) {
      saveJsonToStorage(SAVED_PROFILE_STORAGE_KEY, savedProfile);
    } else {
      window.localStorage.removeItem(SAVED_PROFILE_STORAGE_KEY);
    }
  }, [savedProfile]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    saveJsonToStorage(ACHIEVEMENTS_STORAGE_KEY, achievements);
  }, [achievements]);

  const handleProfileChange = (key: keyof Profile, value: string) => {
    setProfileDraft((previous) => ({ ...previous, [key]: value }));
  };

  const handleSaveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!profileDraft.fullName || !profileDraft.membershipId) {
      setStatusMessage(t("app.statusMessages.completeRequired"));
      return;
    }

    setSavedProfile(profileDraft);
    setStatusMessage(t("app.statusMessages.saved"));
  };

  const handleResetProfile = () => {
    if (savedProfile) {
      setProfileDraft(savedProfile);
      setStatusMessage(t("app.statusMessages.reverted"));
    } else {
      setProfileDraft(emptyProfile);
      setStatusMessage(t("app.statusMessages.cleared"));
    }
  };

  const handleDeleteProfile = () => {
    setSavedProfile(null);
    setProfileDraft(emptyProfile);
    setStatusMessage(t("app.statusMessages.deleted"));
  };

  const handleAddAchievement = () => {
    if (!newAchievement.trim()) return;
    setAchievements((previous) => [newAchievement.trim(), ...previous]);
    setNewAchievement("");
  };

  const handleRemoveAchievement = (index: number) => {
    setAchievements((previous) => previous.filter((_, idx) => idx !== index));
  };

  const isLandingPage = currentPath === landingPath;

  const connectedUserName = (() => {
    const savedName = savedProfile?.fullName?.trim();
    const draftName = profileDraft.fullName.trim();

    return savedName || draftName || t("app.defaults.teamMember");
  })();

  const handleContactClick = () => {
    if (typeof document === "undefined") {
      return;
    }

    const contactSection = document.getElementById("landing-contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLandingPage) {
    return (
      <>
        <LandingPage
          onSignup={() => navigateTo("/access")}
          onLogin={() => navigateTo("/calendar")}
          onContact={handleContactClick}
        />
        <AuthenticationExperienceModal />
      </>
    );
  }

  return (
    <>
      <div
        className={`relative min-h-screen overflow-x-hidden text-red-100 transition-[padding-left] duration-300 ease-out ${
          sidebarOpen && isDesktop ? "lg:pl-80" : "lg:pl-0"
        }`}
      >
        <Header
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={toggleSidebar}
          pageTitle={pageTitles[currentPath] ?? t("app.pageTitles.overview")}
          userFullName={connectedUserName}
        />

        {sidebarOpen && !isDesktop ? (
          <button
            type="button"
            aria-label={t("common.navigation.close")}
            onClick={handleSidebarNavigate}
            className="fixed inset-0 z-30 bg-red-950/70 backdrop-blur-sm lg:hidden"
          />
        ) : null}

        {isDesktop ? (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={
              sidebarOpen
                ? t("common.navigation.collapse")
                : t("common.navigation.expand")
            }
            aria-controls="app-sidebar"
            aria-expanded={sidebarOpen}
            className={`group fixed top-1/2 z-50 hidden -translate-y-1/2 items-center gap-2 rounded-r-3xl border border-red-500/40 bg-red-950/80 pr-4 text-red-100 shadow-[0_18px_40px_rgba(127,29,29,0.35)] transition hover:border-red-400/70 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:flex ${
              sidebarOpen ? "left-80" : "left-0"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-900/60 text-red-100 transition group-hover:bg-red-900/80">
              {sidebarOpen ? (
                <ChevronLeft aria-hidden className="h-5 w-5" />
              ) : (
                <ChevronRight aria-hidden className="h-5 w-5" />
              )}
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.35em] text-red-200/80 xl:inline">
              {sidebarOpen
                ? t("common.navigation.collapse")
                : t("common.navigation.expand")}
            </span>
          </button>
        ) : null}

        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 sm:py-6 lg:items-start lg:gap-8 lg:px-10 lg:py-10">
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
            <main className="relative z-0 flex-1 space-y-10 px-4 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-12">
              {(() => {
                switch (currentPath) {
                  case "/calendar":
                    return <CalendarSection />;
                  case "/academic-record":
                    return <AcademicRecordSection />;
                  case "/billing":
                    return <BillingSection />;
                  case "/training-attendance":
                    return <TrainingAttendanceSection />;
                  case "/coach-evaluation":
                    return <CoachEvaluationSection />;
                  case "/progress-overview":
                    return <ProgressOverviewSection />;
                  case "/performance-tracking":
                    return <PerformanceTrackingSection />;
                  case "/profile":
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
                    );
                  case "/access":
                    return <AccessSection savedProfile={savedProfile} />;
                  default:
                    return <CalendarSection />;
                }
              })()}
            </main>
          </RedSurface>
        </div>
      </div>
      <AuthenticationExperienceModal />
    </>
  );
}

export default App;
