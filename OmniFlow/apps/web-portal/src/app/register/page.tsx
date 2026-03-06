'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import styles from '../login/login.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await api.auth.register({ email, password, firstName, lastName });
            localStorage.setItem('accessToken', result.accessToken);
            localStorage.setItem('refreshToken', result.refreshToken);
            localStorage.setItem('user', JSON.stringify(result.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.glow} />
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.logo}>OmniFlow</h1>
                    <p className={styles.subtitle}>Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" htmlFor="firstName">First Name</label>
                            <input id="firstName" type="text" className="input" placeholder="Arpit"
                                value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="input-group" style={{ flex: 1 }}>
                            <label className="input-label" htmlFor="lastName">Last Name</label>
                            <input id="lastName" type="text" className="input" placeholder="Sharma"
                                value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="email">Email</label>
                        <input id="email" type="email" className="input" placeholder="you@company.com"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">Password</label>
                        <input id="password" type="password" className="input" placeholder="Min 8 characters"
                            value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                    </div>

                    <button type="submit" className="btn btn-primary w-full" disabled={loading}
                        style={{ padding: '12px', fontSize: '15px', marginTop: '8px' }}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link href="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}
