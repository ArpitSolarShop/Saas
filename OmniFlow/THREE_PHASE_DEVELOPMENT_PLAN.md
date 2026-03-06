# 🚀 OmniFlow — Three-Phase Development Plan

> Maps every feature from the **Saas Under Develpoment** blueprints (01–11) into three actionable development phases using the **OmniFlow tech stack**.

---

## Phase 1: Foundation & Core Platform (Weeks 1–8)

> **Goal**: Get the monorepo running, database migrated, auth working, and the core CRM live. If Phase 1 is done right, everything else plugs in cleanly.

### 🏗️ Infrastructure Setup

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Initialize Turborepo/Nx monorepo with `apps/`, `packages/`, `infrastructure/` | **Turborepo/Nx** | `ARCHITECTURE_BLUEPRINT.md` |
| Set up `docker-compose.yml` for PostgreSQL, Redis, RabbitMQ, Meilisearch, MinIO | **Docker Compose** | `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` |
| Configure Traefik reverse proxy with SSL termination | **Traefik** | `ARCHITECTURE_BLUEPRINT.md` |
| Set up `.github/workflows/test-and-lint.yml` CI pipeline | **GitHub Actions** | `10_EXHAUSTIVE_CONFIG_MIGRATION_BLUEPRINT.md` |
| Configure environment variables from blueprint | **dotenv / Secrets Manager** | `06_ENVIRONMENT_AND_SECRETS_REFERENCE.md` |

### 📦 Shared Packages (`packages/`)

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Define Prisma/Drizzle schema — all ~120 unified tables | **PostgreSQL + Prisma** | `02_UNIFIED_DATABASE_SCHEMA.md`, `07_EXHAUSTIVE_DATABASE_DICTIONARY.md` |
| Create shared TypeScript types (Zod) for all entities | **Zod + TypeScript** | `02_UNIFIED_DATABASE_SCHEMA.md` |
| Define RabbitMQ event contracts (LeadCreated, ContactUpdated, etc.) | **RabbitMQ / NATS** | `04_ARCHITECTURE_AND_DESIGN.md` |
| Run initial database migrations | **Prisma Migrate** | `10_EXHAUSTIVE_CONFIG_MIGRATION_BLUEPRINT.md` |

### ⚙️ Core API (`apps/core-api/`) — NestJS

| Module | Features | Blueprint Reference |
|--------|----------|---------------------|
| **MODULE 1: Core Platform & Multi-Tenancy** | Workspace CRUD, user management, JWT auth, OAuth (Google/Microsoft/GitHub), SAML/OIDC SSO, LDAP, 2FA (TOTP), RBAC (Owner/Admin/Member/Guest), API key management | `03_FEATURE_IMPLEMENTATION_GUIDE.md` — Module 1 |
| **MODULE 2: CRM & Sales Pipeline** | Companies, Contacts, Leads, Deals, Pipeline stages, Tasks, Notes, Activities, Custom fields, Import/Export | `03_FEATURE_IMPLEMENTATION_GUIDE.md` — Module 2 |
| **MODULE 15: Custom Objects & Metadata System** | Dynamic object creation, custom field types, metadata API, object relationships | `03_FEATURE_IMPLEMENTATION_GUIDE.md` — Module 15 |
| **MODULE 13: Event Streaming & Webhooks** | RabbitMQ event bus, webhook registration, retry logic, event log | `03_FEATURE_IMPLEMENTATION_GUIDE.md` — Module 13 |

### 🌐 Frontend (`apps/web-portal/`) — Next.js

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Next.js App Router setup with Auth.js integration | **Next.js + Auth.js** | `ARCHITECTURE_BLUEPRINT.md` |
| Login/Register/SSO pages | **Auth.js / Auth0** | Module 1 |
| Admin Dashboard shell (sidebar, top nav, workspace switcher) | **Next.js** | `04_ARCHITECTURE_AND_DESIGN.md` |
| CRM views: Contacts, Companies, Deals, Pipeline board | **Next.js** | Module 2 |
| Settings pages: Users, Roles, API Keys, Workspace config | **Next.js** | Module 1 |

### 🔐 Auth & Security

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| JWT token issuance + refresh flow | **Auth.js / Auth0** | Module 1 |
| Row-level security (workspace_id filtering) | **PostgreSQL RLS** | `02_UNIFIED_DATABASE_SCHEMA.md` |
| Rate limiting on API endpoints | **Kong / NestJS Throttler** | `ARCHITECTURE_BLUEPRINT.md` |

