import { useMemo, useState, type ReactElement } from "react";
import { useTranslation } from "react-i18next";
import RedSurface from "../../components/RedSurface";
import { CalendarDays, CreditCard } from "../../lucide-react";

const filters = ["all", "pending", "paid"] as const;

type InvoiceStatus = "pending" | "paid";

type Invoice = {
  id: string;
  translationKey:
    | "springMembershipDues"
    | "strengthLabAccess"
    | "travelContribution";
  dueDateKey:
    | "apr252025"
    | "mar182025"
    | "feb022025";
  amount: number;
  status: InvoiceStatus;
};

const invoices: Invoice[] = [
  {
    id: "INV-2045",
    translationKey: "springMembershipDues",
    dueDateKey: "apr252025",
    amount: 180,
    status: "pending",
  },
  {
    id: "INV-2040",
    translationKey: "strengthLabAccess",
    dueDateKey: "mar182025",
    amount: 60,
    status: "paid",
  },
  {
    id: "INV-2037",
    translationKey: "travelContribution",
    dueDateKey: "feb022025",
    amount: 125,
    status: "paid",
  },
];

type SummaryCardKey = "balance" | "autopay" | "lastPayment";

type SummaryCardConfig = {
  key: SummaryCardKey;
  tone: string;
  amount?: number;
};

const summaryCards: SummaryCardConfig[] = [
  {
    key: "balance",
    tone: "border-amber-400/40 bg-amber-500/10 text-amber-100",
    amount: 180,
  },
  {
    key: "autopay",
    tone: "border-red-400/45 bg-red-500/15 text-red-100",
  },
  {
    key: "lastPayment",
    tone: "border-red-400/25 bg-red-500/10 text-red-50",
    amount: 60,
  },
];

type UpcomingChargeKey = "physiotherapyBlock" | "facilityLevy" | "summerTravelFund";

const upcomingCharges: Array<{
  id: string;
  key: UpcomingChargeKey;
  dateKey: "may082025" | "jun122025" | "jul012025";
  amount: number;
}> = [
  {
    id: "charge-1",
    key: "physiotherapyBlock",
    dateKey: "may082025",
    amount: 45,
  },
  {
    id: "charge-2",
    key: "facilityLevy",
    dateKey: "jun122025",
    amount: 25,
  },
  {
    id: "charge-3",
    key: "summerTravelFund",
    dateKey: "jul012025",
    amount: 90,
  },
];

type PaymentMethodKey = "primaryCard" | "backupAccount";

const paymentMethods: Array<{
  id: PaymentMethodKey;
  detailKey: string;
  statusKey: string;
  expiresKey?: string;
}> = [
  {
    id: "primaryCard",
    detailKey: "information.billing.paymentMethods.primaryCard.detail",
    statusKey: "information.billing.paymentMethods.primaryCard.status",
    expiresKey: "information.billing.paymentMethods.primaryCard.expires",
  },
  {
    id: "backupAccount",
    detailKey: "information.billing.paymentMethods.backupAccount.detail",
    statusKey: "information.billing.paymentMethods.backupAccount.status",
  },
];

