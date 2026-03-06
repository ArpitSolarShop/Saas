import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'OmniFlow — Unified SaaS Platform',
    description: 'CRM, ERP, Messaging, AI, Automation — all in one open-source platform.',
    keywords: ['CRM', 'ERP', 'SaaS', 'automation', 'open-source'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
