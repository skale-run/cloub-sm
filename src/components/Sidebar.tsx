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
import { cn } from "../lib/cn";
import RedSurface from "./RedSurface";
import "./Sidebar.css";

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
      className={cn("app-sidebar", open && "app-sidebar--open")}
      aria-label="Primary navigation"
      aria-hidden={!open}
    >
      <div className="app-sidebar__brand">
        <div className="app-sidebar__identity">
          <span className="app-sidebar__logo">
            <Activity aria-hidden size={26} />
          </span>
          <div className="app-sidebar__title">
            <p className="app-sidebar__title-main">Club Section Manager</p>
            <p className="app-sidebar__title-sub">Athlete Command Hub</p>
          </div>
        </div>
        <button
          type="button"
          className="app-sidebar__close"
          onClick={onToggleSidebar}
          aria-label="Close navigation"
        >
          <X aria-hidden size={18} />
        </button>
      </div>

      <section className="app-sidebar__section" aria-label="Navigation">
        {navSections.map((section) => (
          <div key={section.heading} className="app-sidebar__section">
            <p className="app-sidebar__heading">{section.heading}</p>
            <nav className="app-sidebar__nav">
              {section.items.map((item) => {
                const isActive = currentPath === item.to;
                return (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={(event) => handleItemClick(event, item.to)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "app-sidebar__link",
                      isActive && "app-sidebar__link--active",
                    )}
                  >
                    <span className="app-sidebar__link-icon">
                      <item.Icon aria-hidden size={20} />
                    </span>
                    <span className="app-sidebar__link-content">
                      <span className="app-sidebar__link-label">
                        {item.label}
                      </span>
                      <span className="app-sidebar__link-description">
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

      <section aria-label="Readiness overview" className="app-sidebar__section">
        <p className="app-sidebar__heading">Today&apos;s readiness</p>
        <ul className="sidebar-readiness__list">
          {readinessHighlights.map((item) => (
            <RedSurface
              as="li"
              tone="glass"
              key={item.label}
              className="sidebar-readiness__card"
            >
              <span className="sidebar-readiness__label">{item.label}</span>
              <span className="sidebar-readiness__value">{item.value}</span>
            </RedSurface>
          ))}
        </ul>
      </section>

      <RedSurface
        as="section"
        tone="muted"
        className="sidebar-snapshot"
        aria-live="polite"
      >
        <p className="app-sidebar__heading">Member snapshot</p>
        {savedProfile ? (
          <dl className="sidebar-snapshot__list">
            <div>
              <dt>Member</dt>
              <dd>{savedProfile.fullName}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{savedProfile.role || "Assign a role"}</dd>
            </div>
            <div>
              <dt>Squad</dt>
              <dd>{
                savedProfile.squad || "Update squad to personalise drills"
              }</dd>
            </div>
            <div>
              <dt>ID</dt>
              <dd>{savedProfile.membershipId}</dd>
            </div>
          </dl>
        ) : (
          <p>
            Save your athlete profile to unlock tailored navigation insights.
          </p>
        )}
      </RedSurface>

      <div className="app-sidebar__footer">
        <span>Season 2025 · Wave 2 Squad</span>
        <span className="app-sidebar__footer-strong">
          Next rest day: Sun, 20 Apr
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;
