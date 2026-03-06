'use client';

const MOCK_TICKETS = [
  { id: 'TKT-991', subject: 'Login issue on Safari', from: 'alice@example.com', status: 'open', priority: 'high', time: '10m ago' },
  { id: 'TKT-992', subject: 'Billing question for PRO plan', from: 'bob@acme.inc', status: 'pending', priority: 'medium', time: '2h ago' },
  { id: 'TKT-993', subject: 'API Rate limit exceeded', from: 'devs@startup.co', status: 'open', priority: 'critical', time: '1d ago' },
  { id: 'TKT-994', subject: 'How to export to CSV?', from: 'charlie@gmail.com', status: 'resolved', priority: 'low', time: '2d ago' },
];

export default function SupportDashboard() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent">Support Helpdesk</h1>
          <p className="text-sm text-slate-500">Manage customer tickets, SLAs, and CSAT scores.</p>
        </div>
        <div className="flex gap-2">
          <input
            type="search"
            placeholder="Search tickets by ID, email..."
            className="px-4 py-2 border rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-red-500 w-64 shadow-sm"
          />
          <button className="px-4 py-2 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 font-medium shadow-sm">New Ticket</button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 h-[calc(100vh-180px)]">

        {/* Ticket List */}
        <div className="flex-1 border rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
          <div className="border-b bg-slate-50 p-2 flex gap-4 text-sm font-medium text-slate-600">
            <button className="px-3 py-1.5 text-red-600 border-b-2 border-red-600">Open (2)</button>
            <button className="px-3 py-1.5 hover:text-slate-900 transition-colors">Pending (1)</button>
            <button className="px-3 py-1.5 hover:text-slate-900 transition-colors">Resolved (1)</button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500 border-b bg-slate-50/50 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="p-4 font-medium">Ticket ID</th>
                  <th className="p-4 font-medium w-1/3">Subject</th>
                  <th className="p-4 font-medium">Requester</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-800">
                {MOCK_TICKETS.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="p-4 font-mono font-medium text-red-600 group-hover:text-red-700">{ticket.id}</td>
                    <td className="p-4 font-medium truncate max-w-[200px]">{ticket.subject}</td>
                    <td className="p-4 text-slate-500">{ticket.from}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize
                        ${ticket.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          ticket.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                            ticket.priority === 'medium' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'}`
                      }>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4 text-right text-slate-400">{ticket.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Detail Panel (Placeholder state active) */}
        <div className="w-96 border rounded-xl bg-slate-50/50 shadow-sm flex flex-col items-center justify-center p-8 text-center text-slate-500">
          <p className="text-4xl mb-4">🎫</p>
          <h3 className="font-semibold text-slate-700">No Ticket Selected</h3>
          <p className="text-sm mt-2">Select a ticket from the list to view conversations, assign agents, and reply to the customer.</p>
        </div>

      </div>
    </div>
  );
}
