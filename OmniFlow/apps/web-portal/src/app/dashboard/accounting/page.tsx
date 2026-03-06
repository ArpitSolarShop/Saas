'use client';

import { useState } from 'react';

const MOCK_LEDGER = [
  { id: 'Jv-001', date: '2026-03-01', account: 'Cash Equivalent', debit: 5000.00, credit: 0, remarks: 'Client Retainer' },
  { id: 'Jv-002', date: '2026-03-02', account: 'Software Expense', debit: 0, credit: 120.00, remarks: 'AWS Billing' },
  { id: 'Jv-003', date: '2026-03-05', account: 'Accounts Receivable', debit: 12500.00, credit: 0, remarks: 'Invoice INV-2026-991' },
  { id: 'Jv-004', date: '2026-03-06', account: 'Office Supplies', debit: 0, credit: 45.00, remarks: 'Coffee & Snacks' },
];

export default function AccountingDashboard() {
  const [activeTab, setActiveTab] = useState('ledger');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Accounting Control</h1>
          <p className="text-sm text-slate-500">Manage General Ledger, Invoices, and Chart of Accounts</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg text-sm shadow-sm bg-white hover:bg-slate-50 font-medium">Create Invoice</button>
          <button className="px-4 py-2 rounded-lg text-sm shadow-sm bg-emerald-600 text-white hover:bg-emerald-700 font-medium">+ Journal Entry</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Receivables', value: '$45,200.00', trend: '+12%', color: 'text-emerald-600' },
          { label: 'Total Payables', value: '$12,450.00', trend: '-2%', color: 'text-rose-600' },
          { label: 'Cash in Bank', value: '$128,000.00', trend: '+5%', color: 'text-blue-600' },
          { label: 'Net Profit (YTD)', value: '$98,400.00', trend: '+24%', color: 'text-indigo-600' },
        ].map((kpi, i) => (
          <div key={i} className="p-5 border rounded-xl bg-white/50 backdrop-blur-md shadow-sm">
            <p className="text-sm text-slate-500 mb-1">{kpi.label}</p>
            <div className="flex justify-between items-end">
              <h3 className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded text-slate-600">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex gap-6">
          {['ledger', 'invoices', 'chart-of-accounts', 'taxes'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-emerald-600 text-emerald-600' : 'text-slate-500 hover:text-slate-800'}`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Ledger Table */}
      {activeTab === 'ledger' && (
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 border-b">
              <tr>
                <th className="p-4 font-medium">Entry ID</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Account</th>
                <th className="p-4 font-medium">Remarks</th>
                <th className="p-4 font-medium text-right">Debit</th>
                <th className="p-4 font-medium text-right">Credit</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-800">
              {MOCK_LEDGER.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono text-emerald-700">{row.id}</td>
                  <td className="p-4">{row.date}</td>
                  <td className="p-4 font-medium">{row.account}</td>
                  <td className="p-4 text-slate-500">{row.remarks}</td>
                  <td className="p-4 text-right">{row.debit > 0 ? `$${row.debit.toFixed(2)}` : '-'}</td>
                  <td className="p-4 text-right">{row.credit > 0 ? `$${row.credit.toFixed(2)}` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
