'use client';

const MOCK_BOM = [
  { id: 'BOM-1001', item: 'Electric Scooter Model X', rm_count: 14, cost: 245.50, status: 'Active' },
  { id: 'BOM-1002', item: 'Lithium Battery Pack 40V', rm_count: 8, cost: 120.00, status: 'Active' },
  { id: 'BOM-1003', item: 'Aluminum Frame Assembly', rm_count: 4, cost: 45.00, status: 'Draft' },
];

const MOCK_WO = [
  { id: 'WO-2026-045', bom: 'BOM-1001', qty: 50, produced: 12, startDate: 'Mar 01', status: 'In Progress' },
  { id: 'WO-2026-046', bom: 'BOM-1002', qty: 200, produced: 200, startDate: 'Feb 28', status: 'Completed' },
];

export default function ManufacturingDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-stone-600 to-stone-500 bg-clip-text text-transparent">Manufacturing & Production</h1>
          <p className="text-sm text-slate-500">Manage Bill of Materials (BOM), Work Orders, and Routing.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Work Orders</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-stone-700 text-white hover:bg-stone-800 font-medium shadow-sm">+ New BOM</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BOM Table */}
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-stone-50 flex justify-between items-center">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">🛠️ Bill of Materials</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-slate-500 border-b">
              <tr>
                <th className="p-4 font-medium">BOM ID</th>
                <th className="p-4 font-medium">Product Item</th>
                <th className="p-4 font-medium text-right">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y text-slate-800">
              {MOCK_BOM.map(bom => (
                <tr key={bom.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-medium text-stone-600 border-l-4 border-transparent hover:border-stone-500 cursor-pointer">{bom.id}</td>
                  <td className="p-4">
                    <div className="font-medium">{bom.item}</div>
                    <div className="text-xs text-slate-400">{bom.rm_count} Raw Materials</div>
                  </td>
                  <td className="p-4 text-right font-medium text-stone-700">${bom.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Work Orders Table */}
        <div className="border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b bg-stone-50 flex justify-between items-center">
            <h3 className="font-semibold text-stone-800 flex items-center gap-2">🏗️ Active Work Orders</h3>
          </div>
          <div className="p-4 space-y-4 flex-1">
            {MOCK_WO.map(wo => {
              const progress = (wo.produced / wo.qty) * 100;
              return (
                <div key={wo.id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-semibold text-stone-500">{wo.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase
                      ${wo.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                      {wo.status}
                    </span>
                  </div>
                  <h4 className="font-medium text-sm text-slate-800 mb-4 flex items-center gap-2"><span className="text-slate-400">for</span> {wo.bom}</h4>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>{wo.produced} / {wo.qty} Produced</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
