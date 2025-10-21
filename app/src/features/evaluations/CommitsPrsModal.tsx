import {
  type KeyboardEvent,
  type ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal";
import RedSurface from "../../components/RedSurface";
import { cn } from "../../lib/cn";
import { X } from "../../lucide-react";

type MetadataItem = {
  label: string;
  value: string;
};

type ChangeStat = {
  label: string;
  value: string;
};

type ChangeItem = {
  id: string;
  kind: "pullRequest" | "commit";
  badge: string;
  badgeTone: "success" | "warning" | "neutral";
  title: string;
  description: string;
  author: string;
  timestamp: string;
  identifier: string;
  stats: ChangeStat[];
  reviewersLabel: string;
  reviewers: string[];
  tags: string[];
};

type PipelineItem = {
  label: string;
  status: string;
};

type OverviewSummaryItem = {
  label: string;
  value: string;
  helper: string;
};

type QualityItem = {
  label: string;
  value: string;
  helper: string;
};

type HighlightItem = {
  title: string;
  detail: string;
};

type HeatmapDay = {
  label: string;
  tooltip: string;
  intensity: "none" | "low" | "medium" | "high";
};

type HeatmapWeek = {
  label: string;
  days: HeatmapDay[];
};

type HeatmapCallout = {
  label: string;
  value: string;
};

type CommitsModalCopy = {
  trigger?: {
    label: string;
    helper: string;
  };
  title: string;
  subtitle: string;
  metadata: MetadataItem[];
  tabs: {
    changes: string;
    overview: string;
    heatmap: string;
  };
  changes: {
    heading: string;
    helper: string;
    items: ChangeItem[];
    pipeline: {
      heading: string;
      items: PipelineItem[];
    };
  };
  overview: {
    heading: string;
    helper: string;
    summary: OverviewSummaryItem[];
    quality: {
      heading: string;
      items: QualityItem[];
    };
    highlights: {
      heading: string;
      items: HighlightItem[];
    };
  };
  heatmap: {
    heading: string;
    helper: string;
    legend: Record<HeatmapDay["intensity"], string> & {
      none: string;
      low: string;
      medium: string;
      high: string;
    };
    weeks: HeatmapWeek[];
    callouts: {
      heading: string;
      items: HeatmapCallout[];
    };
    footnote: string;
  };
};

type CommitsPrsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TabId = "changes" | "overview" | "heatmap";

type TabDefinition = {
  id: TabId;
  label: string;
};

const badgeToneClasses: Record<ChangeItem["badgeTone"], string> = {
  success:
    "border border-emerald-400/50 bg-emerald-500/15 text-emerald-100",
  warning: "border border-amber-400/45 bg-amber-500/15 text-amber-100",
  neutral: "border border-red-400/30 bg-red-500/10 text-red-100",
};

const heatmapIntensityClasses: Record<HeatmapDay["intensity"], string> = {
  none: "border border-red-400/10 bg-red-950/40",
  low: "border border-red-400/25 bg-red-500/15",
  medium: "border border-red-400/40 bg-red-500/35",
  high: "border border-red-200/70 bg-red-400/70",
};

function CommitsPrsModal({ isOpen, onClose }: CommitsPrsModalProps): ReactElement | null {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("changes");

  const copy = useMemo(() => {
    return t("progressOverview.commitsModal", {
      returnObjects: true,
    }) as CommitsModalCopy;
  }, [t]);

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("changes");
    }
  }, [isOpen]);

  const tabs: TabDefinition[] = useMemo(() => {
    return [
      { id: "changes", label: copy.tabs.changes },
      { id: "overview", label: copy.tabs.overview },
      { id: "heatmap", label: copy.tabs.heatmap },
    ];
  }, [copy.tabs]);

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + direction + tabs.length) % tabs.length;
    setActiveTab(tabs[nextIndex]!.id);
  };

  const titleId = "commits-prs-modal-title";
  const descriptionId = "commits-prs-modal-description";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy={titleId}
      describedBy={descriptionId}
      contentWrapperClassName="max-w-5xl"
      contentClassName="outline-none"
      initialFocusRef={closeButtonRef}
    >
      <section className="relative flex flex-col gap-6 rounded-[28px] bg-gradient-to-br from-red-950/95 via-red-950/90 to-red-900/80 p-6 sm:p-8">
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-400/40 bg-red-950/40 text-red-100 transition hover:border-red-300/60 hover:bg-red-900/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
          aria-label={t("common.navigation.close")}
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <header className="space-y-2 pr-14">
          <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
            {copy.subtitle}
          </p>
          <h2 id={titleId} className="text-2xl font-semibold text-red-50 sm:text-3xl">
            {copy.title}
          </h2>
          <p
            id={descriptionId}
            className="text-sm text-red-200/75"
          >
            {copy.changes.helper}
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {copy.metadata.map((meta) => (
            <RedSurface
              key={meta.label}
              tone="glass"
              className="rounded-2xl p-4 text-sm"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/65">
                {meta.label}
              </p>
              <p className="mt-2 font-semibold text-red-50">{meta.value}</p>
            </RedSurface>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <div
            role="tablist"
            aria-label={copy.title}
            className="flex flex-wrap gap-2"
          >
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  id={`${tab.id}-tab`}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200",
                    isActive
                      ? "border-red-400/50 bg-red-500/20 text-red-50"
                      : "border-red-400/20 bg-red-900/40 text-red-200 hover:border-red-400/35 hover:bg-red-900/55",
                  )}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-[22px] border border-red-400/20 bg-red-950/50 p-4 sm:p-6">
            <div
              id="changes-panel"
              role="tabpanel"
              aria-labelledby="changes-tab"
              hidden={activeTab !== "changes"}
              className={activeTab === "changes" ? "block" : "hidden"}
            >
              <ChangesTab data={copy.changes} />
            </div>
            <div
              id="overview-panel"
              role="tabpanel"
              aria-labelledby="overview-tab"
              hidden={activeTab !== "overview"}
              className={activeTab === "overview" ? "block" : "hidden"}
            >
              <OverviewTab data={copy.overview} />
            </div>
            <div
              id="heatmap-panel"
              role="tabpanel"
              aria-labelledby="heatmap-tab"
              hidden={activeTab !== "heatmap"}
              className={activeTab === "heatmap" ? "block" : "hidden"}
            >
              <HeatmapTab data={copy.heatmap} />
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}

