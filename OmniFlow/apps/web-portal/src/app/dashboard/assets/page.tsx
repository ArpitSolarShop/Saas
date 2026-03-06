'use client';

export default function AssetsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 style={{ fontSize: '24px', fontWeight: 700 }}>Asset Management</h1><p className="text-muted text-sm">Company assets and depreciation</p></div>
        <button className="btn btn-primary">+ New</button>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>��</p>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>Coming Soon (Phase 3)</p>
        <p className="text-muted text-sm">Enterprise operational capabilities are rolling out next!</p>
      </div>
    </div>
  );
}
