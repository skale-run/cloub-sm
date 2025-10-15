import type { FormEvent } from "react";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import RedSurface from "./components/RedSurface";
import Sidebar from "./components/Sidebar";
import AuthenticationExperienceModal from "./features/auth/AuthenticationExperienceModal";
import { useAthletePortalModal } from "./features/auth/AthletePortalModalContext";
import { useMember, type Member } from "./features/auth/MemberContext";
import { emptyProfile, type Profile } from "./features/profile/profileTypes";
import { cn } from "./lib/cn";
import { lazyWithPreload } from "./lib/lazyWithPreload";
import { landingPath, normalizePath, type RoutePath } from "./routes";

const LandingPage = lazyWithPreload(() => import("./features/landing/LandingPage"));
const CalendarSection = lazyWithPreload(
  () => import("./features/calendar/CalendarSection"),
);
const AcademicRecordSection = lazyWithPreload(
  () => import("./features/information/AcademicRecordSection"),
);
const BillingSection = lazyWithPreload(
  () => import("./features/information/BillingSection"),
);
const TrainingAttendanceSection = lazyWithPreload(
  () => import("./features/information/TrainingAttendanceSection"),
);
const CoachEvaluationSection = lazyWithPreload(
  () => import("./features/evaluations/CoachEvaluationSection"),
);
const ProgressOverviewSection = lazyWithPreload(
  () => import("./features/evaluations/ProgressOverviewSection"),
);
const PerformanceTrackingSection = lazyWithPreload(
  () => import("./features/performance/PerformanceTrackingSection"),
);
const ProfileSection = lazyWithPreload(
  () => import("./features/profile/ProfileSection"),
);
const AccessSection = lazyWithPreload(
  () => import("./features/access/AccessSection"),
);

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="relative isolate flex min-h-[240px] w-full flex-1 items-center justify-center overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-900/45 via-rose-950/40 to-slate-950/60 px-6 py-10 text-sm text-red-100/80 shadow-[0_18px_48px_rgba(200,24,58,0.2)]">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
      >
        <div className="absolute inset-x-16 top-[-40%] h-[140%] rounded-full bg-[radial-gradient(circle_at_top,rgba(248,113,113,0.35),transparent_70%)] blur-2xl" />
        <div className="absolute inset-12 rounded-[36px] border border-white/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15),transparent_65%)]" />
      </div>

      <div className="relative flex flex-col items-center gap-4" role="status" aria-live="polite">
        <span className="relative flex h-12 w-12 items-center justify-center">
          <span className="absolute h-full w-full animate-spin rounded-full border-2 border-red-300/60 border-t-transparent" />
          <span className="absolute h-4 w-4 animate-ping rounded-full bg-red-200/60" />
          <span className="relative h-2 w-2 rounded-full bg-red-100" />
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-red-100/90 shadow-inner">
          {label}
        </span>
      </div>
    </div>
  );
}

const DESKTOP_BREAKPOINT = "(min-width: 1024px)" as const;
const PROFILE_DRAFT_STORAGE_KEY = "cloub-profile-draft" as const;
const SAVED_PROFILE_STORAGE_KEY = "cloub-saved-profile" as const;
const ACHIEVEMENTS_STORAGE_KEY = "cloub-profile-achievements" as const;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

const sectionPreloaders: Partial<Record<RoutePath, () => Promise<unknown>>> = {
  [landingPath]: LandingPage.preload,
  "/calendar": CalendarSection.preload,
  "/academic-record": AcademicRecordSection.preload,
  "/billing": BillingSection.preload,
  "/training-attendance": TrainingAttendanceSection.preload,
  "/coach-evaluation": CoachEvaluationSection.preload,
  "/progress-overview": ProgressOverviewSection.preload,
  "/performance-tracking": PerformanceTrackingSection.preload,
  "/profile": ProfileSection.preload,
  "/access": AccessSection.preload,
};

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

function mapMemberToProfile(member: Member): Profile {
  return {
    fullName: member.fullName ?? "",
    role: member.role ?? "",
    squad: member.squad ?? "",
    email: member.email ?? "",
    emergencyContact: member.emergencyContact ?? "",
    membershipId: member.membershipId ?? "",
    profileImage: member.profilePhotoUrl ?? "",
  };
}

