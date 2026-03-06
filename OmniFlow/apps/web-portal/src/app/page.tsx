import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <div className={styles.container}>
            <div className={styles.glow} />
            <div className={styles.hero}>
                <div className={styles.badge}>
                    <span className={styles.badgeDot} />
                    Open Source SaaS Platform
                </div>
                <h1 className={styles.title}>
                    <span className={styles.gradient}>OmniFlow</span>
                </h1>
                <p className={styles.subtitle}>
                    CRM · ERP · Messaging · AI · Automation<br />
                    Everything your business needs — unified.
                </p>
                <div className={styles.actions}>
                    <Link href="/login" className="btn btn-primary" style={{ padding: '14px 32px', fontSize: '16px' }}>
                        Get Started →
                    </Link>
                    <Link href="/login" className="btn btn-secondary" style={{ padding: '14px 32px', fontSize: '16px' }}>
                        Sign In
                    </Link>
                </div>
                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statValue}>24</span>
                        <span className={styles.statLabel}>Modules</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <span className={styles.statValue}>9</span>
                        <span className={styles.statLabel}>Integrated Projects</span>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.stat}>
                        <span className={styles.statValue}>120+</span>
                        <span className={styles.statLabel}>Database Tables</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
