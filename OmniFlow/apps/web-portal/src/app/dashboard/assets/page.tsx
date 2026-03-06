'use client';

const MOCK_ASSETS = [
  { id: 'AST-001', name: 'MacBook Pro M3 Max', user: 'Alice', value: 3499.00, status: 'Active', nextService: 'Dec 2026' },
  { id: 'AST-002', name: 'Dell UltraSharp 32"', user: 'Bob', value: 899.00, status: 'Active', nextService: 'None' },
  { id: 'AST-003', name: 'Office Printer X500', location: 'Floor 2', value: 1200.00, status: 'Maintenance', nextService: 'Past Due' },
];

export default function AssetDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">IT Asset Management</h1>
          <p className="text-sm text-slate-500">Track company devices, software licenses, depreciation and maintenance.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Depreciation</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-sm">+ Register Asset</button>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b text-slate-500">
            <tr>
              <th className="p-4 font-medium">Asset Tag</th>
              <th className="p-4 font-medium">Asset Name</th>
              <th className="p-4 font-medium">Assigned To</th>
              <th className="p-4 font-medium text-right">Current Value</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Next Service</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_ASSETS.map(asset => (
              <tr key={asset.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-medium text-indigo-700">{asset.id}</td>
                <td className="p-4 font-medium">{asset.name}</td>
                <td className="p-4 text-slate-500">{asset.user || asset.location}</td>
                <td className="p-4 text-right font-medium">${asset.value.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold
                    ${asset.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {asset.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-500">
                  {asset.nextService === 'Past Due' ? <span className="text-red-600 font-bold flex items-center justify-end gap-1">⚠️ Past Due</span> : asset.nextService}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
