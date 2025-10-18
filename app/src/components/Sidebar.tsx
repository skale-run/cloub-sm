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
  ShieldCheck,
  UserCircle,
  Users,
  X,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { RoutePath } from "../routes";
import { cn } from "../lib/cn";
import LanguageSwitcher from "./LanguageSwitcher";
import RedSurface from "./RedSurface";

type NavItem = {
  to: RoutePath;
  label: string;
  description: string;
  status?: "soon";
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
  "/guardian-portal": ShieldCheck,
  "/access": ScanQrCode,
};

type SidebarProps = {
  open: boolean;
  onToggleSidebar: () => void;
  onNavigate?: () => void;
  onNavigateTo: (path: RoutePath) => void;
  onPrefetchSection?: (path: RoutePath) => void;
  currentPath: RoutePath;
};

function Sidebar({
  open,
  onToggleSidebar,
  onNavigate,
  onNavigateTo,
  onPrefetchSection,
  currentPath,
}: SidebarProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const brand = t("sidebar.brand", { returnObjects: true }) as {
    name: string;
    label: string;
  };

  const navSections = useMemo<ReadonlyArray<NavSection>>(() => {
    const sections = t("sidebar.sections", { returnObjects: true }) as Array<{
      heading: string;
      items: Array<{
        to: RoutePath;
        label: string;
        description: string;
        status?: "soon";
      }>;
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

  const seasonSummary = t("sidebar.seasonSummary", {
    returnObjects: true,
  }) as { line1: string; line2: string };

  const soonLabel = t("common.badges.soon");

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
      className={cn(
        "fixed inset-y-0 z-50 lg:z-40 flex w-full max-w-sm shrink-0 flex-col overflow-hidden bg-gradient-to-b from-red-950/95 via-red-950/85 to-red-900/80 shadow-[0_30px_80px_rgba(59,9,9,0.55)] backdrop-blur-xl transition-transform duration-300 ease-out lg:max-w-none lg:w-80",
        isRTL ? "right-0" : "left-0",
        open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full",
      )}
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
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-900/40 text-red-200 shadow-sm transition hover:bg-red-900/55 hover:text-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-red-900 lg:hidden"
              onClick={onToggleSidebar}
              aria-label={t("common.navigation.close")}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
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
                  const isComingSoon = item.status === "soon";
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      onClick={(event) => {
                        if (isComingSoon) {
                          event.preventDefault();
                          return;
                        }

                        handleItemClick(event, item.to);
                      }}
                      onPointerEnter={
                        isComingSoon
                          ? undefined
                          : () => onPrefetchSection?.(item.to)
                      }
                      onFocus={
                        isComingSoon ? undefined : () => onPrefetchSection?.(item.to)
                      }
                      aria-current={isActive ? "page" : undefined}
                      aria-disabled={isComingSoon || undefined}
                      className={`group flex items-center gap-4 rounded-2xl border px-4 py-3 text-sm transition hover:border-red-400/50 hover:bg-red-950/55 hover:text-red-50 ${
                        isActive
                          ? "border-red-400/70 bg-red-950/60 text-red-50"
                          : "border-red-500/25 bg-red-950/35 text-red-100/85"
                      } ${
                        isComingSoon
                          ? "cursor-not-allowed opacity-70 hover:border-red-500/25 hover:bg-red-950/35 hover:text-red-100/85"
                          : ""
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
                        <span className="flex items-center gap-2 font-semibold">
                          {item.label}
                          {isComingSoon ? (
                            <span className="rounded-full border border-red-400/70 bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-50">
                              {soonLabel}
                            </span>
                          ) : null}
                        </span>
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

        <div className="mt-auto space-y-1 text-xs text-red-200/70">
          <p>{seasonSummary.line1}</p>
          <p className="font-semibold text-red-100">{seasonSummary.line2}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
