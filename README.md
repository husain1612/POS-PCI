# POS-PCI — POS Ecosystem (Rp15 Juta / Professional Scope)

Monorepo for a multi-outlet POS ecosystem: **Mobile POS**, **Web Outlet**, **Web Admin**, and a shared **Backend API**. Scoped to the "Rp15 Juta — POS Professional" package described in [`docs/PROPOSAL.md`](./docs/PROPOSAL.md).

## Structure

```text
apps/
  backend-api/   NestJS + Prisma + PostgreSQL — business logic & data
  web-admin/     Next.js — centralized management (Owner / Super Admin)
  web-outlet/    Next.js — outlet operations & inventory (Outlet Manager / Warehouse)
  mobile-pos/    Expo (React Native) — cashier transactions
docs/
  PROPOSAL.md    Original proposal & feature comparison (Rp10jt vs Rp15jt)
```

## Stack

| App | Stack |
|---|---|
| Backend API | NestJS, Prisma ORM, PostgreSQL, JWT auth |
| Web Admin | Next.js (App Router), TypeScript, Tailwind CSS |
| Web Outlet | Next.js (App Router), TypeScript, Tailwind CSS |
| Mobile POS | Expo, React Native, TypeScript |

## Getting started

```bash
# 1. Install dependencies (workspace root)
pnpm install

# 2. Start Postgres
docker compose up -d

# 3. Configure & migrate the database
cp apps/backend-api/.env.example apps/backend-api/.env
pnpm --filter backend-api prisma:migrate
pnpm --filter backend-api prisma:seed

# 4. Run apps
pnpm dev:api      # http://localhost:3001/api
pnpm dev:admin    # http://localhost:3000
pnpm dev:outlet   # http://localhost:3002
pnpm dev:mobile   # Expo dev server
```

## Feature scope

This scaffold targets the **Rp15 Juta — POS Professional** package: multi-outlet, advanced inventory (stock in/out/opname with approval workflow), suppliers, refunds, split payments, promotions & vouchers, barcode scanning, offline mode (mobile), advanced analytics, audit logs, notifications, and role/permission management. See `docs/PROPOSAL.md` for the full feature comparison against the Rp10 Juta Essential package.

## Data model

The Prisma schema (`apps/backend-api/prisma/schema.prisma`) covers: Organization, Outlet, User/Role/Permission, Category/Product/ProductVariant/ProductModifier, Inventory/StockMovement/StockOpname, Supplier, Transaction/TransactionItem/Payment/Refund, Promotion/Voucher, AuditLog, Notification.
