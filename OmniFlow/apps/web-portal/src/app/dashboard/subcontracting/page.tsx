'use client';

const MOCK_SC = [
  { id: 'SCO-9001', service: 'Powder Coating - Red', supplier: 'Industrial Finishers LLC', qty: 50, status: 'In Transit', date: 'Mar 08' },
  { id: 'SCO-9002', service: 'PCB Assembly Verification', supplier: 'TechParts Distro', qty: 1200, status: 'Processing', date: 'Mar 12' },
];

export default function SubcontractingDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">Subcontracting</h1>
          <p className="text-sm text-slate-500">Track goods sent to third-party vendors for specific service operations.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Vendor Performance</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-blue-700 text-white hover:bg-blue-800 font-medium shadow-sm">+ Create Order</button>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">🤝 Active Subcontract Orders</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 border-b">
            <tr>
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Service Operation</th>
              <th className="p-4 font-medium">Vendor</th>
              <th className="p-4 font-medium text-right">Batch Qty</th>
              <th className="p-4 font-medium text-center">Status</th>
              <th className="p-4 font-medium text-right">Expected Return</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_SC.map(sc => (
              <tr key={sc.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-medium text-blue-700">{sc.id}</td>
                <td className="p-4 font-semibold">{sc.service}</td>
                <td className="p-4 text-slate-600">{sc.supplier}</td>
                <td className="p-4 text-right font-mono text-slate-500">{sc.qty}</td>
                <td className="p-4 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-700">
                    {sc.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-500">{sc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
