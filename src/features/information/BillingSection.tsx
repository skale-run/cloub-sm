import type { ReactElement } from 'react'
import RedSurface from '../../components/RedSurface'

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
          <h2 className="text-xl font-semibold text-red-50 sm:text-2xl">Billing overview</h2>
          <p className="text-sm text-red-200/75">
            Keep track of recurring fees, add-ons and outstanding balances in one place.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-3xl border border-red-400/45 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-100">
          <span>Balance</span>
          <span className="text-sm font-semibold text-red-50">$180.00</span>
        </div>
      </div>

      <RedSurface tone="muted" className="space-y-4 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-red-200/70">Auto-pay</p>
            <p className="text-sm text-red-100/80">Enabled for monthly subscriptions</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-2xl border border-red-400/40 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 transition hover:border-red-400/60 hover:bg-red-400/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
          >
            Update payment method
          </button>
        </header>

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
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-4 py-3 font-semibold text-red-50">{invoice.label}</td>
                  <td className="px-4 py-3 text-red-100/80">{invoice.dueDate}</td>
                  <td className="px-4 py-3 font-medium text-red-100">{invoice.amount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] ${
                        invoice.status === 'Paid'
                          ? 'border-red-400/40 bg-red-500/15 text-red-100'
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
      </RedSurface>
    </section>
  )
}

export default BillingSection
