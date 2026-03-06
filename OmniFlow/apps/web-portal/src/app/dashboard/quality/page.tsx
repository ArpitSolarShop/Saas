'use client';

const MOCK_INSPECTIONS = [
  { id: 'INS-401', target: 'WO-2026-045', inspector: 'QC-Lead', status: 'Passed', score: 98, date: 'Mar 06' },
  { id: 'INS-402', target: 'PO-2026-001', inspector: 'Dock-Agent', status: 'Failed', score: 45, date: 'Mar 05' },
  { id: 'INS-403', target: 'BOM-1002', inspector: 'Eng-Review', status: 'Pending', score: 0, date: 'Mar 06' },
];

export default function QualityDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">Quality Control</h1>
          <p className="text-sm text-slate-500">Track incoming material inspections, production checks, and non-conformances.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">NC Logs</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 font-medium shadow-sm">+ New Inspection</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 border rounded-xl bg-white shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Pass Rate (Last 30d)</p>
          <p className="text-3xl font-bold text-emerald-600">92.4%</p>
        </div>
        <div className="p-5 border rounded-xl bg-white shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Active Non-Conformances</p>
          <p className="text-3xl font-bold text-red-600">3</p>
        </div>
        <div className="p-5 border rounded-xl bg-white shadow-sm">
          <p className="text-slate-500 text-sm mb-1">Pending Inspections</p>
          <p className="text-3xl font-bold text-amber-500">12</p>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Inspection Logs</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 border-b">
            <tr>
              <th className="p-4 font-medium">Log ID</th>
              <th className="p-4 font-medium">Target Reference</th>
              <th className="p-4 font-medium">Inspector</th>
              <th className="p-4 font-medium text-center">Score</th>
              <th className="p-4 font-medium text-center">Result</th>
              <th className="p-4 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_INSPECTIONS.map(ins => (
              <tr key={ins.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-mono font-medium text-slate-500">{ins.id}</td>
                <td className="p-4 font-medium text-blue-600 cursor-pointer hover:underline">{ins.target}</td>
                <td className="p-4 text-slate-600">{ins.inspector}</td>
                <td className="p-4 text-center font-mono">
                  {ins.status === 'Pending' ? '-' : `${ins.score}/100`}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase
                      ${ins.status === 'Passed' ? 'bg-emerald-100 text-emerald-700' :
                      ins.status === 'Failed' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'}`}>
                    {ins.status}
                  </span>
                </td>
                <td className="p-4 text-right text-slate-400">{ins.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
