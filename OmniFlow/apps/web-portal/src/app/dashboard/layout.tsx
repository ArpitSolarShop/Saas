'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './dashboard.module.css';

const NAV_ITEMS = [
    { label: 'Overview', href: '/dashboard', icon: '📊' },
    { label: 'Contacts', href: '/dashboard/contacts', icon: '👤' },
    { label: 'Companies', href: '/dashboard/companies', icon: '🏢' },
    { label: 'Leads', href: '/dashboard/leads', icon: '🎯' },
    { label: 'Deals', href: '/dashboard/deals', icon: '💰' },
    { label: 'Pipelines', href: '/dashboard/pipelines', icon: '📈' },
    { label: 'Activities', href: '/dashboard/activities', icon: '📅' },
    // Phase 2 Modules
    { label: 'Messaging', href: '/dashboard/messaging', icon: '💬' },
    { label: 'Accounting', href: '/dashboard/accounting', icon: '📈' },
    { label: 'Inventory', href: '/dashboard/inventory', icon: '📦' },
    { label: 'Projects', href: '/dashboard/projects', icon: '📋' },
    { label: 'Support', href: '/dashboard/support', icon: '🎫' },
    { label: 'Procurement', href: '/dashboard/procurement', icon: '🛒' },
    { label: 'Billing', href: '/dashboard/billing', icon: '💳' },
    // Phase 3 Modules
    { label: 'Manufacturing', href: '/dashboard/manufacturing', icon: '🏭' },
    { label: 'Assets', href: '/dashboard/assets', icon: '💻' },
    { label: 'AI & Analytics', href: '/dashboard/ai', icon: '🤖' },
    { label: 'Quality Control', href: '/dashboard/quality', icon: '✅' },
    { label: 'Subcontracting', href: '/dashboard/subcontracting', icon: '🤝' },
    { label: 'GPS Fleet', href: '/dashboard/fleet', icon: '🚚' },
    { label: 'Mail Domains', href: '/dashboard/email-suite', icon: '📧' },
];

const BOTTOM_ITEMS = [
    { label: 'Extensions', href: '/dashboard/extensions', icon: '🧩' },
    { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userData = localStorage.getItem('user');
        if (!token) {
            router.push('/login');
            return;
        }
        if (userData) setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        router.push('/login');
    };

    if (!user) return null;

    return (
        <div className={styles.layout}>
            <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
                <div className={styles.sidebarHeader}>
                    <Link href="/dashboard" className={styles.brand}>
                        {collapsed ? '⚡' : '⚡ OmniFlow'}
                    </Link>
                    <button onClick={() => setCollapsed(!collapsed)} className={styles.collapseBtn}>
                        {collapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className={styles.nav}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}>
                            <span className={styles.navIcon}>{item.icon}</span>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    {BOTTOM_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href}
                            className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}>
                            <span className={styles.navIcon}>{item.icon}</span>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                    <button onClick={handleLogout} className={styles.navItem}>
                        <span className={styles.navIcon}>🚪</span>
                        {!collapsed && <span>Logout</span>}
                    </button>

                    {!collapsed && (
                        <div className={styles.userCard}>
                            <div className={styles.avatar}>
                                {user.firstName?.[0] || user.email[0]}
                            </div>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>{user.firstName} {user.lastName}</div>
                                <div className={styles.userEmail}>{user.email}</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}
