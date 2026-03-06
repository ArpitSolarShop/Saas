import { ProjectConfig } from 'playwright/test';

const config: ProjectConfig = {
    timeout: 30000,
    retries: 2,
    use: {
        baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
        trace: 'on-first-retry',
    },
};
export default config;
