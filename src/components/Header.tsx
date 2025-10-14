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

const highlightCards = [
  {
    id: "readiness",
    icon: GaugeCircle,
    label: readiness.label,
    value: readiness.value,
    description: readiness.status,
    badge: false,
  },
  {
    id: "milestone",
    icon: CalendarDays,
    label: milestone.label,
    value: milestone.title,
    description: milestone.countdown,
    badge: true,
  },
];

type HeaderProps = {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  pageTitle: string;
};

function Header({ isSidebarOpen, onToggleSidebar, pageTitle }: HeaderProps) {
  return (
    <header className="app-header sticky top-0 z-40 border-b border-red-500/40 bg-red-950/80 px-2 backdrop-blur-xl">
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-5 rounded-3xl px-3 py-4 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-1 items-center gap-3 text-red-50">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-950/60 text-red-100 transition hover:border-red-300/60 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:hidden"
            aria-label={`${isSidebarOpen ? "Close" : "Open"} navigation`}
            aria-expanded={isSidebarOpen}
            aria-controls="app-sidebar"
          >
            <Menu aria-hidden className="h-5 w-5" />
          </button>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-red-200/70">Mission Control</span>
            <h1 className="text-lg font-semibold leading-tight text-red-50 sm:text-2xl">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="grid w-full gap-3 text-sm text-red-100/80 sm:grid-cols-2 lg:max-w-2xl lg:gap-4">
          {highlightCards.map(({ id, icon: Icon, label, value, description, badge }) => (
            <article
              key={id}
              className="group relative flex items-center gap-4 rounded-2xl border border-red-500/20 bg-red-900/40 px-4 py-3 shadow-[0_1px_0_rgba(255,255,255,0.04)] transition hover:border-red-300/40 hover:bg-red-900/55"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-950/60 text-red-100 shadow-inner shadow-red-900/40 transition group-hover:text-red-50">
                <Icon aria-hidden className="h-5 w-5" />
              </span>

              <dl className="flex flex-1 flex-col gap-2 text-left">
                <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-red-200/70">
                  {label}
                </dt>
                <dd className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-red-50">{value}</span>
                  {badge ? (
                    <span className="inline-flex w-fit items-center gap-1 rounded-full border border-red-400/30 bg-red-900/60 px-2 py-1 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-red-100/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-300/90" aria-hidden />
                      {description}
                    </span>
                  ) : (
                    <span className="text-xs text-red-100/70">{description}</span>
                  )}
                </dd>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
