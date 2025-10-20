import { ChevronLeft, ChevronRight, LogOut, Menu } from "lucide-react";
import { ComponentType, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/cn";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
  userFullName: string;
  hasCompletedProfile: boolean;
  onAvatarClick: () => void;
  onLogout: () => void;
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase() || "?";

type HeaderToggleButtonProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  CollapseIcon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "false" | "true";
  }>;
  ExpandIcon: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "false" | "true";
  }>;
  labels: {
    open: string;
    close: string;
  };
};

type HeaderAvatarButtonProps = {
  initials: string;
  onClick: () => void;
  ariaLabel: string;
};

type HeaderLogoutButtonProps = {
  onClick: () => void;
  label: string;
  description: string;
};

const headerContainerClasses =
  "relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-3xl px-3 py-4 sm:px-6 lg:px-8";

const actionButtonBaseClasses =
  "inline-flex items-center gap-2 rounded-2xl bg-red-900/35 px-3 py-2 text-sm font-medium text-red-100 shadow-sm ring-1 ring-inset ring-transparent transition hover:bg-red-900/60 hover:text-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-950";

const avatarButtonClasses =
  "flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-900/70 via-red-800/60 to-red-700/55 text-base font-semibold uppercase tracking-wider text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:from-red-900/80 hover:via-red-800/70 hover:to-red-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-950";

function HeaderToggleButton({
  CollapseIcon,
  ExpandIcon,
  isSidebarOpen,
  labels,
  onToggleSidebar,
}: HeaderToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggleSidebar}
      className="group inline-flex items-center gap-2 rounded-2xl bg-red-900/35 p-1.5 text-red-100 shadow-sm ring-1 ring-inset ring-transparent transition hover:bg-red-900/60 hover:text-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-950"
      aria-label={isSidebarOpen ? labels.close : labels.open}
      aria-expanded={isSidebarOpen}
      aria-controls="app-sidebar"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-950/70 via-red-900/60 to-red-800/55 text-red-100 transition group-hover:from-red-900/70 group-hover:via-red-900/65 group-hover:to-red-800/60 group-focus-visible:ring-2 group-focus-visible:ring-red-300/70 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-red-950">
        <Menu aria-hidden className="h-5 w-5 lg:hidden" />
        {isSidebarOpen ? (
          <CollapseIcon aria-hidden className="hidden h-5 w-5 lg:block" />
        ) : (
          <ExpandIcon aria-hidden className="hidden h-5 w-5 lg:block" />
        )}
      </span>
    </button>
  );
}

function HeaderAvatarButton({ ariaLabel, initials, onClick }: HeaderAvatarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={avatarButtonClasses}
      aria-label={ariaLabel}
    >
      {initials}
    </button>
  );
}

function HeaderLogoutButton({ description, label, onClick }: HeaderLogoutButtonProps) {
  return (
    <button type="button" onClick={onClick} className={actionButtonBaseClasses}>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900/40 text-red-200">
        <LogOut aria-hidden className="h-4 w-4" />
      </span>
      <span className="flex flex-col text-left">
        <span>{label}</span>
        <span className="text-xs font-normal text-red-200/70">{description}</span>
      </span>
    </button>
  );
}

function Header({
  isSidebarOpen,
  onToggleSidebar,
  pageTitle,
  userFullName,
  hasCompletedProfile,
  onAvatarClick,
  onLogout,
}: HeaderProps) {
  const userInitials = useMemo(() => getInitials(userFullName), [userFullName]);
  const { t, i18n } = useTranslation("translation", { keyPrefix: "header" });
  const isRTL = i18n.dir() === "rtl";
  const CollapseIcon = isRTL ? ChevronRight : ChevronLeft;
  const ExpandIcon = isRTL ? ChevronLeft : ChevronRight;
  const avatarAriaLabel = hasCompletedProfile
    ? t("aria.avatarNavigation.access")
    : t("aria.avatarNavigation.profile");
  const handleAvatarNavigation = useCallback(() => {
    onAvatarClick();
  }, [onAvatarClick]);

  const handleLogoutClick = useCallback(() => {
    onLogout();
  }, [onLogout]);

  const toggleButtonLabels = useMemo(
    () => ({
      open: t("aria.toggleNavigation.open"),
      close: t("aria.toggleNavigation.close"),
    }),
    [t],
  );

  return (
    <header className="app-header sticky top-0 z-40 bg-gradient-to-r from-red-950/90 via-red-900/70 to-red-950/90 px-2 shadow-lg backdrop-blur-xl">
      <div className={cn(headerContainerClasses, !isSidebarOpen ? "lg:max-w-none" : undefined)}>
        <div className="flex flex-1 items-center gap-3 text-red-50">
          <HeaderToggleButton
            CollapseIcon={CollapseIcon}
            ExpandIcon={ExpandIcon}
            isSidebarOpen={isSidebarOpen}
            labels={toggleButtonLabels}
            onToggleSidebar={onToggleSidebar}
          />
          <h1 className="text-lg font-semibold leading-tight text-red-50 sm:text-2xl">{pageTitle}</h1>
        </div>

        <div className="flex flex-none items-center gap-3 text-red-50">
          <span className="hidden text-sm font-medium text-red-100/80 sm:inline">{userFullName}</span>
          <HeaderAvatarButton
            ariaLabel={avatarAriaLabel}
            initials={userInitials}
            onClick={handleAvatarNavigation}
          />
          <HeaderLogoutButton
            description={t("menu.logoutDescription")}
            label={t("menu.logout")}
            onClick={handleLogoutClick}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