### ✅ Phase 1 Deliverable
A fully containerized, authenticated SaaS platform with CRM, multi-tenancy, custom objects, event bus, and CI/CD pipeline — deployed via `docker-compose up`.

---

## Phase 2: Business Modules & Automation (Weeks 9–20)

> **Goal**: Build out the full ERP, messaging, support, automation, and AI capabilities. This is where the 9 original projects truly merge.

### ⚙️ Core API — New NestJS Modules

| Module | Features | Blueprint Reference |
|--------|----------|---------------------|
| **MODULE 3: Unified Messaging & Communication** | WhatsApp (Evolution API), SMS (Jasmin/Twilio), Email (Mailcow/Resend), Telegram, Instagram, Facebook Messenger, Line, live chat widget | Module 3 |
| **MODULE 4: AI & Chatbot System** | Chatbot builder, NLP intent detection, conversation routing, auto-reply, human handoff | Module 4 |
| **MODULE 5: Workflow Automation Engine** | Visual workflow builder (n8n), triggers, conditions, actions, webhook nodes, scheduling | Module 5 |
| **MODULE 6: Accounting & Finance** | Chart of Accounts, Journal Entries, Invoices (Sales/Purchase), Payment Entries, GL, Tax, Bank Reconciliation | Module 6 |
| **MODULE 7: Inventory & Stock Management** | Items, Warehouses, Stock Entries, Stock Ledger, Bin, Batch/Serial, Reorder rules | Module 7 |
| **MODULE 9: Projects & Task Management** | Projects, Tasks, Gantt charts, Timesheets, Milestones | Module 9 |
| **MODULE 10: Support & Ticketing** | Tickets, SLA policies, CSAT surveys, Knowledge Base, Canned Responses, Agent assignment | Module 10 |
| **MODULE 11: Buying & Procurement** | Suppliers, Purchase Orders, Material Requests, RFQs, Supplier Scorecards | Module 11 |
| **MODULE 14: Billing & Subscription** | Subscription plans, Payment methods, Invoicing, Usage metering, Stripe integration | Module 14 |

### 🤖 AI Engine (`apps/ai-engine/`) — Python FastAPI

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Set up FastAPI microservice with Docker | **Python FastAPI** | `ARCHITECTURE_BLUEPRINT.md` |
| LLM integration endpoints (OpenAI, Anthropic, local models) | **FastAPI** | Module 4, Module 16 |
| Yield estimation / math calculation APIs | **FastAPI + NumPy** | `ARCHITECTURE_BLUEPRINT.md` |
| Captain AI agent (from Chatwoot) — response suggestions, article embeddings | **FastAPI + pgvector** | Module 16, `07_EXHAUSTIVE_DATABASE_DICTIONARY.md` |

### 🔄 Background Workers (`apps/background-workers/`) — NestJS + BullMQ

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| PDF generation processor (Quotations, Invoices) | **NestJS + BullMQ** | Module 6, Module 2 |
| Email notification processor | **NestJS + BullMQ** | Module 3 |
| Import/Export processor (CSV, XLSX) | **NestJS + BullMQ** | Module 2 |
| Scheduled jobs (SLA checks, subscription renewals) | **NestJS + BullMQ** | Module 10, Module 14 |

### 🔄 Workflow Automation (`apps/workflow-automation/`) — n8n

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Self-hosted n8n Docker instance | **n8n** | `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` |
| Pre-built workflow templates (Lead → Deal → Invoice → Payment) | **n8n** | Module 5 |
| Custom n8n nodes for OmniFlow internal APIs | **n8n SDK** | Module 5 |
| 19-step operational task flow JSON exports | **n8n** | `ARCHITECTURE_BLUEPRINT.md` |

### 🔌 Integrations (`integrations/`)

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| WhatsApp Business API (Evolution API connector) | **REST/WebSocket** | `06_ENVIRONMENT_AND_SECRETS_REFERENCE.md` (Evolution API vars) |
| SMS Gateway (Jasmin SMPP connector) | **REST** | Module 23, `09_PACKAGE_AND_DEPENDENCIES_BLUEPRINT.md` |
| Email Suite (Mailcow IMAP/SMTP connector) | **IMAP/SMTP** | Module 24, `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` |
| Twenty CRM sync webhooks | **REST** | `integrations/crm-sync/` |

