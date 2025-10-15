import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("header");

  return (
    <header className="app-header sticky top-0 z-40 border-b border-red-500/40 bg-red-950/80 px-2 backdrop-blur-xl">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-3xl px-3 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center gap-3 text-red-50">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="group inline-flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-950/60 p-1.5 text-red-100 transition hover:border-red-300/60 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            aria-label={
              isSidebarOpen
                ? t("aria.toggleNavigation.close")
                : t("aria.toggleNavigation.open")
            }
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-900/60 text-red-100 transition group-hover:bg-red-900/80">
              <Menu aria-hidden className="h-5 w-5 lg:hidden" />
              {isSidebarOpen ? (
                <ChevronLeft aria-hidden className="hidden h-5 w-5 lg:block" />
              ) : (
                <ChevronRight aria-hidden className="hidden h-5 w-5 lg:block" />
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
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-red-400/30 bg-red-900/50 text-base font-semibold uppercase tracking-wider text-red-50">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
