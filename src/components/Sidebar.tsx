import type { MouseEvent } from "react";
import {
  Activity,
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  GaugeCircle,
  GraduationCap,
  LineChart,
  ScanQrCode,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import type { RoutePath } from "../routes";
import RedSurface from "./RedSurface";

type NavItem = {
  to: RoutePath;
  label: string;
  description: string;
  Icon: typeof Activity;
};

type NavSection = {
  heading: string;
  items: ReadonlyArray<NavItem>;
};

const navSections: ReadonlyArray<NavSection> = [
  {
    heading: "Calendar",
    items: [
      {
        to: "/calendar",
        label: "Season calendar",
        description: "Review meets and key sessions",
        Icon: CalendarDays,
      },
    ],
  },
  {
    heading: "Information",
    items: [
      {
        to: "/academic-record",
        label: "Academic record",
        description: "Monitor course eligibility",
        Icon: GraduationCap,
      },
      {
        to: "/billing",
        label: "Billing overview",
        description: "Track invoices & payments",
        Icon: CreditCard,
      },
      {
        to: "/training-attendance",
        label: "Training attendance",
        description: "See check-ins by week",
        Icon: ClipboardCheck,
      },
    ],
  },
  {
    heading: "Evaluations",
    items: [
      {
        to: "/coach-evaluation",
        label: "Coach evaluation",
        description: "Latest staff feedback",
        Icon: Users,
      },
      {
        to: "/progress-overview",
        label: "Progress insight",
        description: "Growth trends & alerts",
        Icon: LineChart,
      },
    ],
  },
  {
    heading: "Performance tracking",
    items: [
      {
        to: "/performance-tracking",
        label: "Performance dashboard",
        description: "Technical milestones & load",
        Icon: GaugeCircle,
      },
    ],
  },
  {
    heading: "Profile & access",
    items: [
      {
        to: "/profile",
        label: "Athlete profile",
        description: "Manage member identity",
        Icon: UserCircle,
      },
      {
        to: "/access",
        label: "Digital access",
        description: "Share membership QR code",
        Icon: ScanQrCode,
      },
    ],
  },
];

const readinessHighlights = [
  { label: "Readiness", value: "82% · Primed" },
  { label: "Sleep score", value: "7h 10m" },
  { label: "Hydration", value: "On target" },
];

type SidebarProfile = {
  fullName: string;
  role: string;
  squad: string;
  membershipId: string;
};

type SidebarProps = {
  open: boolean;
  onToggleSidebar: () => void;
  onNavigate?: () => void;
  onNavigateTo: (path: RoutePath) => void;
  currentPath: RoutePath;
  savedProfile: SidebarProfile | null;
};

function Sidebar({
  open,
  onToggleSidebar,
  onNavigate,
  onNavigateTo,
  currentPath,
  savedProfile,
}: SidebarProps) {
  const memberDetails = savedProfile
    ? (
        [
          {
            label: "Role",
            value: savedProfile.role,
            fallback: "Assign a role",
          },
          {
            label: "Squad",
            value: savedProfile.squad,
            fallback: "Update squad to personalise drills",
          },
          {
            label: "Membership ID",
            value: savedProfile.membershipId,
            fallback: "Pending assignment",
          },
        ] as const
      )
    : [];

  const incompleteDetails = memberDetails.filter(
    (detail) => !detail.value || detail.value.trim().length === 0,
  );

  const handleNavigate = () => {
    if (open) {
      onNavigate?.();
    }
  };

  const handleItemClick = (
    event: MouseEvent<HTMLAnchorElement>,
    path: RoutePath,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigateTo(path);
    handleNavigate();
  };

  return (
    <aside
      id="app-sidebar"
      className={`fixed inset-y-0 left-0 z-40 flex w-full max-w-sm shrink-0 flex-col overflow-hidden border-r border-red-500/35 bg-red-950/90 shadow-[0_35px_90px_rgba(127,29,29,0.45)] backdrop-blur transition-transform duration-300 ease-out ${
        open ? "translate-x-0" : "-translate-x-full"
      } lg:max-w-none lg:w-80`}
      aria-label="Primary navigation"
    >
      <div className="flex h-full flex-col gap-8 overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 via-red-500/10 to-transparent text-red-200">
              <Activity className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-red-50">
                Wydad Taekwondo 
              </p>
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                Dashboard
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-500/40 text-red-200 transition hover:border-red-400/70 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <section className="space-y-5" aria-label="Navigation">
          {navSections.map((section) => (
            <div key={section.heading} className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-200/70">
                {section.heading}
              </p>
              <nav className="grid gap-2">
                {section.items.map((item) => {
                  const isActive = currentPath === item.to;
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      onClick={(event) => handleItemClick(event, item.to)}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-center gap-4 rounded-2xl border px-4 py-3 text-sm transition hover:border-red-400/50 hover:bg-red-950/55 hover:text-red-50 ${
                        isActive
                          ? "border-red-400/70 bg-red-950/60 text-red-50"
                          : "border-red-500/25 bg-red-950/35 text-red-100/85"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl text-red-200 transition-colors group-hover:bg-red-500/15 ${
                          isActive
                            ? "bg-red-500/20 text-red-100"
                            : "bg-red-950/55"
                        }`}
                      >
                        <item.Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold">{item.label}</span>
                        <span className="text-xs text-red-200/70">
                          {item.description}
                        </span>
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}
        </section>

        <section className="space-y-4" aria-label="Readiness overview">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200/70">
            Today&apos;s readiness
          </p>
          <ul className="grid gap-3">
            {readinessHighlights.map((item) => (
              <RedSurface
                as="li"
                tone="glass"
                key={item.label}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-red-50"
              >
                <span className="text-xs uppercase tracking-wide text-red-200/70">
                  {item.label}
                </span>
                <span className="font-semibold text-red-50">{item.value}</span>
              </RedSurface>
            ))}
          </ul>
        </section>

        <RedSurface
          as="section"
          tone="muted"
          className="space-y-4 p-5"
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200/70">
            Member snapshot
          </p>
          {savedProfile ? (
            <div className="space-y-4 text-red-50">
              <div className="relative overflow-hidden rounded-3xl border border-red-400/30 bg-gradient-to-br from-red-600/20 via-red-500/10 to-red-950/65 p-5 shadow-[0_18px_45px_rgba(127,29,29,0.35)]">
                <span className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-red-500/25 blur-3xl" />
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-950/60 text-red-100">
                      <UserCircle aria-hidden className="h-6 w-6" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-red-200/70">
                        Member card
                      </span>
                      <span className="text-lg font-semibold text-red-50">
                        {savedProfile.fullName}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-100">
                    Active
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-red-200/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 font-medium text-red-100">
                    <span className="text-red-200/70">ID</span>
                    <span className="tracking-wide text-red-50">
                      {savedProfile.membershipId || "Pending assignment"}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 text-red-200/80">
                    <span className="text-red-200/60">Role</span>
                    <span className="font-medium text-red-100">
                      {savedProfile.role || "Assign a role"}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 text-red-200/80">
                    <span className="text-red-200/60">Squad</span>
                    <span className="font-medium text-red-100">
                      {savedProfile.squad || "Update squad"}
                    </span>
                  </span>
                </div>
                <dl className="mt-5 grid gap-3 text-sm text-red-100">
                  {memberDetails.map((detail) => {
                    const hasValue = Boolean(
                      detail.value && detail.value.trim().length > 0,
                    );

                    return (
                      <div
                        key={detail.label}
                        className="flex items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-950/45 px-4 py-3"
                      >
                        <dt className="text-xs uppercase tracking-wide text-red-200/70">
                          {detail.label}
                        </dt>
                        <dd className={`text-right ${hasValue ? "text-red-100" : "text-red-200/55"}`}>
                          {hasValue ? detail.value : detail.fallback}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
              <div className="flex items-start gap-2 rounded-2xl border border-red-400/20 bg-red-950/45 px-4 py-3 text-xs text-red-200/75">
                <span className="mt-0.5 inline-flex h-2 w-2 flex-none rounded-full bg-red-400/70" />
                <span>
                  {incompleteDetails.length === 0
                    ? "Profile complete — coaches can access the latest details."
                    : `Next update: ${incompleteDetails[0].label.toLowerCase()}.`}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-red-100/75">
              Save your athlete profile to unlock tailored navigation insights.
            </p>
          )}
        </RedSurface>

        <div className="mt-auto space-y-1 text-xs text-red-200/70">
          <p>Season 2025 · Wave 2 Squad</p>
          <p className="font-semibold text-red-100">
            Next rest day: Sun, 20 Apr
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
