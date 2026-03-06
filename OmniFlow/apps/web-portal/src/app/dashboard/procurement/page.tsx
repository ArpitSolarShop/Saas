'use client';

const MOCK_PO = [
  { id: 'PO-2026-001', supplier: 'TechParts Distro', amount: 4500.00, status: 'Draft', date: 'Mar 01' },
  { id: 'PO-2026-002', supplier: 'Global Logistics Supply', amount: 1250.50, status: 'Ordered', date: 'Mar 02' },
  { id: 'PO-2026-003', supplier: 'Office Essentials Co', amount: 89.99, status: 'Received', date: 'Feb 28' },
];

export default function ProcurementDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">Buying & Procurement</h1>
          <p className="text-sm text-slate-500">Manage Suppliers, Purchase Orders, and Material Requests.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Suppliers</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-sky-600 text-white hover:bg-sky-700 font-medium shadow-sm">+ Create PO</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div><p className="text-slate-500 text-sm">Active Suppliers</p><p className="text-2xl font-bold text-slate-800">14</p></div>
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">🏢</div>
        </div>
        <div className="p-5 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div><p className="text-slate-500 text-sm">Pending POs</p><p className="text-2xl font-bold text-sky-600">2</p></div>
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">⏳</div>
        </div>
        <div className="p-5 border rounded-xl bg-white shadow-sm flex items-center justify-between">
          <div><p className="text-slate-500 text-sm">Total Spend (MTD)</p><p className="text-2xl font-bold text-slate-800">$5,840.49</p></div>
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">💸</div>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Purchase Orders</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50/50 border-b text-slate-500">
            <tr>
              <th className="p-4 font-medium">PO Number</th>
              <th className="p-4 font-medium">Supplier</th>
              <th className="p-4 font-medium text-right">Amount</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Order Date</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_PO.map(po => (
              <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-medium text-sky-700">{po.id}</td>
                <td className="p-4 font-medium">{po.supplier}</td>
                <td className="p-4 text-right font-medium">${po.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold
                    ${po.status === 'Draft' ? 'bg-slate-100 text-slate-700' :
                      po.status === 'Ordered' ? 'bg-sky-100 text-sky-700' :
                        'bg-emerald-100 text-emerald-700'}`}>
                    {po.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-500">{po.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
