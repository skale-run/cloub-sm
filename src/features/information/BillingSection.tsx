import type { ReactElement } from 'react'

const invoices = [
  {
    id: 'INV-2045',
    label: 'Spring membership dues',
    dueDate: 'Apr 25, 2025',
    amount: '$180.00',
    status: 'Pending',
  },
  {
    id: 'INV-2040',
    label: 'Strength lab access',
    dueDate: 'Mar 18, 2025',
    amount: '$60.00',
    status: 'Paid',
  },
  {
    id: 'INV-2037',
    label: 'Travel contribution · Indoor finals',
    dueDate: 'Feb 02, 2025',
    amount: '$125.00',
    status: 'Paid',
  },
]

function BillingSection(): ReactElement {
  return (
    <section id="billing" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Billing overview</h2>
          <p className="text-sm text-slate-400/80">
            Keep track of recurring fees, add-ons and outstanding balances in one place.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-rose-100">
          <span>Balance</span>
          <span className="text-sm font-semibold text-white">$180.00</span>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6 shadow-[0_22px_55px_rgba(8,15,35,0.45)]">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400/70">Auto-pay</p>
            <p className="text-sm text-slate-300/90">Enabled for monthly subscriptions</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:border-rose-400/60 hover:bg-rose-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
          >
            Update payment method
          </button>
        </header>

        <div className="overflow-hidden rounded-2xl border border-white/5">
          <table className="min-w-full divide-y divide-white/5 text-left text-sm text-slate-200">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.3em] text-slate-400/70">
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
            <tbody className="divide-y divide-white/5 bg-slate-950/40">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-4 py-3 font-semibold text-white">{invoice.label}</td>
                  <td className="px-4 py-3 text-slate-300/90">{invoice.dueDate}</td>
                  <td className="px-4 py-3 font-medium text-slate-200">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                        invoice.status === 'Paid'
                          ? 'border-rose-400/40 bg-rose-500/15 text-rose-100'
                          : 'border-amber-400/40 bg-amber-500/15 text-amber-100'
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default BillingSection
