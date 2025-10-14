import type { ReactElement } from "react";
import RedSurface from "../../components/RedSurface";

const summaryMetrics = [
  {
    label: "Quarter rating",
    value: "82",
    suffix: "/100",
    change: "+5.4",
    changeDescriptor: "vs. last quarter",
  },
  {
    label: "Target delta",
    value: "+3.1%",
    change: "Ahead",
    changeDescriptor: "of performance target",
  },
  {
    label: "Sessions completed",
    value: "47",
    change: "92%",
    changeDescriptor: "training adherence",
  },
  {
    label: "Recovery score",
    value: "86",
    suffix: "/100",
    change: "+6",
    changeDescriptor: "sleep efficiency",
  },
];

const trendPoints = [
  { label: "Jan", performance: 72, target: 70 },
  { label: "Feb", performance: 75, target: 72 },
  { label: "Mar", performance: 78, target: 75 },
  { label: "Apr", performance: 82, target: 78 },
];

const momentumFocus = [
  {
    title: "Speed work",
    detail: "Maintain contrast sprint sequencing 2x weekly.",
  },
  {
    title: "Strength block",
    detail: "Shift front squat emphasis to high velocity loads.",
  },
  {
    title: "Recovery",
    detail: "Protect Thursday as full regen + monitoring day.",
  },
];

const alerts = [
  {
    title: "Acceleration split",
    detail: "Average 30m time dropped by 0.11s · keep resisted sprint block.",
  },
  {
    title: "Strength progression",
    detail: "Back squat at 1.8x BW · maintain 3-week wave loading.",
  },
];

function ProgressOverviewSection(): ReactElement {
  return (
    <section id="progress-overview" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Progress insight
          </h2>
          <p className="text-sm text-red-200/75">
            Quarter-to-date progression towards the season performance targets.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-3xl border border-red-400/30 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-red-100">
          Ahead of plan
        </span>
      </div>

      <RedSurface
        tone="muted"
        className="grid gap-4 rounded-3xl p-6 text-red-50 sm:grid-cols-2 lg:grid-cols-4"
      >
        {summaryMetrics.map((metric) => (
          <RedSurface
            key={metric.label}
            tone="glass"
            className="flex flex-col gap-2 rounded-2xl p-4"
            role="presentation"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
              {metric.label}
            </p>
            <p className="text-3xl font-semibold text-red-50">
              {metric.value}
              {metric.suffix ? (
                <span className="text-base font-normal text-red-200/70">
                  {metric.suffix}
                </span>
              ) : null}
            </p>
            <p className="text-xs text-red-200/70">
              <span className="font-semibold text-red-100">{metric.change}</span>{" "}
              {metric.changeDescriptor}
            </p>
          </RedSurface>
        ))}
      </RedSurface>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <RedSurface tone="muted" className="rounded-3xl p-6 text-red-50">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-red-50">
                Performance trend
              </h3>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Season rating · updated weekly
              </p>
            </div>
            <RedSurface
              tone="glass"
              className="rounded-2xl px-3 py-2 text-xs uppercase tracking-[0.25em] text-red-200"
            >
              Target markers show quarter goals
            </RedSurface>
          </header>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {trendPoints.map((point) => (
              <div
                key={point.label}
                className="flex flex-col items-center gap-3"
              >
                <RedSurface
                  tone="glass"
                  className="relative flex h-40 w-full items-end justify-center overflow-hidden rounded-2xl p-3"
                >
                  <div className="absolute inset-x-3 bottom-12 h-px bg-gradient-to-r from-red-500/20 via-red-400/40 to-red-500/20" />
                  <div className="relative flex h-full w-10 flex-col justify-end">
                    <div
                      className="rounded-t-lg bg-gradient-to-t from-red-500/70 via-red-400/70 to-red-300/70"
                      style={{ height: `${point.performance}%` }}
                      aria-hidden
                    />
                    <div
                      className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-red-200/70 bg-red-950 shadow-[0_0_0_4px_rgba(248,113,113,0.1)]"
                      style={{ bottom: `calc(100% - ${point.target}%)` }}
                      aria-hidden
                    />
                  </div>
                </RedSurface>
                <div className="flex flex-col items-center text-center text-xs text-red-100/80">
                  <p className="font-semibold uppercase tracking-[0.3em] text-red-200/70">
                    {point.label}
                  </p>
                  <p className="mt-1 text-red-100/70">
                    {point.performance}% performance · {point.target}% target
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-red-100/80">
              Sustained improvement over the last four microcycles keeps the squad
              comfortably ahead of projected development. Maintain current training
              density, continue sleep tracking, and repeat readiness screening on
              Monday sessions.
            </p>
            <RedSurface
              tone="glass"
              className="inline-flex min-w-[14rem] flex-col gap-1 rounded-2xl px-4 py-3 text-left"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Focus next week
              </p>
              <p className="text-sm font-semibold text-red-50">
                Reinforce acceleration form during Tuesday and Friday technical blocks.
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
            <h3 className="text-lg font-semibold text-red-50">Momentum watch</h3>
            <ul className="mt-4 space-y-3">
              {momentumFocus.map((focus) => (
                <RedSurface
                  key={focus.title}
                  as="li"
                  tone="glass"
                  className="rounded-2xl p-4"
                >
                  <p className="text-sm font-semibold text-red-50">{focus.title}</p>
                  <p className="mt-1 text-sm text-red-100/80">{focus.detail}</p>
                </RedSurface>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-red-50">Coach alerts</h3>
            <ul className="mt-4 space-y-3">
              {alerts.map((alert) => (
                <RedSurface
                  key={alert.title}
                  as="li"
                  tone="glass"
                  className="rounded-2xl p-4"
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
