import {
  Activity,
  Award,
  CheckCircle2,
  Circle,
  Flag,
  GaugeCircle,
  Upload,
  Users,
  X,
} from "lucide-react";
import { cn } from "../../lib/cn";
import { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  ChangeEvent,
  DragEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import RedSurface from "../../components/RedSurface";
import type { Achievement, AchievementDraft } from "./achievementTypes";
import type { Profile } from "./profileTypes";

type AchievementDraftChangeHandler = <K extends keyof AchievementDraft>(
  key: K,
  value: AchievementDraft[K],
) => void;

type AchievementFilter = "all" | Achievement["category"];

type ProfileSectionProps = {
  profileDraft: Profile;
  onProfileChange: (key: keyof Profile, value: string) => void;
  onSaveProfile: (event: FormEvent<HTMLFormElement>) => void;
  onResetProfile: () => void;
  onDeleteProfile: () => void;
  statusMessage: string;
  achievements: Achievement[];
  newAchievement: AchievementDraft;
  onNewAchievementChange: AchievementDraftChangeHandler;
  onAddAchievement: () => void;
  onRemoveAchievement: (id: string) => void;
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<AchievementFilter>("all");
  const [hasSharedCelebration, setHasSharedCelebration] = useState(false);

  const categoryDetails = useMemo(
    () =>
      ({
        tournament: {
          label: t("profile.achievements.categories.tournament.label"),
          description: t(
            "profile.achievements.categories.tournament.description",
          ),
          Icon: Award,
        },
        leadership: {
          label: t("profile.achievements.categories.leadership.label"),
          description: t(
            "profile.achievements.categories.leadership.description",
          ),
          Icon: Users,
        },
        communityService: {
          label: t("profile.achievements.categories.communityService.label"),
          description: t(
            "profile.achievements.categories.communityService.description",
          ),
          Icon: Flag,
        },
        discipline: {
          label: t("profile.achievements.categories.discipline.label"),
          description: t(
            "profile.achievements.categories.discipline.description",
          ),
          Icon: Activity,
        },
      }) satisfies Record<
        Achievement["category"],
        { label: string; description: string; Icon: typeof Award }
      >,
    [t],
  );

  const badgeCounts = useMemo(() => {
    const counts: Record<AchievementFilter, number> = {
      all: achievements.length,
      tournament: 0,
      leadership: 0,
      communityService: 0,
      discipline: 0,
    };

    for (const achievement of achievements) {
      counts[achievement.category] += 1;
    }

    return counts;
  }, [achievements]);

  const filteredAchievements = useMemo(
    () =>
      activeFilter === "all"
        ? achievements
        : achievements.filter(
            (achievement) => achievement.category === activeFilter,
          ),
    [achievements, activeFilter],
  );

  const filterOptions = useMemo(
    () =>
      [
        {
          value: "all" as AchievementFilter,
          label: t("profile.achievements.filters.all"),
          count: badgeCounts.all,
          Icon: GaugeCircle,
        },
        {
          value: "tournament" as AchievementFilter,
          label: t("profile.achievements.filters.tournament"),
          count: badgeCounts.tournament,
          Icon: Award,
        },
        {
          value: "leadership" as AchievementFilter,
          label: t("profile.achievements.filters.leadership"),
          count: badgeCounts.leadership,
          Icon: Users,
        },
        {
          value: "communityService" as AchievementFilter,
          label: t("profile.achievements.filters.communityService"),
          count: badgeCounts.communityService,
          Icon: Flag,
        },
        {
          value: "discipline" as AchievementFilter,
          label: t("profile.achievements.filters.discipline"),
          count: badgeCounts.discipline,
          Icon: Activity,
        },
      ],
    [badgeCounts, t],
  );

  const isAddDisabled = newAchievement.title.trim().length === 0;

  const profileFieldConfig = useMemo(
    () =>
      [
        {
          key: "fullName" as const,
          label: t("profile.fields.fullName.label"),
          placeholder: t("profile.fields.fullName.placeholder"),
          required: true,
          readinessLabel: t("profile.fields.fullName.readinessLabel"),
        },
        {
          key: "role" as const,
          label: t("profile.fields.role.label"),
          placeholder: t("profile.fields.role.placeholder"),
          readinessLabel: t("profile.fields.role.readinessLabel"),
        },
        {
          key: "squad" as const,
          label: t("profile.fields.squad.label"),
          placeholder: t("profile.fields.squad.placeholder"),
          readinessLabel: t("profile.fields.squad.readinessLabel"),
        },
        {
          key: "email" as const,
          label: t("profile.fields.email.label"),
          type: "email",
          placeholder: t("profile.fields.email.placeholder"),
          readinessLabel: t("profile.fields.email.readinessLabel"),
        },
        {
          key: "emergencyContact" as const,
          label: t("profile.fields.emergencyContact.label"),
          placeholder: t("profile.fields.emergencyContact.placeholder"),
          readinessLabel: t("profile.fields.emergencyContact.readinessLabel"),
        },
        {
          key: "membershipId" as const,
          label: t("profile.fields.membershipId.label"),
          placeholder: t("profile.fields.membershipId.placeholder"),
          required: true,
          helperText: t("profile.fields.membershipId.helperText"),
          readinessLabel: t("profile.fields.membershipId.readinessLabel"),
        },
      ],
    [t],
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

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleDropZoneKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleBrowseClick();
    }
  };

  const handleImageSelection = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      const [file] = files;

      if (!file.type.startsWith("image/")) {
        setUploadError(t("profile.photo.errors.invalidType"));
        return;
      }

      const MAX_FILE_SIZE_MB = 3.5;
      const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // Keep base64 under ~5 MB localStorage limit
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(
          t("profile.photo.errors.fileTooLarge", { size: MAX_FILE_SIZE_MB }),
        );
        return;
      }

      setUploadError("");

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onProfileChange("profileImage", reader.result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onProfileChange, t],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleImageSelection(event.target.files);
    event.target.value = "";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = "copy";
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleImageSelection(event.dataTransfer.files);
  };

  const handleRemoveImage = () => {
    onProfileChange("profileImage", "");
    setUploadError("");
  };

  return (
    <section id="profile" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("profile.heading.title")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("profile.heading.description")}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          {t("profile.heading.badge")}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <RedSurface
          as="form"
          tone="muted"
          className="p-6 text-red-50"
          onSubmit={onSaveProfile}
        >
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-red-50">
                  {t("profile.photo.title")}
                </h3>
                <p className="text-sm text-red-200/75">
                  {t("profile.photo.description")}
                </p>
              </div>
              {profileDraft.profileImage ? (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-950/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-100 transition hover:border-red-400/60 hover:bg-red-500/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                >
                  {t("profile.actions.remove")}
                </button>
              ) : null}
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={handleBrowseClick}
              onKeyDown={handleDropZoneKeyDown}
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mt-4 flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
                isDragging
                  ? "border-red-300/80 bg-red-500/10"
                  : "border-red-400/40 bg-red-950/40 hover:border-red-300/70 hover:bg-red-900/40"
              }`}
            >
              {profileDraft.profileImage ? (
                <>
                  <img
                    src={profileDraft.profileImage}
                    alt={t("profile.photo.uploadedAlt")}
                    className="h-28 w-28 rounded-full border border-red-400/40 object-cover shadow-[0_12px_30px_rgba(127,29,29,0.45)]"
                  />
                  <p className="text-sm text-red-200/80">
                    {t("profile.photo.uploaded.hint")}
                  </p>
                  <p className="text-xs text-red-200/60">
                    {t("profile.photo.uploaded.note")}
                  </p>
                </>
              ) : (
                <>
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-red-400/30 bg-red-950/60 text-red-200">
                    <Upload aria-hidden className="h-6 w-6" />
                  </span>
                  <p className="text-sm font-medium text-red-100">
                    {t("profile.photo.empty.heading")}
                  </p>
                  <p className="text-xs text-red-200/65">
                    {t("profile.photo.empty.note")}
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
            {uploadError ? (
              <p className="mt-2 text-xs text-red-200/80">{uploadError}</p>
            ) : null}
          </div>

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
              {t("profile.actions.save")}
            </button>
            <button
              type="button"
              onClick={onResetProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-950/40 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:border-red-400/55 hover:bg-red-900/50 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              {t("profile.actions.reset")}
            </button>
            <button
              type="button"
              onClick={onDeleteProfile}
              className="inline-flex items-center justify-center rounded-2xl border border-red-400/50 bg-red-500/15 px-5 py-2.5 text-sm font-semibold text-red-200 transition hover:border-red-400/70 hover:bg-red-500/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
            >
              {t("profile.actions.delete")}
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
                  {t("profile.readiness.heading")}
                </p>
                <p className="mt-2 text-3xl font-semibold text-red-50">
                  {completionPercentage}%
                </p>
                <p className="mt-1 text-sm text-red-200/80">
                  {completionPercentage === 100
                    ? t("profile.readiness.completeDescription")
                    : t("profile.readiness.incompleteDescription")}
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
                    ? t("profile.readiness.readyMessage")
                    : suggestedNextField
                        ? t("profile.readiness.nextField", {
                            field: suggestedNextField.readinessLabel,
                          })
                        : t("profile.readiness.remaining")}
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
                  {t("profile.summary.heading")}
                </p>
                <p className="mt-1 text-lg font-semibold text-red-50">
                  {profileDraft.fullName || t("profile.summary.fallbackName")}
                </p>
              </div>
              <dl className="grid gap-2 text-xs text-red-200/70">
                <div className="flex items-center justify-between gap-2">
                  <dt>{t("profile.summary.membershipIdLabel")}</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.membershipId ||
                      t("profile.summary.membershipIdFallback")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt>{t("profile.summary.roleLabel")}</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.role || t("profile.summary.roleFallback")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt>{t("profile.summary.squadLabel")}</dt>
                  <dd className="font-medium text-red-100">
                    {profileDraft.squad ||
                      t("profile.summary.squadFallback")}
                  </dd>
                </div>
              </dl>
            </RedSurface>
          </RedSurface>

          <RedSurface
            tone="muted"
            className="flex flex-col gap-6 rounded-3xl p-6 text-red-50"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-red-50">
                  {t("profile.achievements.heading")}
                </h3>
                <p className="text-sm text-red-200/75">
                  {t("profile.achievements.description")}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-2xl border border-red-400/40 bg-red-950/40 px-3 py-1.5 text-xs font-medium text-red-100">
                <GaugeCircle aria-hidden className="h-4 w-4" />
                {t("profile.achievements.badgeWall.countLabel", {
                  count: badgeCounts.all,
                })}
              </span>
            </div>

            <div className="grid gap-3 rounded-2xl border border-red-400/30 bg-red-950/30 p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_auto] md:items-end">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="achievement-title"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70"
                >
                  {t("profile.achievements.newLabel")}
                </label>
                <input
                  id="achievement-title"
                  value={newAchievement.title}
                  onChange={(event) =>
                    onNewAchievementChange("title", event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      onAddAchievement();
                    }
                  }}
                  placeholder={t("profile.achievements.placeholder")}
                  className="w-full rounded-xl border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-50 placeholder:text-red-200/70 focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="achievement-category"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/70"
                >
                  {t("profile.achievements.categoryLabel")}
                </label>
                <select
                  id="achievement-category"
                  value={newAchievement.category}
                  onChange={(event) =>
                    onNewAchievementChange(
                      "category",
                      event.target.value as AchievementDraft["category"],
                    )
                  }
                  className="w-full rounded-xl border border-red-400/30 bg-red-950/40 px-3 py-2 text-sm text-red-50 focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/40"
                >
                  {(Object.entries(categoryDetails) as Array<
                    [
                      Achievement["category"],
                      (typeof categoryDetails)[Achievement["category"]],
                    ]
                  >).map(([value, detail]) => (
                    <option key={value} value={value}>
                      {detail.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={onAddAchievement}
                disabled={isAddDisabled}
                className={cn(
                  "inline-flex h-[42px] items-center justify-center rounded-xl border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300",
                  isAddDisabled
                    ? "cursor-not-allowed border-red-400/30 bg-red-900/40 text-red-200/50"
                    : "border-red-400/40 bg-red-500/20 text-red-100 hover:border-red-400/60 hover:bg-red-500/30 hover:text-white",
                )}
              >
                {t("profile.actions.add")}
              </button>
            </div>

            <div className="space-y-4 rounded-2xl border border-red-400/25 bg-red-950/30 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-red-100">
                    {t("profile.achievements.badgeWall.title")}
                  </p>
                  <p className="text-xs text-red-200/70">
                    {t("profile.achievements.badgeWall.subtitle")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map(({ value, label, count, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setActiveFilter(value)}
                    aria-pressed={activeFilter === value}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300",
                      activeFilter === value
                        ? "border-red-300/80 bg-red-500/20 text-red-50 shadow-[0_0_25px_rgba(248,113,113,0.15)]"
                        : "border-red-400/30 bg-red-950/30 text-red-200/80 hover:border-red-400/50 hover:text-red-50",
                    )}
                  >
                    <Icon aria-hidden className="h-4 w-4" />
                    <span>{label}</span>
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[0.65rem] font-semibold text-red-100">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredAchievements.length > 0 ? (
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {filteredAchievements.map((achievement) => {
                      const { label, description, Icon } =
                        categoryDetails[achievement.category];
                      const StatusIcon = achievement.verified
                        ? CheckCircle2
                        : Circle;
                      const statusText = achievement.verified
                        ? t("profile.achievements.status.verified")
                        : t("profile.achievements.status.pending");

                      return (
                        <li
                          key={achievement.id}
                          className="space-y-3 rounded-2xl border border-red-400/30 bg-red-950/40 p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3">
                              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-red-500/20 text-red-100">
                                <Icon aria-hidden className="h-5 w-5" />
                              </span>
                              <div className="space-y-1 text-left">
                                <p className="text-sm font-semibold text-red-50">
                                  {achievement.title}
                                </p>
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-red-200/70">
                                  {label}
                                </p>
                                <p className="text-xs text-red-200/70">
                                  {description}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onRemoveAchievement(achievement.id)}
                              aria-label={t("profile.achievements.removeAria")}
                              className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-red-400/40 bg-red-950/50 text-red-200 transition hover:border-red-400/60 hover:bg-red-500/20 hover:text-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                            >
                              <X aria-hidden className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-red-200/75">
                            <StatusIcon
                              aria-hidden
                              className={cn(
                                "h-4 w-4",
                                achievement.verified
                                  ? "text-emerald-300"
                                  : "text-red-200/60",
                              )}
                            />
                            <span>{statusText}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="rounded-2xl border border-red-400/25 bg-red-950/30 p-6 text-sm text-red-200/80">
                    {achievements.length === 0
                      ? t("profile.achievements.badgeWall.empty")
                      : t("profile.achievements.badgeWall.filterEmpty")}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-red-400/25 bg-red-950/30 p-4 text-sm text-red-200/80">
              <p className="flex items-center gap-2 text-red-100">
                <Upload aria-hidden className="h-4 w-4" />
                {t("profile.achievements.submission.prompt")}
              </p>
              <button
                type="button"
                onClick={() => setHasSharedCelebration(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-400/40 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-500/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                <Upload aria-hidden className="h-4 w-4" />
                {t("profile.achievements.submission.cta")}
              </button>
              {hasSharedCelebration ? (
                <p className="rounded-xl border border-red-400/35 bg-red-950/40 px-3 py-2 text-xs text-red-200/80">
                  {t("profile.achievements.submission.confirmation")}
                </p>
              ) : null}
            </div>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;
