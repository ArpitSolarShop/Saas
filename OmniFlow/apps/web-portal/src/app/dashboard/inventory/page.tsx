'use client';

const MOCK_STOCK = [
  { itemCode: 'ITM-001', name: 'Premium Wireless Headphones', warehouse: 'WH-East', available: 145, reserved: 20 },
  { itemCode: 'ITM-002', name: 'Mechanical Keyboard (Red Switch)', warehouse: 'WH-East', available: 32, reserved: 5 },
  { itemCode: 'ITM-003', name: 'USB-C Thunderbolt Hub', warehouse: 'WH-West', available: 8, reserved: 12 },
  { itemCode: 'ITM-004', name: 'Ergonomic Office Chair', warehouse: 'WH-South', available: 50, reserved: 0 },
];

export default function InventoryDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Inventory & Stock</h1>
          <p className="text-sm text-slate-500">Track stock levels, warehouse movements, and fulfillment.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border rounded-lg text-sm bg-white hover:bg-slate-50 font-medium shadow-sm">Stock Entry</button>
          <button className="px-4 py-2 rounded-lg text-sm bg-orange-600 text-white hover:bg-orange-700 font-medium shadow-sm">Stock Transfer</button>
        </div>
      </div>

      <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b text-slate-600">
            <tr>
              <th className="p-4 font-medium">Item Code</th>
              <th className="p-4 font-medium">Product Name</th>
              <th className="p-4 font-medium">Warehouse</th>
              <th className="p-4 font-medium text-right">Available Qty</th>
              <th className="p-4 font-medium text-right">Reserved Qty</th>
              <th className="p-4 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-800">
            {MOCK_STOCK.map((item) => {
              const total = item.available + item.reserved;
              let statusBadge = <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">In Stock</span>;

              if (item.available === 0) {
                statusBadge = <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">Out of Stock</span>;
              } else if (item.available < 15) {
                statusBadge = <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-semibold">Low Stock</span>;
              }

              return (
                <tr key={item.itemCode} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-mono font-medium">{item.itemCode}</td>
                  <td className="p-4">{item.name}</td>
                  <td className="p-4 text-slate-500">{item.warehouse}</td>
                  <td className="p-4 text-right font-semibold text-orange-600">{item.available}</td>
                  <td className="p-4 text-right text-slate-500">{item.reserved}</td>
                  <td className="p-4 text-center">{statusBadge}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
