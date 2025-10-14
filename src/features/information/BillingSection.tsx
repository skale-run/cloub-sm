import { useMemo, useState, type ReactElement } from "react";
import RedSurface from "../../components/RedSurface";
import { CalendarDays, CreditCard } from "../../lucide-react";

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const invoices = [
  {
    id: "INV-2045",
    label: "Spring membership dues",
    dueDate: "Apr 25, 2025",
    amount: "$180.00",
    status: "Pending",
  },
  {
    id: "INV-2040",
    label: "Strength lab access",
    dueDate: "Mar 18, 2025",
    amount: "$60.00",
    status: "Paid",
  },
  {
    id: "INV-2037",
    label: "Travel contribution · Indoor finals",
    dueDate: "Feb 02, 2025",
    amount: "$125.00",
    status: "Paid",
  },
];

const summaryCards = [
  {
    id: "balance",
    label: "Outstanding balance",
    value: "$180.00",
    helper: "Due Apr 25, 2025",
    tone: "border-amber-400/40 bg-amber-500/10 text-amber-100",
  },
  {
    id: "autopay",
    label: "Next auto-pay",
    value: "May 01, 2025",
    helper: "Spring membership dues",
    tone: "border-red-400/45 bg-red-500/15 text-red-100",
  },
  {
    id: "last-payment",
    label: "Last payment received",
    value: "$60.00",
    helper: "Posted Mar 18, 2025",
    tone: "border-red-400/25 bg-red-500/10 text-red-50",
  },
];

const upcomingCharges = [
  {
    id: "charge-1",
    label: "Team physiotherapy block",
    date: "May 08, 2025",
    amount: "$45.00",
  },
  {
    id: "charge-2",
    label: "Facility upgrade levy",
    date: "Jun 12, 2025",
    amount: "$25.00",
  },
  {
    id: "charge-3",
    label: "Summer travel fund",
    date: "Jul 01, 2025",
    amount: "$90.00",
  },
];

const paymentMethods = [
  {
    id: "card",
    label: "Primary payment method",
    detail: "Visa •••• 4298",
    expires: "Exp. 08/27",
    status: "Auto-pay enabled",
  },
  {
    id: "backup",
    label: "Backup payment method",
    detail: "Checking · First Peninsula Bank",
    status: "Used for overdue balances",
  },
];

function BillingSection(): ReactElement {
  const filters: Array<"All" | "Pending" | "Paid"> = [
    "All",
    "Pending",
    "Paid",
  ];

  const [statusFilter, setStatusFilter] = useState<(typeof filters)[number]>(
    "All",
  );

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const numericAmount = Number(invoice.amount.replace(/[^0-9.-]+/g, ""));

        if (Number.isNaN(numericAmount)) {
          return acc;
        }

        if (invoice.status === "Pending") {
          acc.pendingCount += 1;
          acc.pendingTotal += numericAmount;
        }

        if (invoice.status === "Paid") {
          acc.paidTotal += numericAmount;
        }

        acc.totalInvoices += 1;

        return acc;
      },
      { pendingCount: 0, pendingTotal: 0, paidTotal: 0, totalInvoices: 0 },
    );
  }, []);

  const filteredInvoices = useMemo(() => {
    if (statusFilter === "All") {
      return invoices;
    }

    return invoices.filter((invoice) => invoice.status === statusFilter);
  }, [statusFilter]);

  return (
    <section id="billing" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">
            Billing overview
          </h2>
          <p className="text-sm text-red-200/75">
            Keep track of recurring fees, add-ons and outstanding balances in
            one place.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span>Balance</span>
          <span className="text-sm font-semibold text-red-50">$180.00</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col gap-1 rounded-2xl border px-5 py-4 ${card.tone}`}
          >
            <span className="text-xs uppercase tracking-[0.32em] text-red-200/70">
              {card.label}
            </span>
            <span className="text-2xl font-semibold text-red-50">
              {card.value}
            </span>
            <span className="text-sm text-red-100/80">{card.helper}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <RedSurface tone="muted" className="space-y-6 p-6">
          <header className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                Invoices
              </p>
              <p className="text-sm text-red-100/80">
                Statement history for the past 6 months
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                Download statement
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/25 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/45 hover:bg-red-400/20 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                Send receipt
              </button>
            </div>
          </header>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid flex-1 gap-3 rounded-2xl border border-red-500/20 bg-red-950/35 p-4 sm:grid-cols-3">
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  Pending invoices
                </dt>
                <dd className="text-lg font-semibold text-amber-100">
                  {totals.pendingCount} due
                </dd>
                <dd className="text-xs text-amber-200/70">
                  {currencyFormatter.format(totals.pendingTotal)} outstanding
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  Paid this season
                </dt>
                <dd className="text-lg font-semibold text-red-100">
                  {currencyFormatter.format(totals.paidTotal)}
                </dd>
                <dd className="text-xs text-red-200/70">
                  Across {totals.totalInvoices - totals.pendingCount} invoices
                </dd>
              </div>
              <div className="space-y-1">
                <dt className="text-xs uppercase tracking-[0.3em] text-red-200/70">
                  Filters
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {filters.map((filter) => {
                    const isActive = statusFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setStatusFilter(filter)}
                        className={`inline-flex items-center rounded-2xl border px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300 ${
                          isActive
                            ? "border-red-400/60 bg-red-500/25 text-red-50"
                            : "border-red-400/25 bg-red-500/10 text-red-100 hover:border-red-400/45 hover:bg-red-400/20 hover:text-white"
                        }`}
                        aria-pressed={isActive}
                      >
                        {filter}
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
                    Invoice
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Due date
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-500/15 bg-red-950/35">
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-3 font-semibold text-red-50">
                        {invoice.label}
                      </td>
                      <td className="px-4 py-3 text-red-100/80">
                        {invoice.dueDate}
                      </td>
                      <td className="px-4 py-3 font-medium text-red-100">
                        {invoice.amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                            invoice.status === "Paid"
                              ? "border-red-400/40 bg-red-500/15 text-red-100"
                              : "border-amber-400/40 bg-amber-500/15 text-amber-100"
                          }`}
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
                      No invoices match the selected filter. Try another status to
                      review previous statements.
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
                  Auto-pay
                </p>
                <p className="text-sm text-red-100/80">
                  Enabled for monthly subscriptions
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-2xl border border-red-400/35 bg-red-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-red-100 transition hover:border-red-400/55 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
              >
                Manage
              </button>
            </header>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-950/35 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/15 text-red-100">
                    <CreditCard size={18} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-semibold text-red-50">
                      {method.label}
                    </p>
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
                  Upcoming charges
                </p>
                <p className="text-sm text-red-100/80">
                  Automatically scheduled through the season
                </p>
              </div>
              <CalendarDays className="text-red-200/70" size={20} />
            </header>

            <ul className="space-y-4">
              {upcomingCharges.map((charge) => (
                <li
                  key={charge.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-red-500/20 bg-red-950/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-semibold text-red-50">
                      {charge.label}
                    </p>
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
