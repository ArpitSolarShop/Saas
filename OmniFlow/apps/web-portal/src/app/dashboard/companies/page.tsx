'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function CompaniesPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', domain: '', industry: '', size: '', website: '' });

  useEffect(() => { load(); }, []);
  const load = async () => { try { const r = await api.companies.list(); setItems(r.data || []); } catch {} finally { setLoading(false); } };
  const handleCreate = async () => { try { await api.companies.create(form); setForm({ name: '', domain: '', industry: '', size: '', website: '' }); setShowForm(false); load(); } catch {} };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 style={{ fontSize: '24px', fontWeight: 700 }}>Companies</h1><p className="text-muted text-sm">{items.length} total</p></div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>{showForm ? '✕ Cancel' : '+ New Company'}</button>
      </div>
      {showForm && (
        <div className="card mb-4 animate-fade-in">
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>New Company</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="input-group"><label className="input-label">Company Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="input-group"><label className="input-label">Domain</label><input className="input" value={form.domain} onChange={e => setForm({...form, domain: e.target.value})} /></div>
            <div className="input-group"><label className="input-label">Industry</label><input className="input" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} /></div>
            <div className="input-group"><label className="input-label">Size</label><input className="input" placeholder="e.g. 11-50" value={form.size} onChange={e => setForm({...form, size: e.target.value})} /></div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}><label className="input-label">Website</label><input className="input" value={form.website} onChange={e => setForm({...form, website: e.target.value})} /></div>
          </div>
          <button className="btn btn-primary mt-4" onClick={handleCreate}>Create Company</button>
        </div>
      )}
      {loading ? (<div className="card" style={{textAlign:'center',padding:'60px'}}><p className="text-muted">Loading...</p></div>) : items.length === 0 ? (<div className="card" style={{textAlign:'center',padding:'60px'}}><p style={{fontSize:'40px',marginBottom:'12px'}}>🏢</p><p style={{fontWeight:600,marginBottom:'4px'}}>No companies yet</p><p className="text-muted text-sm">Add your first company</p></div>) : (
        <div className="table-container"><table><thead><tr><th>Name</th><th>Domain</th><th>Industry</th><th>Size</th><th>Website</th></tr></thead><tbody>{items.map(c => (<tr key={c.id}><td style={{fontWeight:500}}>{c.name}</td><td>{c.domain || '—'}</td><td>{c.industry || '—'}</td><td>{c.size || '—'}</td><td>{c.website || '—'}</td></tr>))}</tbody></table></div>
      )}
    </div>
  );
}
