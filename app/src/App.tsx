import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useTranslation } from "react-i18next";
import AuthenticationExperienceModal from "./features/auth/AuthenticationExperienceModal";
import { useAthletePortalModal } from "./features/auth/AthletePortalModalContext";
import { useMember, type Member } from "./features/auth/MemberContext";
import { emptyProfile, type Profile } from "./features/profile/profileTypes";
import {
  type Achievement,
  type AchievementDraft,
} from "./features/profile/achievementTypes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { cn } from "./lib/cn";
import { lazyWithPreload } from "./lib/lazyWithPreload";
import { defaultPath, normalizePath, type RoutePath } from "./routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/v1";

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
const GuardianPortalSection = lazyWithPreload(
  () => import("./features/guardian/GuardianPortalSection"),
);
const AccessSection = lazyWithPreload(
  () => import("./features/access/AccessSection"),
);

const pageTitleKeyMap = {
  "/calendar": "calendar",
  "/academic-record": "academicRecord",
  "/billing": "billing",
  "/training-attendance": "trainingAttendance",
  "/coach-evaluation": "coachEvaluation",
  "/progress-overview": "progressOverview",
  "/performance-tracking": "performanceTracking",
  "/profile": "profile",
  "/guardian-portal": "guardianPortal",
  "/access": "access",
} satisfies Record<RoutePath, string>;

const dashboardSectionLoaders: Partial<
  Record<RoutePath, { preload?: () => Promise<unknown> }>
> = {
  "/calendar": CalendarSection,
  "/academic-record": AcademicRecordSection,
  "/billing": BillingSection,
  "/training-attendance": TrainingAttendanceSection,
  "/coach-evaluation": CoachEvaluationSection,
  "/progress-overview": ProgressOverviewSection,
  "/performance-tracking": PerformanceTrackingSection,
  "/profile": ProfileSection,
  "/guardian-portal": GuardianPortalSection,
  "/access": AccessSection,
};

function memberToProfile(member: Member): Profile {
  return {
    fullName: member.fullName,
    role: member.role ?? "",
    squad: member.squad ?? "",
    email: member.email,
    emergencyContact: member.emergencyContact ?? "",
    membershipId: member.membershipId ?? "",
    profileImage: member.profilePhotoUrl ?? "",
  };
}

function trimProfile(profile: Profile): Profile {
  return {
    fullName: profile.fullName.trim(),
    role: profile.role.trim(),
    squad: profile.squad.trim(),
    email: profile.email.trim(),
    emergencyContact: profile.emergencyContact.trim(),
    membershipId: profile.membershipId.trim(),
    profileImage: profile.profileImage.trim(),
  };
}

