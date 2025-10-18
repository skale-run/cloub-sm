import { ChevronLeft, ChevronRight, LogOut, Menu } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  const { t, i18n } = useTranslation("header");
  const isRTL = i18n.dir() === "rtl";
  const CollapseIcon = isRTL ? ChevronRight : ChevronLeft;
  const ExpandIcon = isRTL ? ChevronLeft : ChevronRight;
  const avatarAriaLabel = hasCompletedProfile
    ? t("aria.avatarNavigation.access")
    : t("aria.avatarNavigation.profile");
  const primaryMenuLabel = hasCompletedProfile
    ? t("menu.access")
    : t("menu.profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((focusButton = false) => {
    setIsMenuOpen(false);

    if (focusButton) {
      avatarButtonRef.current?.focus();
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((previous) => !previous);
  }, []);

  const handleAvatarNavigation = useCallback(() => {
    onAvatarClick();
    closeMenu();
  }, [closeMenu, onAvatarClick]);

  const handleLogoutClick = useCallback(() => {
    onLogout();
    closeMenu();
  }, [closeMenu, onLogout]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <header className="app-header sticky top-0 z-40 bg-gradient-to-r from-red-950/90 via-red-900/70 to-red-950/90 px-2 shadow-lg backdrop-blur-xl">
      <div
        className={cn(
          "relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-3xl px-3 py-4 sm:px-6 lg:px-8",
          !isSidebarOpen ? "lg:max-w-none" : undefined,
        )}
      >
        <div className="flex flex-1 items-center gap-3 text-red-50">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="group inline-flex items-center gap-2 rounded-2xl bg-red-900/35 p-1.5 text-red-100 shadow-sm ring-1 ring-inset ring-transparent transition hover:bg-red-900/60 hover:text-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-950"
            aria-label={
              isSidebarOpen
                ? t("aria.toggleNavigation.close")
                : t("aria.toggleNavigation.open")
            }
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
          <h1 className="text-lg font-semibold leading-tight text-red-50 sm:text-2xl">
            {pageTitle}
          </h1>
        </div>

        <div className="flex flex-none items-center gap-3 text-red-50">
          <span className="hidden text-sm font-medium text-red-100/80 sm:inline">
            {userFullName}
          </span>
          <div className="relative" ref={menuContainerRef}>
            <button
              type="button"
              onClick={toggleMenu}
              ref={avatarButtonRef}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-900/70 via-red-800/60 to-red-700/55 text-base font-semibold uppercase tracking-wider text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:from-red-900/80 hover:via-red-800/70 hover:to-red-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-950"
              aria-label={avatarAriaLabel}
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
            >
              {userInitials}
            </button>
            {isMenuOpen ? (
              <div
                role="menu"
                aria-label={t("menu.label")}
                className="absolute right-0 mt-3 w-48 overflow-hidden rounded-3xl border border-red-800/40 bg-red-950/95 p-1 shadow-xl shadow-red-900/50 backdrop-blur-xl"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleAvatarNavigation}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-medium text-red-100 transition hover:bg-red-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900/40 text-xs font-semibold uppercase tracking-wide text-red-50">
                    {userInitials}
                  </span>
                  <div className="flex flex-col">
                    <span>{primaryMenuLabel}</span>
                    <span className="text-xs font-normal text-red-200/70">
                      {hasCompletedProfile
                        ? t("menu.accessDescription")
                        : t("menu.profileDescription")}
                    </span>
                  </div>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogoutClick}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm font-medium text-red-100 transition hover:bg-red-900/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/70"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-900/40 text-red-200">
                    <LogOut aria-hidden className="h-4 w-4" />
                  </span>
                  <div className="flex flex-col">
                    <span>{t("menu.logout")}</span>
                    <span className="text-xs font-normal text-red-200/70">
                      {t("menu.logoutDescription")}
                    </span>
                  </div>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
