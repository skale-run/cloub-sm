import { useMemo } from "react";
import RedSurface from "../../components/RedSurface";
import { cn } from "../../lib/cn";
import { ClipboardCheck, ScanQrCode, Users } from "../../lucide-react";
import type { LucideIcon } from "../../lucide-react";
import type { Profile } from "../profile/profileTypes";

type AccessSectionProps = {
  savedProfile: Profile | null;
};

function AccessSection({ savedProfile }: AccessSectionProps) {
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
        label: "Profile saved",
        satisfied: Boolean(savedProfile),
      },
      {
        id: "membership",
        label: "Membership ID active",
        satisfied: Boolean(savedProfile?.membershipId),
      },
      {
        id: "squad",
        label: "Squad assigned",
        satisfied: Boolean(savedProfile?.squad),
      },
      {
        id: "contact",
        label: "Emergency contact recorded",
        satisfied: Boolean(savedProfile?.emergencyContact),
      },
    ];

    const completed = checks.filter((check) => check.satisfied).length;
    const percentage = Math.round((completed / checks.length) * 100);

    let label = "Setup required";
    if (percentage === 100) {
      label = "Ready for entry";
    } else if (percentage >= 75) {
      label = "Almost ready";
    }

    const nextStep =
      checks.find((check) => !check.satisfied)?.label ||
      "All compliance checks are complete.";

    return {
      checks,
      percentage,
      label,
      nextStep,
    };
  }, [savedProfile]);

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
        label: "Save offline pass",
        description: hasProfile
          ? "Add it to your device wallet for match-day entry."
          : "Save your profile to generate a downloadable pass.",
        icon: ScanQrCode,
        disabled: !hasProfile,
      },
      {
        id: "share",
        label: "Share with guardian",
        description: hasProfile
          ? "Send a secure link to parents for pickup coordination."
          : "Unlock sharing once your profile details are saved.",
        icon: Users,
        disabled: !hasProfile,
      },
      {
        id: "checklist",
        label: "Safety compliance check",
        description: hasEmergencyContact
          ? "Emergency contact on file — review before travel days."
          : "Add an emergency contact to complete compliance.",
        icon: ClipboardCheck,
        disabled: !hasEmergencyContact,
      },
    ];
  }, [savedProfile]);

  return (
    <section id="access" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Club access QR
          </h2>
          <p className="text-sm text-red-200/75">
            Instantly retrieve your smart gate pass once your profile is saved.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
            Instant pass
          </span>
          <div className="flex flex-col text-[11px] text-red-200/70">
            <span className="font-semibold text-red-100">{accessReadiness.label}</span>
            <span>{accessReadiness.percentage}% access readiness</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface
          tone="primary"
          className="flex flex-col gap-6 p-6 text-red-50"
        >
          <p className="text-sm text-red-100/80">
            Show this code at the smart gate to enter the facility.
          </p>
          {savedProfile ? (
            <RedSurface
              tone="glass"
              className="flex flex-col items-center gap-5 p-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <img
                src={qrCodeUrl}
                alt="Club access QR code"
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
                  {savedProfile.squad || "Assign squad to personalise access"}
                </p>
              </div>
            </RedSurface>
          ) : (
            <RedSurface
              tone="dashed"
              className="flex flex-col items-center justify-center gap-4 p-10 text-center text-sm"
            >
              <p>Save your profile to generate a personalised QR code.</p>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Profile required
              </p>
            </RedSurface>
          )}

          <RedSurface tone="glass" className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-red-50">Access readiness</p>
                <p className="text-xs text-red-200/70">{accessReadiness.nextStep}</p>
              </div>
              <span className="inline-flex items-center rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-100">
                {accessReadiness.percentage}% ready
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
                    {check.satisfied ? "Ready" : "Pending"}
                  </span>
                </li>
              ))}
            </ul>
          </RedSurface>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-200/70">
              Access management
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
        </RedSurface>

        <RedSurface as="aside" tone="muted" className="p-6 text-red-50">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-red-50">Access tips</h3>
              <ul className="mt-4 space-y-3 text-sm text-red-100/85">
                <RedSurface as="li" tone="glass" className="p-4">
                  QR refreshes automatically every time you save your profile.
                </RedSurface>
                <RedSurface as="li" tone="glass" className="p-4">
                  Keep screen brightness high for the scanners at Gate B.
                </RedSurface>
                <RedSurface as="li" tone="glass" className="p-4">
                  Add your emergency contact for compliant access accreditation.
                </RedSurface>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-50">Event day checklist</h3>
              <ul className="mt-4 space-y-3 text-sm text-red-100/85">
                <RedSurface as="li" tone="glass" className="p-4">
                  Arrive 15 minutes before your allocated gate slot.
                </RedSurface>
                <RedSurface as="li" tone="glass" className="p-4">
                  Carry a physical ID for manual verification when required.
                </RedSurface>
                <RedSurface as="li" tone="glass" className="p-4">
                  Ensure guardians have the latest pick-up instructions.
                </RedSurface>
              </ul>
            </div>
          </div>
        </RedSurface>
      </div>
    </section>
  );
}

export default AccessSection;
