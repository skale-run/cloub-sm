import { useEffect, useMemo, useState, type FC } from "react";
import { useTranslation } from "react-i18next";
import { useMember } from "../auth/MemberContext";
import {
  Activity,
  Award,
  BarChart3,
  Bell,
  CalendarDays,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  GaugeCircle,
  Play,
  Sparkles,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "../../lucide-react";
import { cn } from "../../lib/cn";

interface LandingPageProps {
  onSignup: () => void;
  onLogin: () => void;
  onContact: () => void;
}

type RoleKey = "master" | "coach" | "parent" | "athlete" | "default";

type CommandCenterContent = {
  heading: string;
  subheading: string;
  notifications: {
    title: string;
    empty: string;
    viewAll: string;
  };
  statusLabels: Record<string, string>;
  roleSwitcherLabel: string;
  roleOptions: Array<{
    id: RoleKey;
    label: string;
    description: string;
  }>;
  focusTitle: string;
  focusSubtitle: string;
  shortcutsTitle: string;
  roleVariants: Record<
    RoleKey,
    {
      welcome: string;
      tagline: string;
      kpis: Array<{
        id: string;
        label: string;
        value: string;
        helper?: string;
        delta?: string;
        trend?: "up" | "down";
        icon: string;
      }>;
      focus: Array<{
        id: string;
        label: string;
        description: string;
        action: string;
        tag?: string;
        icon: string;
      }>;
      shortcuts: Array<{
        id: string;
        label: string;
        description: string;
        icon: string;
      }>;
      notifications: Array<{
        id: string;
        title: string;
        category: string;
        time: string;
        icon: string;
        description?: string;
      }>;
      timeline: {
        title: string;
        entries: Array<{
          id: string;
          label: string;
          time: string;
          status: string;
          description: string;
        }>;
      };
      highlights: {
        title: string;
        items: Array<{
          id: string;
          title: string;
          metric: string;
          description: string;
          icon: string;
        }>;
      };
      reels: {
        title: string;
        clips: Array<{
          id: string;
          title: string;
          duration: string;
          description: string;
        }>;
      };
    }
  >;
};

const iconLookup: Record<string, LucideIcon> = {
  calendar: CalendarDays,
  award: Award,
  creditCard: CreditCard,
  clipboardCheck: ClipboardCheck,
  clipboardList: ClipboardList,
  activity: Activity,
  gauge: GaugeCircle,
  play: Play,
  sparkles: Sparkles,
  users: Users,
  shieldCheck: ShieldCheck,
  barChart: BarChart3,
};

function resolveIcon(icon: string): LucideIcon {
  return iconLookup[icon] ?? Activity;
}

function detectRole(role: string | null | undefined): RoleKey {
  if (!role) {
    return "default";
  }

  const normalized = role.toLowerCase();

  if (normalized.includes("master")) {
    return "master";
  }

  if (normalized.includes("coach")) {
    return "coach";
  }

  if (normalized.includes("parent") || normalized.includes("guardian")) {
    return "parent";
  }

  if (
    normalized.includes("athlete") ||
    normalized.includes("student") ||
    normalized.includes("practitioner")
  ) {
    return "athlete";
  }

  return "default";
}

const LandingPage: FC<LandingPageProps> = ({ onSignup, onLogin, onContact }) => {
  const { t } = useTranslation();
  const { member } = useMember();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const commandCenter = useMemo(
    () =>
      t("landing.commandCenter", {
        returnObjects: true,
      }) as CommandCenterContent,
    [t],
  );

  const [activeRole, setActiveRole] = useState<RoleKey>(() =>
    detectRole(member?.role ?? null),
  );

  useEffect(() => {
    setActiveRole(detectRole(member?.role ?? null));
  }, [member?.role]);

  const roleVariant = useMemo(() => {
    const variant = commandCenter.roleVariants?.[activeRole];
    if (variant) {
      return variant;
    }

    if (commandCenter.roleVariants?.default) {
      return commandCenter.roleVariants.default;
    }

    return commandCenter.roleVariants?.athlete;
  }, [activeRole, commandCenter.roleVariants]);

  const notifications = roleVariant?.notifications ?? [];

  if (member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-red-50">
        <header className="relative overflow-hidden border-b border-red-300/20">
          <div className="absolute inset-0 opacity-80">
            <div className="absolute inset-x-0 top-1/3 h-72 bg-gradient-to-b from-red-500/20 via-red-800/40 to-red-950/0 blur-3xl" />
            <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-red-400/20 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-red-500/30 blur-3xl" />
          </div>
          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-12 pt-14 sm:pt-16">
            <div className="flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-900/60 px-4 py-1 text-xs uppercase tracking-[0.35em] text-red-200/80">
                  {commandCenter.heading}
                </p>
                <h1 className="text-3xl font-semibold text-red-50 sm:text-4xl">
                  {roleVariant?.welcome}
                </h1>
                <p className="max-w-2xl text-sm text-red-100/80 sm:text-base">
                  {roleVariant?.tagline}
                </p>
              </div>
              <div className="relative flex w-full flex-col items-end gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen((previous) => !previous)}
                  className="relative inline-flex items-center justify-center rounded-full border border-red-300/30 bg-red-900/60 p-3 text-red-50 transition hover:border-red-200/60 hover:bg-red-900/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                  aria-haspopup="true"
                  aria-expanded={isNotificationOpen}
                  aria-label={commandCenter.notifications.title}
                >
                  <Bell size={20} />
                  {notifications.length > 0 ? (
                    <span className="absolute -right-1 -top-1 inline-flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-red-50">
                      {notifications.length}
                    </span>
                  ) : null}
                </button>
                {isNotificationOpen ? (
                  <div className="absolute right-0 top-14 z-20 w-80 overflow-hidden rounded-3xl border border-red-300/20 bg-red-950/95 shadow-[0_30px_80px_rgba(127,29,29,0.45)] backdrop-blur">
                    <div className="flex items-center justify-between border-b border-red-300/15 px-4 py-3">
                      <p className="text-sm font-semibold text-red-50">
                        {commandCenter.notifications.title}
                      </p>
                      <span className="text-xs text-red-200/70">
                        {notifications.length} {commandCenter.notifications.viewAll}
                      </span>
                    </div>
                    <ul className="max-h-80 divide-y divide-red-300/10 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => {
                          const Icon = resolveIcon(notification.icon);

                          return (
                            <li
                              key={notification.id}
                              className="flex gap-3 px-4 py-3 text-left text-sm text-red-100/85"
                            >
                              <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl border border-red-400/40 bg-red-900/70">
                                <Icon size={18} />
                              </span>
                              <div className="flex flex-col gap-1">
                                <p className="font-semibold text-red-50">
                                  {notification.title}
                                </p>
                                {notification.description ? (
                                  <p className="text-xs text-red-200/80">
                                    {notification.description}
                                  </p>
                                ) : null}
                                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-red-200/60">
                                  <span>{notification.category}</span>
                                  <span className="text-red-400/60">•</span>
                                  <span className="text-red-100/80">{notification.time}</span>
                                </div>
                              </div>
                            </li>
                          );
                        })
                      ) : (
                        <li className="px-4 py-6 text-center text-sm text-red-200/70">
                          {commandCenter.notifications.empty}
                        </li>
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-200/70">
                {commandCenter.roleSwitcherLabel}
              </p>
              <p className="text-xs text-red-200/70">{commandCenter.subheading}</p>
              <div className="flex flex-wrap gap-2">
                {(commandCenter.roleOptions ?? []).map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setActiveRole(option.id);
                      setIsNotificationOpen(false);
                    }}
                    className={cn(
                      "flex flex-col gap-1 rounded-2xl border px-4 py-3 text-left text-xs text-red-200/80 transition sm:text-sm",
                      activeRole === option.id
                        ? "border-red-200/60 bg-red-900/80 text-red-50 shadow-[0_16px_35px_rgba(127,29,29,0.45)]"
                        : "border-red-300/20 bg-red-900/50 hover:border-red-200/40 hover:bg-red-900/70",
                    )}
                  >
                    <span className="font-semibold text-red-50">{option.label}</span>
                    <span className="text-xs text-red-200/70">{option.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {(roleVariant?.kpis ?? []).map((kpi) => {
              const Icon = resolveIcon(kpi.icon);

              return (
                <article
                  key={kpi.id}
                  className="group relative overflow-hidden rounded-3xl border border-red-300/20 bg-red-900/50 p-5 shadow-[0_20px_45px_rgba(127,29,29,0.35)] transition hover:border-red-200/40 hover:bg-red-900/70"
                >
                  <div className="absolute -right-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                        {kpi.label}
                      </p>
                      <p className="mt-3 text-3xl font-semibold text-red-50">
                        {kpi.value}
                      </p>
                    </div>
                    <span className="rounded-2xl border border-red-300/30 bg-red-900/70 p-3 text-red-100">
                      <Icon size={22} />
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-red-200/70">
                    {kpi.delta ? (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 uppercase tracking-[0.25em]",
                          kpi.trend === "down"
                            ? "border-red-400/60 bg-red-500/15 text-red-200"
                            : "border-emerald-400/60 bg-emerald-500/15 text-emerald-200",
                        )}
                      >
                        {kpi.delta}
                      </span>
                    ) : null}
                    {kpi.helper ? <span>{kpi.helper}</span> : null}
                  </div>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-red-50 sm:text-xl">
                  {commandCenter.focusTitle}
                </h2>
                <span className="text-xs uppercase tracking-[0.25em] text-red-200/70">
                  {commandCenter.focusSubtitle}
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {(roleVariant?.focus ?? []).map((item) => {
                  const Icon = resolveIcon(item.icon);

                  return (
                    <article
                      key={item.id}
                      className="flex h-full flex-col gap-3 rounded-3xl border border-red-300/20 bg-red-900/50 p-5 transition hover:border-red-200/40 hover:bg-red-900/70"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-red-300/30 bg-red-950/60 text-red-100">
                          <Icon size={20} />
                        </span>
                        {item.tag ? (
                          <span className="inline-flex items-center rounded-full border border-red-300/40 bg-red-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-red-50">
                            {item.tag}
                          </span>
                        ) : null}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-red-50">{item.label}</h3>
                        <p className="text-sm text-red-200/75">{item.description}</p>
                      </div>
                      <button
                        type="button"
                        className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-100 transition hover:text-red-50"
                      >
                        {item.action}
                        <span aria-hidden className="text-red-200/70">
                          →
                        </span>
                      </button>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-red-50 sm:text-xl">
                {commandCenter.shortcutsTitle}
              </h2>
              <div className="space-y-3">
                {(roleVariant?.shortcuts ?? []).map((shortcut) => {
                  const Icon = resolveIcon(shortcut.icon);

                  return (
                    <button
                      key={shortcut.id}
                      type="button"
                      className="group flex w-full items-center justify-between gap-3 rounded-3xl border border-red-300/20 bg-red-900/50 p-4 text-left transition hover:border-red-200/40 hover:bg-red-900/70"
                    >
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-red-300/30 bg-red-950/60 text-red-100">
                          <Icon size={20} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-semibold text-red-50">
                            {shortcut.label}
                          </span>
                          <span className="text-xs text-red-200/70">
                            {shortcut.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-red-200/60 transition group-hover:text-red-50">
                        ↗
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-6 rounded-3xl border border-red-300/20 bg-red-900/50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-red-50 sm:text-xl">
                  {roleVariant?.timeline.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-red-200/60">
                  {Object.entries(commandCenter.statusLabels ?? {}).map(
                    ([status, label]) => (
                      <span key={status} className="flex items-center gap-1">
                        <span
                          className={cn(
                            "inline-block h-2.5 w-2.5 rounded-full",
                            status === "completed"
                              ? "bg-emerald-400"
                              : status === "overdue"
                                ? "bg-red-400"
                                : "bg-red-200",
                          )}
                        />
                        {label}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <ol className="space-y-4">
                {(roleVariant?.timeline.entries ?? []).map((entry, index) => (
                  <li key={entry.id} className="relative flex gap-4">
                    <span
                      className="absolute left-[11px] top-8 h-[calc(100%-32px)] w-px bg-red-400/20 last:hidden"
                      aria-hidden
                    />
                    <span
                      className={cn(
                        "mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                        entry.status === "completed"
                          ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-100"
                          : entry.status === "overdue"
                            ? "border-red-400/60 bg-red-500/15 text-red-100"
                            : "border-red-300/40 bg-red-900/60 text-red-200",
                      )}
                    >
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1 rounded-2xl border border-red-300/20 bg-red-900/60 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-red-50">{entry.label}</p>
                        <span className="text-xs text-red-200/70">•</span>
                        <span className="text-xs uppercase tracking-[0.25em] text-red-200/60">
                          {entry.time}
                        </span>
                      </div>
                      <p className="text-sm text-red-200/75">{entry.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-red-300/20 bg-red-900/50 p-6">
                <h2 className="text-lg font-semibold text-red-50 sm:text-xl">
                  {roleVariant?.highlights.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {(roleVariant?.highlights.items ?? []).map((item) => {
                    const Icon = resolveIcon(item.icon);

                    return (
                      <li
                        key={item.id}
                        className="flex items-start gap-3 rounded-2xl border border-red-300/20 bg-red-950/60 p-4"
                      >
                        <span className="mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl border border-red-300/30 bg-red-900/70 text-red-100">
                          <Icon size={18} />
                        </span>
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold text-red-50">
                              {item.title}
                            </span>
                            <span className="text-xs uppercase tracking-[0.25em] text-red-200/60">
                              {item.metric}
                            </span>
                          </div>
                          <span className="text-xs text-red-200/70">{item.description}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="rounded-3xl border border-red-300/20 bg-red-900/50 p-6">
                <h2 className="text-lg font-semibold text-red-50 sm:text-xl">
                  {roleVariant?.reels.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {(roleVariant?.reels.clips ?? []).map((clip) => (
                    <li
                      key={clip.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-red-300/20 bg-red-950/60 p-4"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-red-50">
                          {clip.title}
                        </span>
                        <span className="text-xs text-red-200/70">{clip.description}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-red-200/60">
                        <span>{clip.duration}</span>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-300/30 bg-red-900/70 text-red-100">
                          <Play size={16} />
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const features = t("landing.features", {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;
  const experience = t("landing.experience", {
    returnObjects: true,
  }) as {
    title: string;
    description: string;
    bullets: string[];
    stats: { label: string; value: string; description: string };
  };
  const footerLinks = t("landing.footer.links", {
    returnObjects: true,
  }) as { privacy: string; terms: string; support: string };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-red-50">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-3xl" />
          <div className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-red-400/10 blur-3xl" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 text-center sm:gap-12 sm:py-24">
          <p className="mx-auto w-fit rounded-full border border-red-300/30 bg-red-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-200/80">
            {t("landing.badge")}
          </p>
          <h1 className="text-4xl font-bold leading-tight text-red-50 sm:text-5xl lg:text-6xl">
            {t("landing.heroTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-red-100/90 sm:text-lg">
            {t("landing.heroDescription")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onSignup}
              className="rounded-full bg-red-500 px-7 py-3 text-sm font-semibold text-red-50 shadow-[0_20px_35px_rgba(248,113,113,0.25)] transition hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              {t("landing.ctas.primary")}
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="rounded-full border border-red-200/40 px-7 py-3 text-sm font-semibold text-red-50 transition hover:border-red-200/80 hover:bg-red-900/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              {t("landing.ctas.secondary")}
            </button>
            <button
              type="button"
              onClick={onContact}
              className="rounded-full border border-transparent bg-red-900/60 px-7 py-3 text-sm font-semibold text-red-100 transition hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
            >
              {t("landing.ctas.tertiary")}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24">
        <section className="grid gap-8 rounded-3xl border border-red-200/10 bg-red-950/60 p-8 shadow-[0_30px_80px_rgba(127,29,29,0.35)] sm:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-red-900/30 p-6">
              <h2 className="text-xl font-semibold text-red-50">{feature.title}</h2>
              <p className="mt-3 text-sm text-red-100/80">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-red-50 sm:text-4xl">
              {experience.title}
            </h2>
            <p className="text-base text-red-100/90 sm:text-lg">
              {experience.description}
            </p>
            <ul className="space-y-4 text-left text-sm text-red-100/90">
              {experience.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 flex-shrink-0 rounded-full bg-red-400" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-red-300/20 bg-red-900/40 p-8 text-center shadow-[0_25px_60px_rgba(127,29,29,0.45)]">
            <p className="text-sm uppercase tracking-[0.35em] text-red-200/70">{experience.stats.label}</p>
            <p className="mt-6 text-5xl font-bold text-red-50">{experience.stats.value}</p>
            <p className="mt-3 text-sm text-red-100/80">{experience.stats.description}</p>
          </div>
        </section>

        <section
          id="landing-contact"
          className="rounded-3xl border border-red-200/20 bg-red-900/40 p-10 text-center shadow-[0_20px_60px_rgba(127,29,29,0.4)]"
        >
          <h2 className="text-3xl font-semibold text-red-50">{t("landing.contact.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-red-100/80 sm:text-base">
            {t("landing.contact.description")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-red-100/80 sm:flex-row">
            <a
              href={`mailto:${t("landing.contact.email")}`}
              className="rounded-full border border-red-200/30 px-6 py-2.5 text-red-100 transition hover:border-red-200/60 hover:bg-red-900/70"
            >
              {t("landing.contact.email")}
            </a>
            <span className="hidden text-red-200/40 sm:inline">•</span>
            <p>{t("landing.contact.schedule")}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-red-200/10 bg-red-950/80 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-red-300/80 sm:flex-row">
          <p>{t("landing.footer.copyright", { year: new Date().getFullYear() })}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-red-200">
              {footerLinks.privacy}
            </a>
            <a href="#" className="transition hover:text-red-200">
              {footerLinks.terms}
            </a>
            <a href="#" className="transition hover:text-red-200">
              {footerLinks.support}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
