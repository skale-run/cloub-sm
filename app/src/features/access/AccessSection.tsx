import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { cn } from "../../lib/cn";
import {
  ClipboardCheck,
  ClipboardList,
  ScanQrCode,
  ShieldCheck,
  Users,
} from "../../lucide-react";
import type { LucideIcon } from "../../lucide-react";
import type { Profile } from "../profile/profileTypes";

type AccessSectionProps = {
  savedProfile: Profile | null;
};

function AccessSection({ savedProfile }: AccessSectionProps) {
  const { t } = useTranslation();

  const qrCodeUrl = useMemo(() => {
    if (!savedProfile) {
      return "";
    }

    const payload = JSON.stringify({
      member: savedProfile.fullName,
      membershipId: savedProfile.membershipId,
      squad: savedProfile.squad,
    });

    return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(payload)}`;
  }, [savedProfile]);

  const accessReadiness = useMemo(() => {
    const checks = [
      {
        id: "profile",
        label: t("access.readiness.checks.profile"),
        satisfied: Boolean(savedProfile),
      },
      {
        id: "membership",
        label: t("access.readiness.checks.membership"),
        satisfied: Boolean(savedProfile?.membershipId),
      },
      {
        id: "squad",
        label: t("access.readiness.checks.squad"),
        satisfied: Boolean(savedProfile?.squad),
      },
      {
        id: "contact",
        label: t("access.readiness.checks.contact"),
        satisfied: Boolean(savedProfile?.emergencyContact),
      },
    ];

    const completed = checks.filter((check) => check.satisfied).length;
    const percentage = Math.round((completed / checks.length) * 100);

    let label = t("access.readiness.status.setupRequired");
    if (percentage === 100) {
      label = t("access.readiness.status.ready");
    } else if (percentage >= 75) {
      label = t("access.readiness.status.almost");
    }

    const nextStep =
      checks.find((check) => !check.satisfied)?.label ||
      t("access.readiness.nextStepComplete");

    return {
      checks,
      percentage,
      label,
      nextStep,
    };
  }, [savedProfile, t]);

  type QuickAction = {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    disabled?: boolean;
  };

  const quickActions: QuickAction[] = useMemo(() => {
    const hasProfile = Boolean(savedProfile);
    const hasEmergencyContact = Boolean(savedProfile?.emergencyContact);

    return [
      {
        id: "download",
        label: t("access.quickActions.download.label"),
        description: hasProfile
          ? t("access.quickActions.download.description.ready")
          : t("access.quickActions.download.description.empty"),
        icon: ScanQrCode,
        disabled: !hasProfile,
      },
      {
        id: "share",
        label: t("access.quickActions.share.label"),
        description: hasProfile
          ? t("access.quickActions.share.description.ready")
          : t("access.quickActions.share.description.empty"),
        icon: Users,
        disabled: !hasProfile,
      },
      {
        id: "checklist",
        label: t("access.quickActions.checklist.label"),
        description: hasEmergencyContact
          ? t("access.quickActions.checklist.description.ready")
          : t("access.quickActions.checklist.description.empty"),
        icon: ClipboardCheck,
        disabled: !hasEmergencyContact,
      },
    ];
  }, [savedProfile, t]);

  const accessTips = useMemo(
    () => t("access.tips.items", { returnObjects: true }) as string[],
    [t],
  );

  const eventDayChecklist = useMemo(
    () => t("access.eventChecklist.items", { returnObjects: true }) as string[],
    [t],
  );

  type PermissionLevel = "full" | "manage" | "edit" | "view" | "restricted";

  type PermissionMatrixRow = {
    id: string;
    role: string;
    permissions: Record<string, PermissionLevel>;
  };

  const permissionLabels = useMemo(
    () =>
      t("access.permissions.capabilityLabels", {
        returnObjects: true,
      }) as Record<string, string>,
    [t],
  );

  const permissionLegend = useMemo(
    () =>
      t("access.permissions.legend", {
        returnObjects: true,
      }) as Record<PermissionLevel, string>,
    [t],
  );

  const permissionMatrix = useMemo(
    () =>
      t("access.permissions.matrix", {
        returnObjects: true,
      }) as PermissionMatrixRow[],
    [t],
  );

  const capabilityOrder = useMemo(
    () => Object.keys(permissionLabels),
    [permissionLabels],
  );

  const permissionLevelStyles: Record<PermissionLevel, string> = {
    full: "border-emerald-400/60 bg-emerald-500/15 text-emerald-100",
    manage: "border-red-300/60 bg-red-500/15 text-red-50",
    edit: "border-red-300/40 bg-red-900/70 text-red-100",
    view: "border-red-300/30 bg-red-950/60 text-red-200/80",
    restricted: "border-red-400/30 bg-red-950/40 text-red-200/60",
  };

  return (
    <section id="access" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("access.heading.title")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("access.heading.description")}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
            {t("access.heading.badge")}
          </span>
          <div className="flex flex-col text-[11px] text-red-200/70">
            <span className="font-semibold text-red-100">{accessReadiness.label}</span>
            <span>
              {t("access.readiness.percentageLabel", {
                percentage: accessReadiness.percentage,
              })}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface
          tone="primary"
          className="flex flex-col gap-6 p-6 text-red-50"
        >
          <p className="text-sm text-red-100/80">
            {t("access.instructions.showCode")}
          </p>
          {savedProfile ? (
            <RedSurface
              tone="glass"
              className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <img
                src={qrCodeUrl}
                alt={t("access.qr.alt")}
                className="h-44 w-44 rounded-3xl border border-red-400/40 bg-red-950/40 p-3"
              />
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <p className="text-lg font-semibold text-red-50">
                  {savedProfile.fullName}
                </p>
                <p className="text-sm text-red-100/75">
                  ID · {savedProfile.membershipId}
                </p>
                <p className="text-sm text-red-200/70">
                  {savedProfile.squad ||
                    t("access.instructions.squadFallback")}
                </p>
              </div>
            </RedSurface>
          ) : (
            <RedSurface
              tone="dashed"
              className="flex flex-col items-center justify-center gap-4 p-10 text-center text-sm"
            >
              <p>{t("access.instructions.profileMissing")}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("access.instructions.profileRequiredBadge")}
              </p>
            </RedSurface>
          )}

          <RedSurface tone="glass" className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-red-50">
                  {t("access.readiness.heading")}
                </p>
                <p className="text-xs text-red-200/70">{accessReadiness.nextStep}</p>
              </div>
              <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-100">
                {t("access.readiness.percentageBadge", {
                  percentage: accessReadiness.percentage,
                })}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-red-950/60">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-red-400 via-red-300 to-red-200"
                style={{ width: `${accessReadiness.percentage}%` }}
              />
            </div>
            <ul className="space-y-2 text-xs text-red-100/80">
              {accessReadiness.checks.map((check) => (
                <li key={check.id} className="flex items-center justify-between gap-3">
                  <span>{check.label}</span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.2em]",
                      check.satisfied
                        ? "border-red-300/70 bg-red-500/20 text-red-50"
                        : "border-red-400/40 bg-red-950/40 text-red-200/70",
                    )}
                  >
                    {check.satisfied
                      ? t("access.readiness.checkStatus.ready")
                      : t("access.readiness.checkStatus.pending")}
                  </span>
                </li>
              ))}
            </ul>
          </RedSurface>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-200/70">
              {t("access.quickActions.heading")}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  disabled={action.disabled}
                  className={cn(
                    "group flex h-full items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-left text-red-50 transition",
                    action.disabled
                      ? "cursor-not-allowed opacity-60"
                      : "hover:border-red-300/60 hover:bg-red-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300",
                  )}
                >
                  <action.icon
                    size={22}
                    className={cn(
                      "rounded-2xl border border-red-400/50 bg-red-900/50 p-1.5 text-red-100 transition",
                      action.disabled ? "" : "group-hover:border-red-300/70 group-hover:text-red-50",
                    )}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-red-50">
                      {action.label}
                    </span>
                    <span className="text-xs text-red-200/75">
                      {action.description}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <RedSurface tone="glass" className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-semibold text-red-50">
                  {t("access.permissions.heading")}
                </p>
                <p className="text-xs text-red-200/70">
                  {t("access.permissions.description")}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-red-200/60">
                {Object.entries(permissionLegend).map(([level, label]) => (
                  <span
                    key={level}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1",
                      permissionLevelStyles[level as PermissionLevel] ??
                        "border-red-300/30 bg-red-950/60 text-red-200/80",
                    )}
                  >
                    <ShieldCheck size={14} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-red-400/20 text-left text-xs text-red-100/80">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.35em] text-red-200/70">
                    <th className="px-4 py-3 font-semibold text-red-200/80">
                      {t("access.permissions.roleColumn")}
                    </th>
                    {capabilityOrder.map((capability) => (
                      <th key={capability} className="px-4 py-3 font-semibold text-red-200/70">
                        <div className="flex items-center gap-2">
                          <ClipboardList size={14} />
                          <span>{permissionLabels[capability]}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-400/10">
                  {permissionMatrix.map((row) => (
                    <tr key={row.id}>
                      <th scope="row" className="px-4 py-3 text-sm font-semibold text-red-50">
                        {row.role}
                      </th>
                      {capabilityOrder.map((capability) => {
                        const level = row.permissions[capability] ?? "restricted";
                        const badgeStyles =
                          permissionLevelStyles[level] ??
                          "border-red-300/30 bg-red-950/60 text-red-200/80";

                        return (
                          <td key={capability} className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex w-full items-center justify-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em]",
                                badgeStyles,
                              )}
                            >
                              {permissionLegend[level] ?? permissionLegend.restricted}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RedSurface>
        </RedSurface>

        <RedSurface as="aside" tone="muted" className="p-6 text-red-50">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-red-50">
                {t("access.tips.title")}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-red-100/85">
                {accessTips.map((tip) => (
                  <RedSurface as="li" tone="glass" className="p-4" key={tip}>
                    {tip}
                  </RedSurface>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-50">
                {t("access.eventChecklist.title")}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-red-100/85">
                {eventDayChecklist.map((item) => (
                  <RedSurface as="li" tone="glass" className="p-4" key={item}>
                    {item}
                  </RedSurface>
                ))}
              </ul>
            </div>
          </div>
        </RedSurface>
      </div>
    </section>
  );
}

export default AccessSection;
