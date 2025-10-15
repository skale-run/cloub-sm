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
import { cn } from "../lib/cn";
import LanguageSwitcher from "./LanguageSwitcher";

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
        "fixed inset-y-0 z-50 lg:z-40 flex w-full max-w-sm shrink-0 flex-col overflow-hidden border-r border-white/5 bg-slate-950/95 text-slate-100 shadow-[0_20px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-300 ease-out lg:max-w-none lg:w-80",
        isRTL ? "right-0" : "left-0",
        open ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full",
      )}
      aria-label={t("common.navigation.primary")}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="flex items-center justify-between gap-3 border-b border-white/5 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 via-red-500/10 to-transparent text-red-200">
              <Activity className="h-5 w-5" aria-hidden />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white/90">{brand.name}</p>
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                {brand.label}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 lg:hidden"
              onClick={onToggleSidebar}
              aria-label={t("common.navigation.close")}
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-8 px-6 py-6">
          <section className="space-y-6" aria-label={t("common.navigation.primary")}>
            {navSections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">
                  {section.heading}
                </p>
                <nav className="space-y-2">
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
                        className={cn(
                          "group relative flex items-start gap-3 rounded-2xl border border-white/5 bg-white/0 px-4 py-3 text-sm transition-colors",
                          isActive
                            ? "border-red-400/60 bg-red-500/10 text-white shadow-lg shadow-red-900/30"
                            : "text-white/80 hover:border-red-400/40 hover:bg-red-500/5 hover:text-white",
                          isComingSoon &&
                            "cursor-not-allowed opacity-60 hover:border-white/5 hover:bg-white/0 hover:text-white/80",
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base transition-colors",
                            isActive
                              ? "bg-red-500/25 text-red-100"
                              : "bg-white/5 text-white/70 group-hover:bg-red-500/20 group-hover:text-red-100",
                          )}
                        >
                          <item.Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="flex flex-1 flex-col gap-1">
                          <span className="flex items-center gap-2 text-sm font-semibold">
                            {item.label}
                            {isComingSoon ? (
                              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                                {soonLabel}
                              </span>
                            ) : null}
                          </span>
                          <span className="text-xs leading-relaxed text-white/55">
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
            <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
              {readinessHeading}
            </div>
            <ul className="space-y-3">
              {readinessHighlights.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3 text-sm text-white/80"
                >
                  <span className="text-xs uppercase tracking-wide text-white/55">
                    {item.label}
                  </span>
                  <span className="font-semibold text-white">{item.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="border-t border-white/5 px-6 py-5 text-xs text-white/60">
          <p>{seasonSummary.line1}</p>
          <p className="mt-1 font-semibold text-white">{seasonSummary.line2}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
