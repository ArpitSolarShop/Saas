'use client';

const MOCK_DOMAINS = [
  { domain: 'acmecorp.com', status: 'Active', mboxes: 12, quota: '50GB / 100GB' },
  { domain: 'startup.io', status: 'Pending DNS', mboxes: 0, quota: '0 / 50GB' },
];

export default function EmailSuiteDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Email Domains & Mailboxes</h1>
          <p className="text-sm text-slate-500">Manage self-hosted email via Mailcow API integration.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm transition-colors">Global Settings</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 font-medium shadow-sm transition-colors">+ Add Domain</button>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">📧 Registered Domains</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-slate-500 border-b">
            <tr>
              <th className="p-4 font-medium">Domain Name</th>
              <th className="p-4 font-medium text-center">Mailboxes</th>
              <th className="p-4 font-medium">Quota Usage</th>
              <th className="p-4 font-medium text-center">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_DOMAINS.map(d => (
              <tr key={d.domain} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-blue-700">{d.domain}</td>
                <td className="p-4 text-center text-slate-600 font-mono">{d.mboxes}</td>
                <td className="p-4 text-slate-500 text-xs">{d.quota}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${d.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {d.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 text-xs font-semibold mr-3">DNS</button>
                  <button className="text-slate-400 hover:text-blue-600 text-xs font-semibold">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
