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

const getFirstName = (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return trimmed.split(/\s+/)[0] ?? "";
};

function Header({
  isSidebarOpen,
  onToggleSidebar,
  pageTitle,
  userFullName,
}: HeaderProps) {
  const userInitials = getInitials(userFullName);
  const firstName = getFirstName(userFullName);
  const { t, i18n } = useTranslation("header");
  const isRTL = i18n.dir() === "rtl";
  const CollapseIcon = isRTL ? ChevronRight : ChevronLeft;
  const ExpandIcon = isRTL ? ChevronLeft : ChevronRight;

  return (
    <header className="app-header sticky top-0 z-40 isolate border-b border-white/5 bg-slate-950/95 text-white backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          aria-hidden
          className="absolute left-1/2 top-[-120px] h-64 w-[620px] -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute right-10 bottom-[-160px] h-72 w-72 rounded-full bg-red-900/20 blur-3xl"
        />
      </div>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8",
          !isSidebarOpen ? "lg:max-w-none" : undefined,
        )}
      >
        <div className="flex flex-1 items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white/80 shadow-[0_20px_45px_rgba(15,23,42,0.45)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 hover:border-white/20 hover:bg-white/10 hover:text-white"
            aria-label={
              isSidebarOpen
                ? t("aria.toggleNavigation.close")
                : t("aria.toggleNavigation.open")
            }
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
          >
            <span className="absolute inset-0 rounded-2xl border border-white/10 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" />
            <Menu aria-hidden className="h-5 w-5 transition group-hover:scale-95 lg:hidden" />
            {isSidebarOpen ? (
              <CollapseIcon
                aria-hidden
                className="hidden h-5 w-5 transition group-hover:-translate-x-0.5 lg:block"
              />
            ) : (
              <ExpandIcon
                aria-hidden
                className="hidden h-5 w-5 transition group-hover:translate-x-0.5 lg:block"
              />
            )}
          </button>

          <div className="flex min-w-0 flex-col">
            <span className="text-xs font-medium uppercase tracking-[0.32em] text-white/55">
              {firstName ? `Welcome, ${firstName}` : "Club Command"}
            </span>
            <h1 className="truncate text-xl font-semibold text-white sm:text-2xl">{pageTitle}</h1>
          </div>
        </div>

        <div className="flex flex-none items-center gap-4 text-white">
          <div className="hidden shrink-0 text-right sm:flex sm:flex-col">
            <span className="truncate text-sm font-semibold text-white/90">{userFullName}</span>
            <span className="text-xs text-white/55">Active member</span>
          </div>
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-red-500/90 via-red-600 to-red-700 text-base font-semibold uppercase tracking-wide text-red-50 shadow-[0_20px_45px_rgba(15,23,42,0.45)] ring-1 ring-white/15">
            <span>{userInitials}</span>
            <span className="pointer-events-none absolute inset-[2px] rounded-[18px] border border-white/15" aria-hidden />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
