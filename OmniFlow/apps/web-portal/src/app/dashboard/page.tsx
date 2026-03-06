'use client';

import styles from './overview.module.css';

const STATS = [
    { label: 'Total Contacts', value: '0', icon: '👤', color: '#6366f1' },
    { label: 'Active Leads', value: '0', icon: '🎯', color: '#22c55e' },
    { label: 'Open Deals', value: '0', icon: '💰', color: '#f59e0b' },
    { label: 'Companies', value: '0', icon: '🏢', color: '#3b82f6' },
];

const QUICK_ACTIONS = [
    { label: 'New Contact', href: '/dashboard/contacts', icon: '➕' },
    { label: 'New Lead', href: '/dashboard/leads', icon: '🎯' },
    { label: 'New Deal', href: '/dashboard/deals', icon: '💰' },
    { label: 'View Pipeline', href: '/dashboard/pipelines', icon: '📈' },
];

export default function DashboardPage() {
    return (
        <div>
            <div className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <p className={styles.subtitle}>Welcome to OmniFlow — your unified workspace</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {STATS.map((stat) => (
                    <div key={stat.label} className={styles.statCard}>
                        <div className={styles.statIcon} style={{ background: `${stat.color}20`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className={styles.statValue}>{stat.value}</div>
                            <div className={styles.statLabel}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.actionsGrid}>
                {QUICK_ACTIONS.map((action) => (
                    <a key={action.label} href={action.href} className={styles.actionCard}>
                        <span className={styles.actionIcon}>{action.icon}</span>
                        <span>{action.label}</span>
                    </a>
                ))}
            </div>

            {/* Recent Activity */}
            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <div className="card">
                <p className="text-muted text-sm" style={{ textAlign: 'center', padding: '40px' }}>
                    No activity yet. Start by creating your first contact or lead.
                </p>
            </div>
        </div>
    );
}
