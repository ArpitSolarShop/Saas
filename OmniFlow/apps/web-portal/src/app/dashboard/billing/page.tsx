'use client';

export default function BillingPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 style={{ fontSize: '24px', fontWeight: 700 }}>Billing & Subs</h1><p className="text-muted text-sm">Subscription management and plans</p></div>
        <button className="btn btn-primary">+ New</button>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
        <p style={{ fontSize: '40px', marginBottom: '12px' }}>💳</p>
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>Coming Soon</p>
        <p className="text-muted text-sm">This module is part of the Phase 2 rollout.</p>
      </div>
    </div>
  );
}
