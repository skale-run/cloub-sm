import { CheckCircle2, Circle, X } from "lucide-react";
import { useMemo } from "react";
import type { FormEvent } from "react";
import RedSurface from "../../components/RedSurface";
import type { Profile } from "./profileTypes";

type ProfileSectionProps = {
  profileDraft: Profile;
  onProfileChange: (key: keyof Profile, value: string) => void;
  onSaveProfile: (event: FormEvent<HTMLFormElement>) => void;
  onResetProfile: () => void;
  onDeleteProfile: () => void;
  statusMessage: string;
  achievements: string[];
  newAchievement: string;
  onNewAchievementChange: (value: string) => void;
  onAddAchievement: () => void;
  onRemoveAchievement: (index: number) => void;
};

function ProfileSection({
  profileDraft,
  onProfileChange,
  onSaveProfile,
  onResetProfile,
  onDeleteProfile,
  statusMessage,
  achievements,
  newAchievement,
  onNewAchievementChange,
  onAddAchievement,
  onRemoveAchievement,
}: ProfileSectionProps) {
  const profileFieldConfig = useMemo(
    () =>
      [
        {
          key: "fullName" as const,
          label: "Full name",
          placeholder: "e.g. Lina Carter",
          required: true,
        },
        {
          key: "role" as const,
          label: "Role",
          placeholder: "Sprinter / Mid-distance",
        },
        {
          key: "squad" as const,
          label: "Squad / Tier",
          placeholder: "Elite Performance Squad",
        },
        {
          key: "email" as const,
          label: "Email",
          type: "email",
          placeholder: "athlete@clubpulse.io",
        },
        {
          key: "emergencyContact" as const,
          label: "Emergency contact",
          placeholder: "Jordan Carter · +44 7700 000000",
        },
        {
          key: "membershipId" as const,
          label: "Membership ID",
          placeholder: "CP-2025-184",
          required: true,
          helperText: "Used to verify entry and sync wearable data.",
        },
      ],
    [],
  );

  const { completionPercentage, completedFields, missingFields } = useMemo(() => {
    const entries = profileFieldConfig.map((field) => {
      const value = profileDraft[field.key];
      const hasValue = typeof value === "string" && value.trim().length > 0;

      return { field, hasValue };
    });

    const filled = entries.filter((entry) => entry.hasValue);
    const missing = entries.filter((entry) => !entry.hasValue);
    const percentage = Math.round((filled.length / entries.length) * 100);

    return {
      completionPercentage: Number.isNaN(percentage) ? 0 : percentage,
      completedFields: filled.map((entry) => entry.field.key),
      missingFields: missing.map((entry) => entry.field),
    };
  }, [profileDraft, profileFieldConfig]);

  const suggestedNextField = missingFields[0];

  return (
    <section id="profile" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            My athlete profile
          </h2>
          <p className="text-sm text-red-200/75">
            Keep your credentials current to unlock personalised drills and
            access.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          Manage & update
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <RedSurface
          as="form"
          tone="muted"
          className="p-6 text-red-50"
          onSubmit={onSaveProfile}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {profileFieldConfig.map(
              ({ key, label, placeholder, type = "text", required, helperText }) => (
                <label key={key} className="flex flex-col gap-2 text-sm">
                  <span className="font-semibold text-red-50">{label}</span>
                  <input
                    type={type}
                    value={profileDraft[key]}
                    onChange={(event) =>
                      onProfileChange(key, event.target.value)
                    }
                    placeholder={placeholder}
                    required={required}
                    className="rounded-2xl border border-red-400/35 bg-red-950/60 px-4 py-3 text-red-50 placeholder:text-red-200/60 focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                  />
                  {helperText ? (
                    <span className="text-xs text-red-200/70">{helperText}</span>
                  ) : null}
                </label>
              ),
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/20 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              Save profile
            </button>
            <button
              type="button"
              onClick={onResetProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-950/40 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/55 hover:bg-red-900/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              Reset draft
            </button>
            <button
              type="button"
              onClick={onDeleteProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-red-400/50 bg-red-500/15 px-5 py-2.5 text-sm font-semibold text-red-200 transition hover:border-red-400/70 hover:bg-red-500/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              Delete profile
            </button>
          </div>

          {statusMessage && (
            <p
              role="status"
              aria-live="polite"
              className="mt-4 inline-flex rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-100"
            >
              {statusMessage}
            </p>
          )}
        </RedSurface>

        <div className="flex flex-col gap-6">
          <RedSurface tone="muted" className="space-y-5 p-6 text-red-50">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70">
                  Profile readiness
                </p>
                <p className="mt-2 text-3xl font-semibold text-red-50">
                  {completionPercentage}%
                </p>
                <p className="mt-1 text-sm text-red-200/80">
                  {completionPercentage === 100
                    ? "Every detail is in place."
                    : "Complete the profile to unlock the full experience."}
                </p>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-red-400/40 bg-red-950/60">
                <span className="text-lg font-semibold text-red-100">
                  {completedFields.length}/{profileFieldConfig.length}
                </span>
              </div>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-red-900/60">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-400 via-orange-300/90 to-amber-200/80"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-red-200/80">
                {missingFields.length === 0 ? (
                  <CheckCircle2 aria-hidden className="h-4 w-4 text-red-200" />
                ) : (
                  <Circle aria-hidden className="h-4 w-4 text-red-200/70" />
                )}
                <span>
                  {missingFields.length === 0
                    ? "You're ready to share this profile with coaches."
                    : suggestedNextField
                        ? `Next up: add ${suggestedNextField.label.toLowerCase()}.`
                        : "Add the remaining details to finish your profile."}
                </span>
              </div>
              {missingFields.length > 0 ? (
                <ul className="space-y-1 text-xs text-red-200/70">
                  {missingFields.map((field) => (
                    <li key={field.key} className="flex items-center gap-2">
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-red-400/70" />
                      {field.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <RedSurface tone="glass" className="space-y-3 p-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-red-200/60">
                  Membership snapshot
                </p>
                <p className="mt-1 text-lg font-semibold text-red-50">
                  {profileDraft.fullName || "Awaiting athlete details"}
                </p>
              </div>
              <dl className="grid gap-2 text-xs text-red-200/70">
                <div className="flex items-center justify-between gap-2">
                  <dt>Membership ID</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.membershipId || "Pending assignment"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt>Role</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.role || "Define your training focus"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt>Squad</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.squad || "Assign a squad for tailored drills"}
                  </dd>
                </div>
              </dl>
            </RedSurface>
          </RedSurface>

          <RedSurface
            tone="muted"
            className="flex flex-col gap-4 rounded-3xl p-6 text-red-50"
          >
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-red-50">
                  Highlights & achievements
                </h3>
                <p className="text-sm text-red-200/75">
                  Capture season wins to keep your motivation board updated.
                </p>
              </div>
              <RedSurface
                tone="glass"
                className="flex w-full gap-2 rounded-2xl p-2 sm:w-auto"
              >
                <input
                  value={newAchievement}
                  onChange={(event) => onNewAchievementChange(event.target.value)}
                  placeholder="Add new highlight"
                  className="flex-1 rounded-xl border border-transparent bg-transparent px-3 py-2 text-sm text-red-50 placeholder:text-red-200/70 focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                />
                <button
                  type="button"
                  onClick={onAddAchievement}
                  className="inline-flex items-center justify-center rounded-xl bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-400/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                >
                  Add
                </button>
              </RedSurface>
            </div>

            <ul className="space-y-3">
              {achievements.length > 0 ? (
                achievements.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-red-400/25 bg-red-950/35 px-4 py-3 text-sm"
                  >
                    <span className="text-red-100">{item}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveAchievement(index)}
                      aria-label="Remove"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-red-400/35 bg-red-950/50 text-red-200 transition hover:border-red-400/60 hover:bg-red-500/20 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                    >
                      <X aria-hidden className="h-4 w-4" />
                    </button>
                  </li>
                ))
              ) : (
                <li className="flex items-center justify-between gap-3 rounded-2xl border border-red-400/20 bg-red-950/35 px-4 py-3 text-sm text-red-200/70">
                  <span>No highlights yet. Start by celebrating a recent win.</span>
                </li>
              )}
            </ul>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