function BillingSection(): ReactElement {
  const { t, i18n } = useTranslation();
  const [statusFilter, setStatusFilter] = useState<(typeof filters)[number]>(
    "all",
  );

  const locale = i18n.language.startsWith("ar") ? "ar-EG" : "en-US";

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }),
    [locale],
  );

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        if (invoice.status === "pending") {
          acc.pendingCount += 1;
          acc.pendingTotal += invoice.amount;
        }

        if (invoice.status === "paid") {
          acc.paidTotal += invoice.amount;
        }

        acc.totalInvoices += 1;

        return acc;
      },
      { pendingCount: 0, pendingTotal: 0, paidTotal: 0, totalInvoices: 0 },
    );
  }, []);

  const filteredInvoices = useMemo(() => {
    if (statusFilter === "all") {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === statusFilter);
  }, [statusFilter]);

  const balanceAmount = currencyFormatter.format(totals.pendingTotal);

  const summaryCardContent = useMemo(
    () =>
      summaryCards.map((card) => {
        const amount =
          typeof card.amount === "number"
            ? currencyFormatter.format(card.amount)
            : undefined;

        return {
          key: card.key,
          tone: card.tone,
          label: t(`information.billing.summaryCards.${card.key}.label`),
          value:
            typeof amount === "string"
              ? t(`information.billing.summaryCards.${card.key}.value`, {
                  amount,
                })
              : t(`information.billing.summaryCards.${card.key}.value`),
          helper: t(`information.billing.summaryCards.${card.key}.helper`),
        };
      }),
    [currencyFormatter, t],
  );

  const filterOptions = useMemo(
    () =>
      filters.map((filter) => ({
        id: filter,
        label: t(`information.billing.invoices.filters.items.${filter}`),
      })),
    [t],
  );

  const invoiceRows = useMemo(
    () =>
      filteredInvoices.map((invoice) => ({
        id: invoice.id,
        label: t(
          `information.billing.invoices.items.${invoice.translationKey}.label`,
        ),
        dueDate: t(
          `information.billing.invoices.items.${invoice.translationKey}.dueDate.${invoice.dueDateKey}`,
        ),
        amount: currencyFormatter.format(invoice.amount),
        status: t(`information.billing.invoices.statuses.${invoice.status}`),
        statusTone:
          invoice.status === "paid"
            ? "border-red-400/40 bg-red-500/15 text-red-100"
            : "border-amber-400/40 bg-amber-500/15 text-amber-100",
      })),
    [currencyFormatter, filteredInvoices, t],
  );

  const paymentMethodItems = useMemo(
    () =>
      paymentMethods.map((method) => ({
        id: method.id,
        label: t(`information.billing.paymentMethods.${method.id}.label`),
        detail: t(method.detailKey),
        expires: method.expiresKey ? t(method.expiresKey) : undefined,
        status: t(method.statusKey),
      })),
    [t],
  );

  const upcomingChargeItems = useMemo(
    () =>
      upcomingCharges.map((charge) => ({
        id: charge.id,
        label: t(
          `information.billing.upcomingCharges.items.${charge.key}.label`,
        ),
        date: t(
          `information.billing.upcomingCharges.items.${charge.key}.date.${charge.dateKey}`,
        ),
        amount: currencyFormatter.format(charge.amount),
      })),
    [currencyFormatter, t],
  );

  return (
    <section id="billing" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            {t("information.billing.heading")}
          </h2>
          <p className="text-sm text-red-200/75">
            {t("information.billing.description")}
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span>{t("information.billing.balanceBadge.label")}</span>
          <span className="text-sm font-semibold text-red-50">
            {t("information.billing.balanceBadge.value", {
              amount: balanceAmount,
            })}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCardContent.map((card) => (
          <div
            key={card.key}
            className={`flex flex-col gap-1 rounded-2xl border px-5 py-4 ${card.tone}`}
          >
            <span className="text-xs uppercase tracking-[0.32em] text-red-200/70">
              {card.label}
            </span>
            <span className="text-2xl font-semibold text-red-50">{card.value}</span>
            <span className="text-sm text-red-100/80">{card.helper}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <RedSurface tone="muted" className="space-y-6 p-6">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                {t("information.billing.invoices.heading")}
              </p>
              <p className="text-sm text-red-100/80">
                {t("information.billing.invoices.helper")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                {t("information.billing.invoices.download")}
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/45 hover:bg-red-400/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                {t("information.billing.invoices.sendReceipt")}
              </button>
            </div>
          </header>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid flex-1 gap-3 rounded-2xl border border-red-500/20 bg-red-950/35 p-4 sm:grid-cols-3">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.billing.invoices.pending.label")}
                </dt>
                <dd className="text-lg font-semibold text-amber-100">
                  {t("information.billing.invoices.pending.count", {
                    count: totals.pendingCount,
                  })}
                </dd>
                <dd className="text-xs text-amber-200/70">
                  {t("information.billing.invoices.pending.total", {
                    amount: currencyFormatter.format(totals.pendingTotal),
                  })}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.billing.invoices.paid.label")}
                </dt>
                <dd className="text-lg font-semibold text-red-100">
                  {t("information.billing.invoices.paid.total", {
                    amount: currencyFormatter.format(totals.paidTotal),
                  })}
                </dd>
                <dd className="text-xs text-red-200/70">
                  {t("information.billing.invoices.paid.count", {
                    count: totals.totalInvoices - totals.pendingCount,
                  })}
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.billing.invoices.filters.label")}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => {
                    const isActive = statusFilter === filter.id;

                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setStatusFilter(filter.id)}
                        className={`inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                          isActive
                            ? "border-red-400/60 bg-red-500/25 text-red-50"
                            : "border-red-400/25 bg-red-500/10 text-red-100 hover:border-red-400/45 hover:bg-red-400/20 hover:text-white"
                        }`}
                        aria-pressed={isActive}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                </dd>
              </div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-red-500/25">
            <table className="min-w-full divide-y divide-red-500/20 text-left text-sm text-red-50">
              <thead className="bg-red-950/40 text-xs uppercase tracking-[0.3em] text-red-200/70">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t("information.billing.invoices.table.invoice")}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t("information.billing.invoices.table.dueDate")}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t("information.billing.invoices.table.amount")}
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    {t("information.billing.invoices.table.status")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-500/15 bg-red-950/35">
                {invoiceRows.length > 0 ? (
                  invoiceRows.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-3 font-semibold text-red-50">
                        {invoice.label}
                      </td>
                      <td className="px-4 py-3 text-red-100/80">{invoice.dueDate}</td>
                      <td className="px-4 py-3 font-medium text-red-100">
                        {invoice.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${invoice.statusTone}`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-4 py-6 text-center text-sm text-red-100/70"
                      colSpan={4}
                    >
                      {t("information.billing.invoices.empty")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </RedSurface>

        <div className="space-y-6">
          <RedSurface tone="muted" className="space-y-5 p-6">
            <header className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.billing.autoPay.heading")}
                </p>
                <p className="text-sm text-red-100/80">
                  {t("information.billing.autoPay.helper")}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-100 transition hover:border-red-400/55 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                {t("information.billing.autoPay.manage")}
              </button>
            </header>

            <div className="space-y-3">
              {paymentMethodItems.map((method) => (
                <div
                  key={method.id}
                  className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-950/35 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/15 text-red-100">
                    <CreditCard size={18} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-red-50">{method.label}</p>
                    <p className="text-sm text-red-100/80">{method.detail}</p>
                    {method.expires ? (
                      <p className="text-xs uppercase tracking-[0.28em] text-red-200/70">
                        {method.expires}
                      </p>
                    ) : null}
                    <p className="text-xs text-red-200/70">{method.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </RedSurface>

          <RedSurface tone="muted" className="space-y-5 p-6">
            <header className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  {t("information.billing.upcomingCharges.heading")}
                </p>
                <p className="text-sm text-red-100/80">
                  {t("information.billing.upcomingCharges.helper")}
                </p>
              </div>
              <CalendarDays className="text-red-200/70" size={20} />
            </header>

            <ul className="space-y-4">
              {upcomingChargeItems.map((charge) => (
                <li
                  key={charge.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-950/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-red-50">{charge.label}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                      {charge.date}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-red-100">
                    {charge.amount}
                  </span>
                </li>
              ))}
            </ul>
          </RedSurface>
        </div>
      </div>
    </section>
  );
}

export default BillingSection;
