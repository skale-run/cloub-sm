import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { useTranslation } from "react-i18next";
import AuthenticationExperienceModal from "./features/auth/AuthenticationExperienceModal";
import { useAthletePortalModal } from "./features/auth/AthletePortalModalContext";
import { useMember, type Member } from "./features/auth/MemberContext";
import LandingPage from "./features/landing/LandingPage";
import { emptyProfile, type Profile } from "./features/profile/profileTypes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { cn } from "./lib/cn";
import { lazyWithPreload } from "./lib/lazyWithPreload";
import {
  defaultPath,
  landingPath,
  normalizePath,
  type RoutePath,
} from "./routes";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

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

const pageTitleKeyMap = {
  "/": "landing",
  "/calendar": "calendar",
  "/academic-record": "academicRecord",
  "/billing": "billing",
  "/training-attendance": "trainingAttendance",
  "/coach-evaluation": "coachEvaluation",
  "/progress-overview": "progressOverview",
  "/performance-tracking": "performanceTracking",
  "/profile": "profile",
  "/access": "access",
} satisfies Record<RoutePath, string>;

const dashboardSectionLoaders: Partial<
  Record<Exclude<RoutePath, typeof landingPath>, { preload?: () => Promise<unknown> }>
> = {
  "/calendar": CalendarSection,
  "/academic-record": AcademicRecordSection,
  "/billing": BillingSection,
  "/training-attendance": TrainingAttendanceSection,
  "/coach-evaluation": CoachEvaluationSection,
  "/progress-overview": ProgressOverviewSection,
  "/performance-tracking": PerformanceTrackingSection,
  "/profile": ProfileSection,
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
      return landingPath;
    }

    return normalizePath(window.location.pathname);
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState<Profile>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<Profile | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState("");

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

  const pageTitleKey = pageTitleKeyMap[currentPath] ?? pageTitleKeyMap[defaultPath];
  const pageTitle = t(`app.pageTitles.${pageTitleKey}`);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.title = pageTitle;
  }, [pageTitle]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((previous) => !previous);
  }, []);

  const handleNavigateTo = useCallback((path: RoutePath) => {
    const nextPath = path === landingPath ? landingPath : normalizePath(path);
    setCurrentPath(nextPath);

    if (typeof window !== "undefined") {
      window.history.pushState({ path: nextPath }, "", nextPath);
    }
  }, []);

  const handleSidebarNavigate = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const prefetchSection = useCallback((path: RoutePath) => {
    if (path === landingPath || prefetchedPathsRef.current.has(path)) {
      return;
    }

    const loader = dashboardSectionLoaders[path as Exclude<RoutePath, typeof landingPath>];
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

  const handleAddAchievement = useCallback(() => {
    const trimmed = newAchievement.trim();
    if (!trimmed) {
      return;
    }

    setAchievements((previous) => [trimmed, ...previous]);
    setNewAchievement("");
  }, [newAchievement]);

  const handleRemoveAchievement = useCallback((index: number) => {
    setAchievements((previous) => previous.filter((_, idx) => idx !== index));
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

          const payload = (await response.json().catch(() => null)) as
            | { member?: Member; error?: string }
            | null;

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

  const isLandingPage = currentPath === landingPath;
  const fallbackMessage = t("common.loading", { defaultValue: "Loading…" });
  const connectedUserName =
    savedProfile?.fullName.trim() ||
    profileDraft.fullName.trim() ||
    t("app.defaults.teamMember");

  const handleContactClick = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }

    const contactSection = document.getElementById("landing-contact");
    contactSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (isLandingPage) {
    return (
      <>
        <LandingPage
          onSignup={() => openAthletePortalModal("register")}
          onLogin={() => openAthletePortalModal("login")}
          onContact={handleContactClick}
        />
        <AuthenticationExperienceModal />
      </>
    );
  }

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
  };

  return (
    <div className="relative flex min-h-screen w-full text-red-50">
      <Sidebar
        open={isSidebarOpen}
        onToggleSidebar={toggleSidebar}
        onNavigate={handleSidebarNavigate}
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
      <AuthenticationExperienceModal />
    </div>
  );
}

export default App;