function SectionFallback({ label }: { label: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-red-500/30 bg-red-950/40 p-10 text-sm text-red-100/80">
      {label}
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const { open: openAthletePortalModal } = useAthletePortalModal();
  const { member, authToken, setMember, clearMember } = useMember();

  const isRTL = i18n.dir() === "rtl";

  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window === "undefined") {
      return defaultPath;
    }

    return normalizePath(window.location.pathname);
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState<Profile>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<AchievementDraft>({
    title: "",
    category: "tournament",
  });

  const prefetchedPathsRef = useRef(new Set<RoutePath>());

  useEffect(() => {
    if (!member) {
      setSavedProfile(null);
      setProfileDraft(emptyProfile);
      return;
    }

    setSavedProfile(memberToProfile(member));
    setProfileDraft(memberToProfile(member));
  }, [member]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const pageTitleKey =
    pageTitleKeyMap[currentPath] ?? pageTitleKeyMap[defaultPath];
  const pageTitle = t(`app.pageTitles.${pageTitleKey}`);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    if (!member) {
      openAthletePortalModal("login");
    }
  }, [member, openAthletePortalModal]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.location.pathname !== currentPath) {
      window.history.replaceState({ path: currentPath }, "", currentPath);
    }
  }, [currentPath]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((previous) => !previous);
  }, []);

  const handleNavigateTo = useCallback((path: RoutePath) => {
    const nextPath = normalizePath(path);
    setCurrentPath(nextPath);

    if (typeof window !== "undefined") {
      window.history.pushState({ path: nextPath }, "", nextPath);
    }
  }, []);

  const hasCompletedProfile = useMemo(() => {
    if (!savedProfile) {
      return false;
    }

    const trimmedProfile = trimProfile(savedProfile);
    return Boolean(trimmedProfile.fullName && trimmedProfile.membershipId);
  }, [savedProfile]);

  const handleAvatarClick = useCallback(() => {
    const destination: RoutePath = hasCompletedProfile ? "/access" : "/profile";
    handleNavigateTo(destination);
  }, [handleNavigateTo, hasCompletedProfile]);

  const prefetchSection = useCallback((path: RoutePath) => {
    if (prefetchedPathsRef.current.has(path)) {
      return;
    }

    const loader = dashboardSectionLoaders[path];
    loader?.preload?.();
    prefetchedPathsRef.current.add(path);
  }, []);

  const handleProfileChange = useCallback(
    (key: keyof Profile, value: string) => {
      setProfileDraft((previous) => ({ ...previous, [key]: value }));
      setStatusMessage("");
    },
    [],
  );

  const handleResetProfile = useCallback(() => {
    if (savedProfile) {
      setProfileDraft(savedProfile);
      setStatusMessage(t("app.statusMessages.reverted"));
    } else {
      setProfileDraft(emptyProfile);
      setStatusMessage(t("app.statusMessages.cleared"));
    }
  }, [savedProfile, t]);

  const handleDeleteProfile = useCallback(() => {
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
          headers: authToken
            ? { Authorization: `Bearer ${authToken}` }
            : undefined,
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            clearMember();
          }

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
  }, [authToken, clearMember, member, t]);

  const handleNewAchievementChange = useCallback(
    <K extends keyof AchievementDraft>(key: K, value: AchievementDraft[K]) => {
      setNewAchievement((previous) => ({ ...previous, [key]: value }));
    },
    [],
  );

  const handleAddAchievement = useCallback(() => {
    const trimmed = newAchievement.title.trim();
    if (!trimmed) {
      return;
    }

    const identifier = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setAchievements((previous) => [
      {
        id: identifier,
        title: trimmed,
        category: newAchievement.category,
        verified: false,
      },
      ...previous,
    ]);
    setNewAchievement((previous) => ({ ...previous, title: "" }));
  }, [newAchievement]);

  const handleRemoveAchievement = useCallback((id: string) => {
    setAchievements((previous) =>
      previous.filter((achievement) => achievement.id !== id),
    );
  }, []);

  const handleSaveProfile = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setStatusMessage("");

      const trimmedProfile = trimProfile(profileDraft);
      const hasRequiredFields =
        trimmedProfile.fullName.length > 0 &&
        trimmedProfile.membershipId.length > 0;

      if (!hasRequiredFields) {
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
              ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
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

          const payload = (await response.json().catch(() => null)) as {
            member?: Member;
            error?: string;
          } | null;

          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              clearMember();
              setStatusMessage(t("app.statusMessages.saveError"));
              return;
            }

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
          setSavedProfile(memberToProfile(payload.member));
          setStatusMessage(t("app.statusMessages.saved"));
        } catch (error) {
          console.error("Failed to save member profile", error);
          setStatusMessage(t("app.statusMessages.saveError"));
        }
      })();
    },
    [authToken, clearMember, member, profileDraft, setMember, t],
  );

  const fallbackMessage = t("common.loading", { defaultValue: "Loading…" });
  const connectedUserName =
    savedProfile?.fullName.trim() ||
    profileDraft.fullName.trim() ||
    t("app.defaults.teamMember");

  const renderSection = () => {
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
            onNewAchievementChange={handleNewAchievementChange}
            onAddAchievement={handleAddAchievement}
            onRemoveAchievement={handleRemoveAchievement}
          />
        );
      case "/access":
        return <AccessSection savedProfile={savedProfile} />;
      case "/guardian-portal":
        return <GuardianPortalSection />;
      default:
        return <CalendarSection />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full text-red-50">
      <Sidebar
        open={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onNavigateTo={handleNavigateTo}
        onPrefetchSection={prefetchSection}
        currentPath={currentPath}
      />
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col transition-[padding] duration-300",
          isSidebarOpen
            ? isRTL
              ? "lg:pr-80"
              : "lg:pl-80"
            : isRTL
              ? "lg:pr-0"
              : "lg:pl-0",
        )}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
          userFullName={connectedUserName}
          hasCompletedProfile={hasCompletedProfile}
          onAvatarClick={handleAvatarClick}
        />
        <main className="relative flex-1 overflow-y-auto px-4 pb-16 pt-6 sm:px-6 lg:px-10">
          <div
            className={cn(
              "mx-auto flex w-full flex-col gap-6",
              isSidebarOpen ? "max-w-6xl" : "max-w-none",
            )}
          >
            <Suspense fallback={<SectionFallback label={fallbackMessage} />}>
              {renderSection()}
            </Suspense>
          </div>
        </main>
      </div>
      <AuthenticationExperienceModal isCloseDisabled={!member} />
    </div>
  );
}

export default App;
