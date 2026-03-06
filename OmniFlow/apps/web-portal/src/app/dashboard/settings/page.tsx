'use client';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => { const u = localStorage.getItem('user'); if (u) setUser(JSON.parse(u)); }, []);

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Settings</h1>
      <div className="card mb-4">
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Profile</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div className="input-group"><label className="input-label">First Name</label><input className="input" defaultValue={user?.firstName || ''} /></div>
          <div className="input-group"><label className="input-label">Last Name</label><input className="input" defaultValue={user?.lastName || ''} /></div>
          <div className="input-group" style={{gridColumn:'span 2'}}><label className="input-label">Email</label><input className="input" defaultValue={user?.email || ''} disabled /></div>
        </div>
        <button className="btn btn-primary mt-4">Save Changes</button>
      </div>
      <div className="card mb-4">
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Security</h3>
        <div className="input-group"><label className="input-label">Current Password</label><input className="input" type="password" /></div>
        <div className="input-group"><label className="input-label">New Password</label><input className="input" type="password" /></div>
        <button className="btn btn-secondary mt-4">Change Password</button>
      </div>
      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>Two-Factor Authentication</h3>
        <p className="text-muted text-sm mb-4">Add an extra layer of security to your account</p>
        <button className="btn btn-secondary">Enable 2FA</button>
      </div>
    </div>
  );
}
