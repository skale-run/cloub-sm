import type { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";

type SummaryMetric = {
  label: string;
  value: string;
  suffix?: string;
  change: string;
  changeDescriptor: string;
};

type TrendPoint = {
  label: string;
  performance: number;
  target: number;
};

type FocusItem = {
  title: string;
  detail: string;
};

type AlertItem = {
  title: string;
  detail: string;
};

function ProgressOverviewSection(): ReactElement {
  const { t } = useTranslation();

  const summaryMetrics = t("progressOverview.summaryMetrics", {
    returnObjects: true,
  }) as SummaryMetric[];

  const trendPoints = t("progressOverview.performanceTrend.points", {
    returnObjects: true,
  }) as TrendPoint[];

  const momentumFocus = t("progressOverview.momentumWatch.items", {
    returnObjects: true,
  }) as FocusItem[];

  const alerts = t("progressOverview.coachAlerts.items", {
    returnObjects: true,
  }) as AlertItem[];

  const getChangeTone = (change: string): string => {
    const normalized = change.trim();

    if (normalized.startsWith("-")) {
      return "text-rose-200";
    }

    if (normalized.startsWith("+")) {
      return "text-emerald-200";
    }

    return "text-amber-200";
  };

  return (
    <section id="progress-overview" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("progressOverview.heading")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("progressOverview.description")}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-red-400/35 bg-gradient-to-r from-red-500/20 via-red-500/10 to-transparent px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100 shadow-[0_12px_35px_rgba(248,113,113,0.25)]">
          {t("progressOverview.statusChip")}
        </span>
      </div>

      <RedSurface
        tone="muted"
        className="grid gap-4 rounded-3xl p-6 text-red-50 sm:grid-cols-2 lg:grid-cols-4"
      >
        {summaryMetrics.map((metric) => {
          const changeTone = getChangeTone(metric.change);

          return (
            <RedSurface
              key={metric.label}
              tone="glass"
              className="flex flex-col gap-3 rounded-2xl p-4 shadow-[0_18px_55px_rgba(127,29,29,0.3)]"
              role="presentation"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {metric.label}
                </p>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-semibold text-red-50">
                  {metric.value}
                </span>
                {metric.suffix ? (
                  <span className="text-base font-medium text-red-200/70">
                    {metric.suffix}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-red-200/70">
                <span className={`font-semibold ${changeTone}`}>{metric.change}</span>
                <span>{metric.changeDescriptor}</span>
              </div>
            </RedSurface>
          );
        })}
      </RedSurface>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface tone="muted" className="rounded-3xl p-6 text-red-50">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-red-50">
                {t("progressOverview.performanceTrend.heading")}
              </h3>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("progressOverview.performanceTrend.subheading")}
              </p>
            </div>
            <RedSurface
              tone="glass"
              className="rounded-2xl px-3 py-2 text-xs uppercase tracking-[0.25em] text-red-200"
            >
              {t("progressOverview.performanceTrend.chip")}
            </RedSurface>
          </header>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trendPoints.map((point) => {
              const performanceHeight = Math.max(0, Math.min(point.performance, 100));
              const targetHeight = Math.max(0, Math.min(point.target, 100));

              return (
                <RedSurface
                  key={point.label}
                  tone="glass"
                  className="flex h-full flex-col items-center gap-3 rounded-2xl p-4 text-center"
                >
                  <div className="relative flex h-40 w-full items-end justify-center overflow-hidden rounded-2xl border border-red-400/20 bg-red-950/40">
                    <div className="absolute inset-x-4 bottom-12 h-px bg-gradient-to-r from-red-500/20 via-red-400/40 to-red-500/20" />
                    <div className="relative flex h-full w-12 flex-col justify-end">
                      <div
                        role="progressbar"
                        aria-label={t("progressOverview.performanceTrend.pointSummary", {
                          performance: point.performance,
                          target: point.target,
                        })}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={performanceHeight}
                        className="rounded-t-xl bg-gradient-to-t from-red-500/75 via-red-400/75 to-red-300/75"
                        style={{ height: `${performanceHeight}%` }}
                      />
                      <div
                        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-red-200/70 bg-red-950 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]"
                        style={{ bottom: `${targetHeight}%` }}
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-xs text-red-100/80">
                    <p className="font-semibold uppercase tracking-[0.3em] text-red-200/70">
                      {point.label}
                    </p>
                    <p className="mt-1 text-red-100/70">
                      {t("progressOverview.performanceTrend.pointSummary", {
                        performance: point.performance,
                        target: point.target,
                      })}
                    </p>
                  </div>
                </RedSurface>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-100/80">
              {t("progressOverview.performanceTrend.summary")}
            </p>
            <RedSurface
              tone="glass"
              className="inline-flex min-w-[14rem] flex-col gap-1 rounded-2xl px-4 py-3 text-left"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("progressOverview.performanceTrend.focus.label")}
              </p>
              <p className="text-sm font-semibold text-red-50">
                {t("progressOverview.performanceTrend.focus.detail")}
              </p>
            </RedSurface>
          </div>
        </RedSurface>

        <RedSurface
          as="aside"
          tone="muted"
          className="flex flex-col gap-6 rounded-3xl p-6 text-red-50"
        >
          <div>
            <h3 className="text-lg font-semibold text-red-50">
              {t("progressOverview.momentumWatch.heading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {momentumFocus.map((focus) => (
                <RedSurface
                  key={focus.title}
                  as="li"
                  tone="glass"
                  className="rounded-2xl border border-red-400/20 bg-red-950/45 p-4"
                >
                  <p className="text-sm font-semibold text-red-50">{focus.title}</p>
                  <p className="mt-1 text-sm text-red-100/80">{focus.detail}</p>
                </RedSurface>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-50">
              {t("progressOverview.coachAlerts.heading")}
            </h3>
            <ul className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <RedSurface
                  key={alert.title}
                  as="li"
                  tone="glass"
                  className="rounded-2xl border border-red-400/20 bg-red-950/45 p-4"
                >
                  <p className="text-sm font-semibold text-red-50">{alert.title}</p>
                  <p className="mt-1 text-sm text-red-100/80">{alert.detail}</p>
                </RedSurface>
              ))}
            </ul>
          </div>
        </RedSurface>
      </div>
    </section>
  );
}

export default ProgressOverviewSection;
