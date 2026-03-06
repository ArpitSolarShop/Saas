'use client';

export default function ActivitiesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 style={{ fontSize: '24px', fontWeight: 700 }}>Activities</h1><p className="text-muted text-sm">Track calls, meetings, and tasks</p></div>
        <button className="btn btn-primary">+ Log Activity</button>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>📅</p>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>No activities logged yet</p>
        <p className="text-muted text-sm">Activities from CRM operations will appear here</p>
      </div>
    </div>
  );
}