### 🌐 Frontend — New Pages

| Pages | Modules Covered |
|-------|----------------|
| Messaging Inbox (unified multi-channel) | Module 3 |
| AI Chatbot Builder | Module 4 |
| Workflow Designer (embedded n8n) | Module 5 |
| Accounting Dashboard (GL, Invoices, Payments) | Module 6 |
| Inventory Management (Items, Stock, Warehouses) | Module 7 |
| Project Board (Kanban, Gantt, Timesheets) | Module 9 |
| Support Ticketing (Inbox, SLA, CSAT) | Module 10 |
| Procurement (POs, RFQs, Suppliers) | Module 11 |
| Billing & Subscriptions (Plans, Payments) | Module 14 |

### 🔎 Search

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Index all CRM entities in Meilisearch | **Meilisearch** | `ARCHITECTURE_BLUEPRINT.md` |
| Typo-tolerant search across Contacts, Items, Tickets | **Meilisearch** | Module 2, 7, 10 |

### ✅ Phase 2 Deliverable
A full-featured ERP + CRM + Support + Messaging + AI + Automation platform with 14 active modules, background jobs, and integrated third-party channels.

---

## Phase 3: Advanced Features, Scale & Production (Weeks 21–30)

> **Goal**: Add the remaining specialized modules, production-grade observability, feature flags, backup strategy, and performance optimization.

### ⚙️ Core API — Advanced Modules

| Module | Features | Blueprint Reference |
|--------|----------|---------------------|
| **MODULE 8: Manufacturing** | BOM, Work Orders, Job Cards, Routing, Production Plans, Subcontracting | Module 8 |
| **MODULE 12: Asset Management** | Asset register, Depreciation schedules, Maintenance logs, Asset movement | Module 12 |
| **MODULE 16: AI Agents & Intelligence** | AI-powered insights, auto-categorization, smart routing, response suggestions, article generation | Module 16 |
| **MODULE 17: Analytics & Insights** | Dashboards, Custom reports, KPI tracking, Data visualization, Export | Module 17 |
| **MODULE 18: Quality Management** | Quality inspections, Non-conformance, Quality goals, Feedback | Module 18 |
| **MODULE 19: Subcontracting** | Subcontracting orders, Service items, Supplied items tracking | Module 19 |
| **MODULE 20: Platform Extensions & Marketplace** | Plugin system, Extension API, Custom app marketplace, Webhooks | Module 20 |
| **MODULE 21: GPS & Fleet Management** | Device tracking (Traccar), Geofences, Trip history, Alerts, Fleet dashboard | Module 21 |
| **MODULE 22: Customer Support & Helpdesk** | Advanced Chatwoot features — Captain AI, CSAT, Agent capacity, Audit logs, Macros | Module 22 |
| **MODULE 23: SMS Gateway** | Jasmin SMPP integration, SMS routing, MO/MT management, Billing per SMS | Module 23 |
| **MODULE 24: Self-Hosted Email Suite** | Mailcow integration — Postfix MTA, Dovecot IMAP, SOGo webmail, Rspamd anti-spam, DKIM/DMARC | Module 24 |

### 📊 Observability (`infrastructure/monitoring/`)

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Prometheus metrics collection from all services | **Prometheus** | `ARCHITECTURE_BLUEPRINT.md` |
| Grafana dashboards (API latency, DB queries, queue depth) | **Grafana** | `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` |
| Loki log aggregation from all Docker containers | **Loki** | `ARCHITECTURE_BLUEPRINT.md` |
| Sentry error tracking in Next.js + NestJS + FastAPI | **Sentry** | `09_PACKAGE_AND_DEPENDENCIES_BLUEPRINT.md` |

### 🚦 Feature Flags

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Self-hosted Unleash instance in Docker | **Unleash / PostHog** | `ARCHITECTURE_BLUEPRINT.md` |
| Feature flag SDK integration in Next.js + NestJS | **Unleash SDK** | Module 20 |
| Gradual rollout for new modules | **Unleash** | `ARCHITECTURE_BLUEPRINT.md` |