function ChangesTab({ data }: { data: CommitsModalCopy["changes"] }): ReactElement {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-50">{data.heading}</h3>
        <p className="text-sm text-red-200/75">{data.helper}</p>
      </div>

      <div className="space-y-4">
        {data.items.map((item) => (
          <RedSurface
            key={item.id}
            tone="glass"
            className="space-y-4 rounded-3xl p-5 text-red-50"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-2xl px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em]", badgeToneClasses[item.badgeTone])}>
                    {item.badge}
                  </span>
                  <span className="rounded-xl border border-red-400/25 bg-red-900/40 px-3 py-1 text-xs uppercase tracking-[0.25em] text-red-200/75">
                    {item.identifier}
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-red-50">{item.title}</h4>
              </div>
              <div className="text-right text-sm text-red-200/70">
                <p>{item.author}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/60">
                  {item.timestamp}
                </p>
              </div>
            </div>
            <p className="text-sm text-red-100/80">{item.description}</p>
            <div className="flex flex-wrap gap-3 text-xs text-red-100/80">
              {item.stats.map((stat) => (
                <RedSurface
                  key={stat.label}
                  tone="glass"
                  className="rounded-2xl px-3 py-1"
                >
                  <span className="font-semibold text-red-50">{stat.value}</span>{" "}
                  <span className="text-red-200/70">{stat.label}</span>
                </RedSurface>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-red-200/75">
              <span className="uppercase tracking-[0.25em]">{item.reviewersLabel}</span>
              <div className="flex flex-wrap gap-2">
                {item.reviewers.map((reviewer) => (
                  <span
                    key={reviewer}
                    className="inline-flex items-center rounded-xl border border-red-400/25 bg-red-900/40 px-3 py-1 text-red-100/80"
                  >
                    {reviewer}
                  </span>
                ))}
              </div>
            </div>
            {item.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2 text-xs text-red-200/70">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-red-400/20 bg-red-900/50 px-3 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </RedSurface>
        ))}
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-red-200/70">
          {data.pipeline.heading}
        </h4>
        <div className="grid gap-2 sm:grid-cols-3">
          {data.pipeline.items.map((item) => (
            <RedSurface
              key={item.label}
              tone="glass"
              className="rounded-2xl p-4 text-sm text-red-100/80"
            >
              <p className="font-semibold text-red-50">{item.label}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-red-200/70">
                {item.status}
              </p>
            </RedSurface>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ data }: { data: CommitsModalCopy["overview"] }): ReactElement {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-50">{data.heading}</h3>
        <p className="text-sm text-red-200/75">{data.helper}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {data.summary.map((metric) => (
          <RedSurface
            key={metric.label}
            tone="glass"
            className="rounded-2xl p-4"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {metric.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-red-50">
              {metric.value}
            </p>
            <p className="mt-1 text-xs text-red-200/70">{metric.helper}</p>
          </RedSurface>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <RedSurface tone="glass" className="space-y-4 rounded-3xl p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-red-200/70">
            {data.quality.heading}
          </h4>
          <ul className="space-y-3">
            {data.quality.items.map((item) => (
              <li key={item.label} className="rounded-2xl border border-red-400/20 bg-red-900/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-red-50">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-red-100/75">{item.helper}</p>
              </li>
            ))}
          </ul>
        </RedSurface>

        <RedSurface tone="glass" className="space-y-4 rounded-3xl p-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-red-200/70">
            {data.highlights.heading}
          </h4>
          <ul className="space-y-3 text-sm text-red-100/80">
            {data.highlights.items.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-red-400/20 bg-red-900/40 p-4"
              >
                <p className="font-semibold text-red-50">{item.title}</p>
                <p className="mt-1">{item.detail}</p>
              </li>
            ))}
          </ul>
        </RedSurface>
      </div>
    </div>
  );
}

function HeatmapTab({ data }: { data: CommitsModalCopy["heatmap"] }): ReactElement {
  const dayLabels = data.weeks[0]?.days.map((day) => day.label) ?? [];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-red-50">{data.heading}</h3>
        <p className="text-sm text-red-200/75">{data.helper}</p>
      </div>

      <div className="flex flex-col gap-3 overflow-x-auto">
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-red-200/60">
            {dayLabels.map((label) => (
              <span key={label} className="flex h-7 w-12 items-center">
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {data.weeks.map((week) => (
              <div key={week.label} className="flex flex-col items-center gap-1">
                {week.days.map((day) => (
                  <span
                    key={`${week.label}-${day.label}`}
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-semibold text-red-50/80 transition",
                      heatmapIntensityClasses[day.intensity],
                    )}
                    title={`${day.tooltip} · ${day.label}`}
                    aria-label={`${day.tooltip} · ${day.label} · ${week.label}`}
                  />
                ))}
                <span className="mt-1 text-[10px] uppercase tracking-[0.25em] text-red-200/60">
                  {week.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-red-200/70">
          <div className="flex items-center gap-2">
            <span className={cn("h-4 w-6 rounded-md", heatmapIntensityClasses.none)} aria-hidden />
            <span>{data.legend.none}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("h-4 w-6 rounded-md", heatmapIntensityClasses.low)} aria-hidden />
            <span>{data.legend.low}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("h-4 w-6 rounded-md", heatmapIntensityClasses.medium)} aria-hidden />
            <span>{data.legend.medium}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("h-4 w-6 rounded-md", heatmapIntensityClasses.high)} aria-hidden />
            <span>{data.legend.high}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.callouts.items.map((callout) => (
          <RedSurface
            key={callout.label}
            tone="glass"
            className="rounded-2xl p-4 text-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {callout.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-red-50">
              {callout.value}
            </p>
          </RedSurface>
        ))}
      </div>

      <p className="text-xs text-red-200/70">{data.footnote}</p>
    </div>
  );
}

export default CommitsPrsModal;
