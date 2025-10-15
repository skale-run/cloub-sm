import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "../lib/cn";

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
  userFullName: string;
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
}: HeaderProps) {
  const userInitials = getInitials(userFullName);
  const { t, i18n } = useTranslation("header");
  const isRTL = i18n.dir() === "rtl";
  const CollapseIcon = isRTL ? ChevronRight : ChevronLeft;
  const ExpandIcon = isRTL ? ChevronLeft : ChevronRight;

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
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-900/70 via-red-800/60 to-red-700/55 text-base font-semibold uppercase tracking-wider text-red-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