### 🛡️ Backup & Disaster Recovery (`backups/`)

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| pgBackRest for PostgreSQL PITR | **pgBackRest** | `ARCHITECTURE_BLUEPRINT.md` |
| S3 Versioning for MinIO object storage | **S3 Versioning** | `ARCHITECTURE_BLUEPRINT.md` |
| Automated daily backup schedule | **Cron + pgBackRest** | `11_FINAL_GAP_ANALYSIS.md` |
| Backup restoration test procedure | **pgBackRest** | `ARCHITECTURE_BLUEPRINT.md` |

### 🚪 API Gateway (`infrastructure/gateway/`)

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| Kong API Gateway for external API management | **Kong** | `ARCHITECTURE_BLUEPRINT.md` |
| API key validation, rate limiting, IP whitelisting | **Kong Plugins** | Module 1, Module 13 |
| API documentation (Swagger/OpenAPI) | **NestJS Swagger** | `11_FINAL_GAP_ANALYSIS.md` |

### 🚀 CI/CD Production Pipeline

| Task | Tech From Stack | Blueprint Reference |
|------|----------------|---------------------|
| `deploy-production.yml` — multi-service Docker build + push | **GitHub Actions** | `10_EXHAUSTIVE_CONFIG_MIGRATION_BLUEPRINT.md` |
| `docker-compose.prod.yml` — resource limits, restart policies, logging | **Docker Compose** | `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` |
| Zero-downtime deployment strategy (rolling updates) | **Docker Compose + Traefik** | `ARCHITECTURE_BLUEPRINT.md` |
| Health check endpoints for all services | **NestJS + FastAPI** | All modules |

### 🌐 Frontend — Final Pages

| Pages | Modules Covered |
|-------|----------------|
| Manufacturing (BOM, Work Orders, Job Cards) | Module 8 |
| Asset Management Dashboard | Module 12 |
| AI Insights & Smart Reports | Module 16, 17 |
| Quality Inspection Forms | Module 18 |
| GPS Fleet Tracker (Map view, Geofences) | Module 21 |
| Extension Marketplace | Module 20 |
| Platform Admin (Feature Flags, System Health, Backups) | All |

### ✅ Phase 3 Deliverable
A production-ready, fully observable, scalable SaaS platform with all 24 modules live, automated backups, feature flags, API gateway, and zero-downtime deployments.

---

## 📊 Summary — What Gets Built When

| Phase | Weeks | Modules | Key Deliverables |
|-------|-------|---------|-----------------|
| **Phase 1** | 1–8 | 1, 2, 13, 15 | Monorepo, Database, Auth, CRM, Event Bus, CI/CD |
| **Phase 2** | 9–20 | 3, 4, 5, 6, 7, 9, 10, 11, 14 | Messaging, AI, Workflows, ERP (Accounting/Inventory/Procurement), Support, Billing |
| **Phase 3** | 21–30 | 8, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24 | Manufacturing, Assets, GPS, Email, SMS, Analytics, Extensions, Observability, Production |

---

## 🗺️ Blueprint Reference Map

| Blueprint File (READ ONLY) | Used In Phase |
|----------------------------|---------------|
| `01_PROJECT_ANALYSIS.md` | 1, 2, 3 — Feature sourcing decisions |
| `02_UNIFIED_DATABASE_SCHEMA.md` | 1 — Prisma schema foundation |
| `03_FEATURE_IMPLEMENTATION_GUIDE.md` | 1, 2, 3 — Module specifications |
| `04_ARCHITECTURE_AND_DESIGN.md` | 1 — System topology & conflict resolution |
| `05_PROJECT_TREE_REFERENCE.md` | 1, 2 — Original codebase navigation |
| `06_ENVIRONMENT_AND_SECRETS_REFERENCE.md` | 1 — Environment variable setup |
| `07_EXHAUSTIVE_DATABASE_DICTIONARY.md` | 1 — Raw table cross-reference |
| `08_DOCKER_AND_INFRASTRUCTURE_BLUEPRINT.md` | 1, 2, 3 — Docker configs |
| `09_PACKAGE_AND_DEPENDENCIES_BLUEPRINT.md` | 1, 2 — Dependency versions |
| `10_EXHAUSTIVE_CONFIG_MIGRATION_BLUEPRINT.md` | 1, 2, 3 — Migration scripts & CI/CD |
| `11_FINAL_GAP_ANALYSIS.md` | 2, 3 — Shell scripts, API routes, middleware |
