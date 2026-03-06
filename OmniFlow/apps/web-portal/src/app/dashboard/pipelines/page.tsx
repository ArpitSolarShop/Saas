'use client';

export default function PipelinesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 style={{ fontSize: '24px', fontWeight: 700 }}>Sales Pipelines</h1><p className="text-muted text-sm">Manage your sales pipeline stages</p></div>
        <button className="btn btn-primary">+ New Pipeline</button>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>📈</p>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>Pipeline Board Coming Soon</p>
        <p className="text-muted text-sm">Visual drag-and-drop pipeline board will be here</p>
      </div>
    </div>
  );
}
