import type { MouseEvent } from "react";
import { useMemo } from "react";
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
import { useTranslation } from "react-i18next";
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

const iconMap: Record<RoutePath, typeof Activity> = {
  "/calendar": CalendarDays,
  "/academic-record": GraduationCap,
  "/billing": CreditCard,
  "/training-attendance": ClipboardCheck,
  "/coach-evaluation": Users,
  "/progress-overview": LineChart,
  "/performance-tracking": GaugeCircle,
  "/profile": UserCircle,
  "/access": ScanQrCode,
};

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
  const { t } = useTranslation();
  const brand = t("sidebar.brand", { returnObjects: true }) as {
    name: string;
    label: string;
  };

  const navSections = useMemo<ReadonlyArray<NavSection>>(() => {
    const sections = t("sidebar.sections", { returnObjects: true }) as Array<{
      heading: string;
      items: Array<{ to: RoutePath; label: string; description: string }>;
    }>;

    return sections.map((section) => ({
      heading: section.heading,
      items: section.items.map((item) => ({
        ...item,
        Icon: iconMap[item.to] ?? Activity,
      })),
    }));
  }, [t]);

  const readinessHeading = t("sidebar.readinessHeading");
  const readinessHighlights = t("sidebar.readinessHighlights", {
    returnObjects: true,
  }) as Array<{ label: string; value: string }>;

  const memberSnapshot = t("sidebar.memberSnapshot", {
    returnObjects: true,
  }) as {
    heading: string;
    memberCard: {
      label: string;
      status: string;
      idLabel: string;
      roleLabel: string;
      squadLabel: string;
    };
    details: {
      role: { label: string; fallback: string };
      squad: { label: string; fallback: string };
      membershipId: { label: string; fallback: string };
    };
    complete: string;
    nextUpdate: string;
    emptyState: string;
  };

  const seasonSummary = t("sidebar.seasonSummary", {
    returnObjects: true,
  }) as { line1: string; line2: string };

  const memberDetails = savedProfile
    ? (
        [
          {
            label: memberSnapshot.details.role.label,
            value: savedProfile.role,
            fallback: memberSnapshot.details.role.fallback,
          },
          {
            label: memberSnapshot.details.squad.label,
            value: savedProfile.squad,
            fallback: memberSnapshot.details.squad.fallback,
          },
          {
            label: memberSnapshot.details.membershipId.label,
            value: savedProfile.membershipId,
            fallback: memberSnapshot.details.membershipId.fallback,
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
      aria-label={t("common.navigation.primary")}
    >
      <div className="flex h-full flex-col gap-8 overflow-y-auto p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/30 via-red-500/10 to-transparent text-red-200">
              <Activity className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-red-50">{brand.name}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-red-200/70">
                {brand.label}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-500/40 text-red-200 transition hover:border-red-400/70 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 lg:hidden"
            onClick={onToggleSidebar}
            aria-label={t("common.navigation.close")}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <section className="space-y-5" aria-label={t("common.navigation.primary")}>
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
            {readinessHeading}
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
            {memberSnapshot.heading}
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
                        {memberSnapshot.memberCard.label}
                      </span>
                      <span className="text-lg font-semibold text-red-50">
                        {savedProfile.fullName}
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-950/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-100">
                    {memberSnapshot.memberCard.status}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-red-200/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 font-medium text-red-100">
                    <span className="text-red-200/70">{memberSnapshot.memberCard.idLabel}</span>
                    <span className="tracking-wide text-red-50">
                      {savedProfile.membershipId || memberSnapshot.details.membershipId.fallback}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 text-red-200/80">
                    <span className="text-red-200/60">{memberSnapshot.memberCard.roleLabel}</span>
                    <span className="font-medium text-red-100">
                      {savedProfile.role || memberSnapshot.details.role.fallback}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-950/50 px-3 py-1 text-red-200/80">
                    <span className="text-red-200/60">{memberSnapshot.memberCard.squadLabel}</span>
                    <span className="font-medium text-red-100">
                      {savedProfile.squad || memberSnapshot.details.squad.fallback}
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
                    ? memberSnapshot.complete
                    : memberSnapshot.nextUpdate.replace(
                        "{{field}}",
                        incompleteDetails[0].label.toLowerCase(),
                      )}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-red-100/75">
              {memberSnapshot.emptyState}
            </p>
          )}
        </RedSurface>

        <div className="mt-auto space-y-1 text-xs text-red-200/70">
          <p>{seasonSummary.line1}</p>
          <p className="font-semibold text-red-100">{seasonSummary.line2}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
