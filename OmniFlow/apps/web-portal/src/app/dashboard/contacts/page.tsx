'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function ContactsPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', jobTitle: '' });

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const res = await api.contacts.list();
            setContacts(res.data || []);
        } catch { } finally { setLoading(false); }
    };

    const handleCreate = async () => {
        try {
            await api.contacts.create(form);
            setForm({ firstName: '', lastName: '', email: '', phone: '', jobTitle: '' });
            setShowForm(false);
            loadContacts();
        } catch { }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Contacts</h1>
                    <p className="text-muted text-sm">{contacts.length} total contacts</p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? '✕ Cancel' : '+ New Contact'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-4 animate-fade-in">
                    <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>New Contact</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div className="input-group">
                            <label className="input-label">First Name</label>
                            <input className="input" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Last Name</label>
                            <input className="input" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input className="input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Phone</label>
                            <input className="input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                        </div>
                        <div className="input-group" style={{ gridColumn: 'span 2' }}>
                            <label className="input-label">Job Title</label>
                            <input className="input" value={form.jobTitle} onChange={e => setForm({ ...form, jobTitle: e.target.value })} />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-4" onClick={handleCreate}>Create Contact</button>
                </div>
            )}

            {loading ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
                    <p className="text-muted">Loading contacts...</p>
                </div>
            ) : contacts.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
                    <p style={{ fontSize: '40px', marginBottom: '12px' }}>👤</p>
                    <p style={{ fontWeight: 600, marginBottom: '4px' }}>No contacts yet</p>
                    <p className="text-muted text-sm">Click &quot;New Contact&quot; to add your first contact</p>
                </div>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Job Title</th>
                                <th>Company</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((c) => (
                                <tr key={c.id}>
                                    <td style={{ fontWeight: 500 }}>{c.firstName} {c.lastName}</td>
                                    <td>{c.email || '—'}</td>
                                    <td>{c.phone || '—'}</td>
                                    <td>{c.jobTitle || '—'}</td>
                                    <td>{c.company?.name || '—'}</td>
                                    <td className="text-muted text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
