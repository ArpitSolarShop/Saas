'use client';

export default function FleetDashboard() {
  return (
    <div className="flex flex-col h-[calc(100vh-120px)] space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">Fleet & GPS Tracking</h1>
          <p className="text-sm text-slate-500">Live Traccar mapping, vehicle telemetry, and geofence alerts.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Geofences</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-emerald-600 text-white hover:bg-emerald-700 font-medium shadow-sm transition-colors">+ Register Vehicle</button>
        </div>
      </div>

      <div className="flex gap-6 flex-1">

        {/* Sidebar - Vehicles */}
        <div className="w-80 border rounded-xl bg-white shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b bg-slate-50 font-semibold text-slate-800 flex justify-between items-center">
            <span>Vehicles</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">3 Active</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {['V-101 (Delivery Van)', 'V-102 (Box Truck)', 'V-103 (Sedan)'].map((vehicle, i) => (
              <div key={i} className={`p-4 border-b cursor-pointer transition-colors ${i === 0 ? 'bg-emerald-50 border-emerald-500 border-l-4' : 'hover:bg-slate-50 border-l-4 border-transparent'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-700">{vehicle}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
                </div>
                <div className="text-xs text-slate-500 mb-2 font-mono">ID: {8948293 + i} • Speed: {i === 0 ? '45' : '0'} mph</div>
                <div className="text-[10px] text-slate-400">Location verified 2m ago</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main View - Map Placeholder */}
        <div className="flex-1 border rounded-xl bg-slate-100 shadow-sm relative overflow-hidden flex items-center justify-center">
          {/* Simulated Map Background Grid */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          <div className="z-10 bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl border text-center max-w-sm">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-inner">🗺️</div>
            <h3 className="font-bold text-lg text-slate-800 mb-2">Live Map Tile Engine</h3>
            <p className="text-sm text-slate-500 mb-6">Traccar OpenStreetMaps integration requires the backend websocket connection to render.</p>
            <button className="w-full py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition">Connect Engine</button>
          </div>

          {/* Simulated Map Pin */}
          <div className="absolute top-1/3 left-1/3 w-8 h-8 rounded-full bg-emerald-500 border-4 border-white shadow-lg animate-bounce flex items-center justify-center text-white text-xs">A</div>
        </div>

      </div>
    </div>
  );
}
