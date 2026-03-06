'use client';

export default function AIDashboard() {
  return (
    <div className="space-y-6 flex flex-col h-full pl-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-500 bg-clip-text text-transparent">AI & Intelligence</h1>
          <p className="text-sm text-slate-500">Configure LLM prompts, train agents, and review automated actions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm transition-colors">Configuration</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-fuchsia-600 text-white hover:bg-fuchsia-700 font-medium shadow-sm transition-colors">+ New AI Agent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Agents List */}
        <div className="col-span-1 border rounded-xl bg-white shadow-sm flex flex-col h-[calc(100vh-180px)]">
          <div className="p-4 border-b bg-slate-50 font-semibold text-slate-800">Deployed Agents</div>
          <div className="flex-1 overflow-y-auto space-y-2 p-4">

            <div className="p-4 rounded-xl border border-fuchsia-200 bg-fuchsia-50/50 cursor-pointer shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1 h-full bg-fuchsia-500"></div>
              <h4 className="font-bold text-fuchsia-900 mb-1 flex items-center gap-2">🤖 Support Copilot <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span></h4>
              <p className="text-xs text-fuchsia-700/80 mb-2">Auto-drafts responses for customer tickets based on KB articles.</p>
              <div className="flex justify-between text-[10px] font-mono text-fuchsia-600/80 mt-3 border-t border-fuchsia-200/50 pt-2">
                <span>GPT-4o</span>
                <span>14.2k Actions</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors opacity-70">
              <h4 className="font-bold text-slate-700 mb-1 flex items-center gap-2">📊 Lead Scorer <span className="w-2 h-2 rounded-full bg-slate-400"></span></h4>
              <p className="text-xs text-slate-500 mb-2">Analyzes incoming CRM leads and assigns an urgency score.</p>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-3 border-t pt-2">
                <span>Claude 3.5</span>
                <span>Offline</span>
              </div>
            </div>

          </div>
        </div>

        {/* Agent Config UI */}
        <div className="col-span-2 border rounded-xl bg-white shadow-sm flex flex-col h-[calc(100vh-180px)] opacity-90">
          <div className="p-4 border-b bg-slate-50 flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Support Copilot / Configuration</h3>
            <span className="px-2 py-1 bg-slate-200 text-slate-600 rounded text-xs font-mono">ID: AGT-990</span>
          </div>

          <div className="p-6 space-y-6 flex-1 overflow-y-auto">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">System Prompt</label>
              <textarea
                className="w-full h-48 p-4 border rounded-xl bg-slate-900 text-emerald-400 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner"
                defaultValue={`You are OmniFlow Support Copilot.
Your job is to analyze incoming tickets and draft a helpful, professional response.
Use the connected knowledge base (KB) to provide accurate answers.
Do NOT promise refunds unless explicitly authorized by policy.`}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Provider</label>
                <select className="w-full p-2.5 border rounded-lg bg-slate-50 text-sm outline-none">
                  <option>OpenAI (GPT-4o)</option>
                  <option>Anthropic (Claude 3.5 Sonnet)</option>
                  <option>Local (Llama 3 8B)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Temperature</label>
                <input type="range" min="0" max="100" defaultValue="40" className="w-full mt-2 accent-fuchsia-600" />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>Focused (0.0)</span>
                  <span>Creative (1.0)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <button className="px-6 py-2 rounded-lg text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition-colors">Test Prompt</button>
              <button className="px-6 py-2 rounded-lg text-sm bg-fuchsia-600 text-white hover:bg-fuchsia-700 font-medium shadow-sm transition-colors">Save Changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
