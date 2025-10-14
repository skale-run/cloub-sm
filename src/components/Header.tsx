import { CalendarDays, GaugeCircle, Menu } from "lucide-react";

const readiness = {
  label: "Readiness",
  value: "82 / 100",
  status: "Ready to push",
};

const milestone = {
  label: "Next milestone",
  title: "Continental trials heat",
  countdown: "12 days out",
};

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
};

function Header({ isSidebarOpen, onToggleSidebar, pageTitle }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-red-500/40 bg-red-950/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/60 text-red-100 transition hover:border-red-300/60 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:hidden"
            aria-label={`${isSidebarOpen ? "Close" : "Open"} navigation`}
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>

          <h1 className="text-lg font-semibold text-red-50 sm:text-xl lg:text-2xl">
            {pageTitle}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-red-100/80 lg:gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-900/60 text-red-100 shadow-inner shadow-red-900/40">
              <GaugeCircle aria-hidden className="h-5 w-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {readiness.label}
              </span>
              <span className="text-sm font-semibold text-red-50">
                {readiness.value}
              </span>
              <span className="text-xs text-red-100/70">
                {readiness.status}
              </span>
            </div>
          </div>

          <span
            className="hidden h-10 w-px bg-red-500/30 lg:block"
            aria-hidden
          />

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-900/60 text-red-100 shadow-inner shadow-red-900/40">
              <CalendarDays aria-hidden className="h-5 w-5" />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {milestone.label}
              </span>
              <span className="text-sm font-semibold text-red-50">
                {milestone.title}
              </span>
              <span className="text-xs text-red-100/70">
                {milestone.countdown}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