function App() {
  const { t, i18n } = useTranslation();
  const { member, setMember, clearMember } = useMember();
  const { open: openAthletePortalModal } = useAthletePortalModal();
  const previousMemberRef = useRef<Member | null>(null);
  const prefetchedPathsRef = useRef(new Set<RoutePath>());
  const prefetchSection = useCallback(
    (path: RoutePath) => {
      if (prefetchedPathsRef.current.has(path)) {
        return;
      }

      const preload = sectionPreloaders[path];
      if (!preload) {
        return;
      }

      prefetchedPathsRef.current.add(path);
      void preload();
    },
    [prefetchedPathsRef],
  );
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
    prefetchSection(currentPath);
  }, [currentPath, prefetchSection]);

  useEffect(() => {
    if (member) {
      const mappedProfile = mapMemberToProfile(member);
      setProfileDraft(mappedProfile);
      setSavedProfile(mappedProfile);
      setStatusMessage("");
    } else if (previousMemberRef.current) {
      setSavedProfile(null);
      setProfileDraft(emptyProfile);
      setStatusMessage("");
    }

    previousMemberRef.current = member;
  }, [member]);

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

      prefetchSection(normalized);
      setCurrentPath(normalized);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [prefetchSection]);

  const navigateTo = (path: RoutePath) => {
    const normalized = normalizePath(path);

    prefetchSection(normalized);
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

    const trimmedProfile: Profile = {
      fullName: profileDraft.fullName.trim(),
      role: profileDraft.role.trim(),
      squad: profileDraft.squad.trim(),
      email: profileDraft.email.trim(),
      emergencyContact: profileDraft.emergencyContact.trim(),
      membershipId: profileDraft.membershipId.trim(),
      profileImage: profileDraft.profileImage,
    };

    if (!trimmedProfile.fullName || !trimmedProfile.membershipId) {
      setStatusMessage(t("app.statusMessages.completeRequired"));
      return;
    }

    setProfileDraft(trimmedProfile);

    if (!member) {
      setSavedProfile(trimmedProfile);
      setStatusMessage(t("app.statusMessages.saved"));
      return;
    }

    void (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/members/${member.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: trimmedProfile.fullName,
            email: trimmedProfile.email,
            role: trimmedProfile.role,
            squad: trimmedProfile.squad,
            emergencyContact: trimmedProfile.emergencyContact,
            membershipId: trimmedProfile.membershipId,
            profilePhotoUrl: trimmedProfile.profileImage || null,
          }),
        });

        const payload = (await response.json().catch(() => null)) as
          | { member?: Member; error?: string }
          | null;

        if (!response.ok) {
          setStatusMessage(
            payload?.error ?? t("app.statusMessages.saveError"),
          );
          return;
        }

        if (!payload?.member) {
          setStatusMessage(t("app.statusMessages.saveError"));
          return;
        }

        setMember(payload.member);
        setStatusMessage(t("app.statusMessages.saved"));
      } catch (error) {
        console.error("Failed to save member profile", error);
        setStatusMessage(t("app.statusMessages.saveError"));
      }
    })();
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
    if (!member) {
      setSavedProfile(null);
      setProfileDraft(emptyProfile);
      setStatusMessage(t("app.statusMessages.deleted"));
      return;
    }

    void (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/members/${member.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          setStatusMessage(t("app.statusMessages.deleteError"));
          return;
        }

        clearMember();
        setSavedProfile(null);
        setProfileDraft(emptyProfile);
        setStatusMessage(t("app.statusMessages.deleted"));
      } catch (error) {
        console.error("Failed to delete member profile", error);
        setStatusMessage(t("app.statusMessages.deleteError"));
      }
    })();
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

  const fallbackMessage = t("common.loading", { defaultValue: "Loading…" });

  if (isLandingPage) {
    return (
      <>
        <Suspense fallback={<SectionFallback label={fallbackMessage} />}>
          <LandingPage
            onSignup={() => openAthletePortalModal("register")}
            onLogin={() => openAthletePortalModal("login")}
            onContact={handleContactClick}
          />
        </Suspense>
        <AuthenticationExperienceModal />
      </>
    );
  }

  const isRTL = i18n.dir() === "rtl";

  return (
    <>
      <div
        className={cn(
          "relative min-h-screen overflow-x-hidden text-red-100 duration-300 ease-out",
          isRTL ? "transition-[padding-right]" : "transition-[padding-left]",
          sidebarOpen && isDesktop
            ? isRTL
              ? "lg:pr-80"
              : "lg:pl-80"
            : isRTL
            ? "lg:pr-0"
            : "lg:pl-0",
        )}
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

        <div
          className={cn(
            "mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-5 sm:px-6 sm:py-6 lg:items-start lg:gap-8 lg:px-10 lg:py-10",
            !sidebarOpen ? "lg:max-w-none" : undefined,
          )}
        >
          <Sidebar
            open={sidebarOpen}
            onToggleSidebar={toggleSidebar}
            onNavigate={handleSidebarNavigate}
            onNavigateTo={navigateTo}
            onPrefetchSection={prefetchSection}
            currentPath={currentPath}
          />

          <RedSurface
            tone="primary"
            className="flex flex-1 flex-col overflow-x-hidden xl:rounded-[32px]"
          >
            <main className="relative z-0 flex-1 space-y-10 px-4 pb-14 pt-6 sm:px-8 sm:pb-16 sm:pt-8 lg:px-12">
              <Suspense fallback={<SectionFallback label={fallbackMessage} />}>
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
              </Suspense>
            </main>
          </RedSurface>
        </div>
      </div>
      <AuthenticationExperienceModal />
    </>
  );
}

export default App;
