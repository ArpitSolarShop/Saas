'use client';

const MOCK_INVOICES = [
  { id: 'INV-2026-001', customer: 'Acme Corp', amount: 450.00, status: 'Paid', date: 'Mar 01' },
  { id: 'INV-2026-002', customer: 'Startup Inc', amount: 1200.00, status: 'Overdue', date: 'Feb 15' },
  { id: 'INV-2026-003', customer: 'Global Tech', amount: 89.99, status: 'Unpaid', date: 'Mar 05' },
];

export default function BillingDashboard() {
  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">Billing & Subscriptions</h1>
          <p className="text-sm text-slate-500">Manage customer subscriptions, Stripe invoices, and recurring revenue.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm transition-colors">Stripe Settings</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-violet-600 text-white hover:bg-violet-700 font-medium shadow-sm transition-colors">+ New Invoice</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* KPI & Plans */}
        <div className="col-span-1 space-y-6">
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500 mb-2">Monthly Recurring Revenue (MRR)</h3>
            <p className="text-4xl font-bold text-slate-800">$14,250 <span className="text-sm font-medium text-emerald-500 ml-2">↑ 12%</span></p>
          </div>

          <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 font-semibold text-slate-800">Active Plans</div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg bg-slate-50">
                <div>
                  <p className="font-bold text-slate-700">Starter Plan</p>
                  <p className="text-xs text-slate-500">$29/mo</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-violet-600">142</p>
                  <p className="text-[10px] text-slate-400">Subscribers</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg bg-violet-50 border-violet-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 py-0.5 px-3 bg-violet-600 text-white text-[8px] font-bold uppercase rounded-bl-lg">Popular</div>
                <div>
                  <p className="font-bold text-violet-900">Pro Plan</p>
                  <p className="text-xs text-violet-700/70">$99/mo</p>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-violet-600">85</p>
                  <p className="text-[10px] text-violet-500">Subscribers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="col-span-2 border rounded-xl bg-white shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">🧾 Recent Invoices</h3>
            <span className="text-xs text-slate-500 hover:text-violet-600 cursor-pointer font-medium">View All →</span>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500 border-b">
              <tr>
                <th className="p-4 font-medium">Invoice ID</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium text-right">Amount</th>
                <th className="p-4 font-medium text-center">Status</th>
                <th className="p-4 font-medium text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-800">
              {MOCK_INVOICES.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="p-4 font-mono font-medium text-slate-500 hover:text-violet-600 transition-colors">{inv.id}</td>
                  <td className="p-4 font-semibold text-slate-700">{inv.customer}</td>
                  <td className="p-4 text-right font-medium">${inv.amount.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase 
                        ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        inv.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-slate-500">{inv.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
