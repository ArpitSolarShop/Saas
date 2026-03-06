# 🚀 OmniFlow

> **Unified open-source SaaS platform** — CRM, ERP, Messaging, AI, Automation, GPS, Email, SMS — all in one monorepo.

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Start infrastructure (PostgreSQL, Redis, NATS, Meilisearch, MinIO)
docker compose up -d

# 3. Generate Prisma client & run migrations
pnpm db:generate
pnpm db:migrate

# 4. Start all services in dev mode
pnpm dev
```

## Architecture

| Service | Port | Tech |
|---------|------|------|
| Web Portal | 3000 | Next.js 15 |
| Core API | 4000 | NestJS |
| API Docs | 4000/docs | Swagger |
| PostgreSQL | 5432 | PostgreSQL 16 |
| Redis | 6379 | Redis 7 |
| NATS | 4222 | NATS JetStream |
| Meilisearch | 7700 | Meilisearch |
| MinIO | 9000/9001 | S3-compatible |
| Traefik | 80/8080 | Reverse Proxy |

## Project Structure

```
OmniFlow/
├── apps/
│   ├── core-api/          # NestJS backend
│   └── web-portal/        # Next.js frontend
├── packages/
│   ├── database/          # Prisma schema & migrations
│   ├── shared-types/      # Zod schemas & TypeScript types
│   └── event-contracts/   # NATS event definitions
├── integrations/          # External service connectors
├── infrastructure/        # DevOps configs
├── docker-compose.yml     # Local dev stack
└── turbo.json             # Build pipeline
```

## License

MIT
