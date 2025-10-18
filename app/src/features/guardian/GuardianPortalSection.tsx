import { useMemo, useCallback, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import {
  CalendarDays,
  ClipboardCheck,
  CreditCard,
  MessageCircle,
  ShieldCheck,
} from "../../lucide-react";

const attendancePattern = [
  { dayKey: "mon", percentage: 100 },
  { dayKey: "tue", percentage: 80 },
  { dayKey: "wed", percentage: 100 },
  { dayKey: "thu", percentage: 60 },
  { dayKey: "fri", percentage: 100 },
  { dayKey: "sat", percentage: 40 },
  { dayKey: "sun", percentage: 0 },
] as const;

const upcomingEvents = [
  { id: "regional", labelKey: "regional" },
  { id: "parentForum", labelKey: "parentForum" },
] as const;

type FeedKey = "attendance" | "billing" | "events";

type FeedItem = {
  key: FeedKey;
  badge: string;
  title: string;
  description: string;
  timestamp: string;
  Icon: typeof CalendarDays;
};

type MessageTone = "coach" | "guardian";

type Message = {
  id: string;
  author: string;
  role: string;
  body: string;
  timestamp: string;
  tone: MessageTone;
};

function GuardianPortalSection() {
  const { t } = useTranslation();

  const summaryCards = useMemo(
    () =>
      [
        {
          key: "attendance",
          label: t("guardianPortal.summaryCards.attendance.label"),
          value: t("guardianPortal.summaryCards.attendance.value"),
          helper: t("guardianPortal.summaryCards.attendance.helper"),
        },
        {
          key: "billing",
          label: t("guardianPortal.summaryCards.billing.label"),
          value: t("guardianPortal.summaryCards.billing.value"),
          helper: t("guardianPortal.summaryCards.billing.helper"),
        },
        {
          key: "events",
          label: t("guardianPortal.summaryCards.events.label"),
          value: t("guardianPortal.summaryCards.events.value"),
          helper: t("guardianPortal.summaryCards.events.helper"),
        },
      ] as const,
    [t],
  );

  const feedItems = useMemo<readonly FeedItem[]>(
    () =>
      [
        {
          key: "attendance",
          badge: t("guardianPortal.feed.items.attendance.badge"),
          title: t("guardianPortal.feed.items.attendance.title"),
          description: t("guardianPortal.feed.items.attendance.description"),
          timestamp: t("guardianPortal.feed.items.attendance.timestamp"),
          Icon: ClipboardCheck,
        },
        {
          key: "billing",
          badge: t("guardianPortal.feed.items.billing.badge"),
          title: t("guardianPortal.feed.items.billing.title"),
          description: t("guardianPortal.feed.items.billing.description"),
          timestamp: t("guardianPortal.feed.items.billing.timestamp"),
          Icon: CreditCard,
        },
        {
          key: "events",
          badge: t("guardianPortal.feed.items.events.badge"),
          title: t("guardianPortal.feed.items.events.title"),
          description: t("guardianPortal.feed.items.events.description"),
          timestamp: t("guardianPortal.feed.items.events.timestamp"),
          Icon: CalendarDays,
        },
      ],
    [t],
  );

  const messages = useMemo<readonly Message[]>(
    () =>
      [
        {
          id: "coach-1",
          author: t("guardianPortal.messaging.messages.masterLewis.author"),
          role: t("guardianPortal.messaging.messages.masterLewis.role"),
          body: t("guardianPortal.messaging.messages.masterLewis.body"),
          timestamp: t("guardianPortal.messaging.messages.masterLewis.timestamp"),
          tone: "coach",
        },
        {
          id: "guardian-1",
          author: t("guardianPortal.messaging.messages.guardian.author"),
          role: t("guardianPortal.messaging.messages.guardian.role"),
          body: t("guardianPortal.messaging.messages.guardian.body"),
          timestamp: t("guardianPortal.messaging.messages.guardian.timestamp"),
          tone: "guardian",
        },
        {
          id: "coach-2",
          author: t("guardianPortal.messaging.messages.masterLewisFollowUp.author"),
          role: t("guardianPortal.messaging.messages.masterLewisFollowUp.role"),
          body: t("guardianPortal.messaging.messages.masterLewisFollowUp.body"),
          timestamp: t("guardianPortal.messaging.messages.masterLewisFollowUp.timestamp"),
          tone: "coach",
        },
      ],
    [t],
  );

  const quickReplies = useMemo(
    () =>
      [
        t("guardianPortal.messaging.quickReplies.transport"),
        t("guardianPortal.messaging.quickReplies.billing"),
        t("guardianPortal.messaging.quickReplies.checkIn"),
      ],
    [t],
  );

  const handleCompose = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-red-200/80">
          <ShieldCheck size={14} />
          {t("guardianPortal.badge")}
        </p>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-red-50 sm:text-3xl">
            {t("guardianPortal.title")}
          </h1>
          <p className="max-w-2xl text-sm text-red-100/80 sm:text-base">
            {t("guardianPortal.description")}
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {summaryCards.map((card) => (
              <RedSurface
                key={card.key}
                tone="muted"
                className="space-y-2 p-4 sm:p-5"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">
                  {card.label}
                </p>
                <p className="text-xl font-semibold text-red-50">
                  {card.value}
                </p>
                <p className="text-xs text-red-100/70">{card.helper}</p>
              </RedSurface>
            ))}
          </div>

          <RedSurface tone="muted" className="space-y-6 p-5 sm:p-6">
            <header className="space-y-1">
              <h2 className="text-lg font-semibold text-red-50">
                {t("guardianPortal.feed.heading")}
              </h2>
              <p className="text-sm text-red-100/80">
                {t("guardianPortal.feed.helper")}
              </p>
            </header>

            <ul className="space-y-4">
              {feedItems.map((item) => (
                <li
                  key={item.key}
                  className="rounded-2xl border border-red-500/20 bg-red-950/40 p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <span className="flex h-11 w-11 items-center justify-center self-start rounded-2xl border border-red-500/40 bg-red-500/15 text-red-100">
                      <item.Icon size={20} />
                    </span>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">
                          {item.badge}
                        </p>
                        <p className="text-xs text-red-200/60">{item.timestamp}</p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-base font-semibold text-red-50">
                          {item.title}
                        </h3>
                        <p className="text-sm text-red-100/80">
                          {item.description}
                        </p>
                      </div>

                      {item.key === "attendance" ? (
                        <div className="space-y-3">
                          <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                            {t("guardianPortal.feed.items.attendance.patternLabel")}
                          </p>
                          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 sm:gap-3">
                            {attendancePattern.map((day) => (
                              <div
                                key={day.dayKey}
                                className="space-y-2 text-center"
                              >
                                <div className="flex h-20 items-end justify-center rounded-2xl border border-red-500/25 bg-red-950/40">
                                  <span
                                    className="w-8 rounded-full bg-red-500"
                                    style={{ height: `${day.percentage}%` }}
                                  />
                                </div>
                                <p className="text-[11px] uppercase tracking-[0.28em] text-red-200/70">
                                  {t(`guardianPortal.feed.items.attendance.days.${day.dayKey}`)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-red-200/70">
                            {t("guardianPortal.feed.items.attendance.callout")}
                          </p>
                        </div>
                      ) : null}

                      {item.key === "billing" ? (
                        <div className="grid gap-3 rounded-2xl border border-red-500/20 bg-red-950/40 p-4 text-sm text-red-100/85 sm:grid-cols-2">
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.28em] text-red-200/70">
                              {t("guardianPortal.feed.items.billing.balanceLabel")}
                            </p>
                            <p className="text-base font-semibold text-red-50">
                              {t("guardianPortal.feed.items.billing.balanceValue")}
                            </p>
                            <p className="text-xs text-red-200/70">
                              {t("guardianPortal.feed.items.billing.balanceHelper")}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs uppercase tracking-[0.28em] text-red-200/70">
                              {t("guardianPortal.feed.items.billing.autopayLabel")}
                            </p>
                            <p className="text-base font-semibold text-red-50">
                              {t("guardianPortal.feed.items.billing.autopayValue")}
                            </p>
                            <p className="text-xs text-red-200/70">
                              {t("guardianPortal.feed.items.billing.autopayHelper")}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {item.key === "events" ? (
                        <ul className="space-y-3 rounded-2xl border border-red-500/20 bg-red-950/40 p-4 text-sm text-red-100/85">
                          {upcomingEvents.map((event) => (
                            <li key={event.id} className="space-y-1">
                              <p className="font-semibold text-red-50">
                                {t(`guardianPortal.feed.items.events.list.${event.labelKey}.title`)}
                              </p>
                              <p className="text-xs uppercase tracking-[0.28em] text-red-200/70">
                                {t(`guardianPortal.feed.items.events.list.${event.labelKey}.date`)}
                              </p>
                              <p className="text-xs text-red-200/70">
                                {t(`guardianPortal.feed.items.events.list.${event.labelKey}.helper`)}
                              </p>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </RedSurface>
        </div>

        <div className="space-y-6">
          <RedSurface tone="muted" className="flex h-full flex-col gap-5 p-5 sm:p-6">
            <header className="space-y-1">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-red-50">
                <MessageCircle size={20} className="text-red-200/80" />
                {t("guardianPortal.messaging.heading")}
              </h2>
              <p className="text-sm text-red-100/80">
                {t("guardianPortal.messaging.helper")}
              </p>
            </header>

            <div className="space-y-4 overflow-hidden">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.tone === "guardian" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] space-y-1 rounded-2xl border px-4 py-3 text-sm sm:max-w-[260px] ${
                      message.tone === "guardian"
                        ? "border-red-400/40 bg-red-500/20 text-red-50"
                        : "border-red-500/20 bg-red-950/45 text-red-100"
                    }`}
                  >
                    <p className="font-semibold text-red-50/95">
                      {message.author}
                    </p>
                    <p className="text-xs uppercase tracking-[0.25em] text-red-200/70">
                      {message.role}
                    </p>
                    <p className="text-sm text-red-50/90">{message.body}</p>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-red-200/60">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleCompose} className="space-y-3">
              <label
                className="text-xs uppercase tracking-[0.3em] text-red-200/70"
                htmlFor="guardian-message"
              >
                {t("guardianPortal.messaging.composer.label")}
              </label>
              <textarea
                id="guardian-message"
                name="guardian-message"
                rows={3}
                className="w-full rounded-2xl border border-red-500/25 bg-red-950/50 px-4 py-3 text-sm text-red-50 placeholder:text-red-200/50 focus:border-red-400/60 focus:outline-none focus:ring-2 focus:ring-red-400/30"
                placeholder={t("guardianPortal.messaging.composer.placeholder") ?? ""}
              />
              <div className="flex flex-wrap items-center gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="rounded-full border border-red-500/30 bg-red-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-red-100 transition hover:border-red-400/60 hover:bg-red-500/15 hover:text-red-50"
                  >
                    {reply}
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-50 transition hover:border-red-400/70 hover:bg-red-500/25"
                >
                  {t("guardianPortal.messaging.composer.cta")}
                </button>
              </div>
            </form>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default GuardianPortalSection;
