This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
stage
├─ .agents
│  └─ skills
│     ├─ prisma-cli
│     │  ├─ references
│     │  │  ├─ agent-safety.md
│     │  │  ├─ complete.md
│     │  │  ├─ db-execute.md
│     │  │  ├─ db-pull.md
│     │  │  ├─ db-push.md
│     │  │  ├─ db-seed.md
│     │  │  ├─ debug.md
│     │  │  ├─ dev.md
│     │  │  ├─ format.md
│     │  │  ├─ generate.md
│     │  │  ├─ init.md
│     │  │  ├─ mcp.md
│     │  │  ├─ migrate-deploy.md
│     │  │  ├─ migrate-dev.md
│     │  │  ├─ migrate-diff.md
│     │  │  ├─ migrate-reset.md
│     │  │  ├─ migrate-resolve.md
│     │  │  ├─ migrate-status.md
│     │  │  ├─ studio.md
│     │  │  └─ validate.md
│     │  └─ SKILL.md
│     ├─ prisma-client-api
│     │  ├─ references
│     │  │  ├─ client-methods.md
│     │  │  ├─ constructor.md
│     │  │  ├─ filters.md
│     │  │  ├─ model-queries.md
│     │  │  ├─ query-options.md
│     │  │  ├─ raw-queries.md
│     │  │  ├─ relations.md
│     │  │  └─ transactions.md
│     │  └─ SKILL.md
│     ├─ prisma-compute
│     │  ├─ references
│     │  │  ├─ app-deploy-cli.md
│     │  │  ├─ compute-config.md
│     │  │  ├─ create-prisma.md
│     │  │  ├─ frameworks.md
│     │  │  ├─ sdk-api.md
│     │  │  └─ troubleshooting.md
│     │  └─ SKILL.md
│     ├─ prisma-database-setup
│     │  └─ SKILL.md
│     ├─ prisma-driver-adapter-implementation
│     │  └─ SKILL.md
│     ├─ prisma-mongodb-upgrade
│     │  ├─ references
│     │  │  ├─ client-api-mapping.md
│     │  │  ├─ decision-stay-or-migrate.md
│     │  │  ├─ migrations-mapping.md
│     │  │  ├─ schema-contract-mapping.md
│     │  │  └─ verify-cutover-checklist.md
│     │  └─ SKILL.md
│     ├─ prisma-orm-setup
│     │  ├─ references
│     │  │  ├─ v6-mongodb.md
│     │  │  ├─ v7-client-setup.md
│     │  │  ├─ v7-cockroachdb.md
│     │  │  ├─ v7-mysql.md
│     │  │  ├─ v7-postgresql.md
│     │  │  ├─ v7-prisma-postgres.md
│     │  │  ├─ v7-sqlite.md
│     │  │  └─ v7-sqlserver.md
│     │  └─ SKILL.md
│     ├─ prisma-postgres
│     │  └─ SKILL.md
│     ├─ prisma-postgres-setup
│     │  ├─ references
│     │  │  ├─ operations.md
│     │  │  ├─ provisioning.md
│     │  │  └─ vercel-marketplace.md
│     │  └─ SKILL.md
│     └─ prisma-upgrade-v7
│        ├─ references
│        │  ├─ accelerate-users.md
│        │  ├─ driver-adapters.md
│        │  ├─ env-variables.md
│        │  ├─ esm-support.md
│        │  ├─ prisma-config.md
│        │  ├─ removed-features.md
│        │  └─ schema-changes.md
│        └─ SKILL.md
├─ .claude
│  └─ skills
│     ├─ prisma-cli
│     │  ├─ references
│     │  │  ├─ agent-safety.md
│     │  │  ├─ complete.md
│     │  │  ├─ db-execute.md
│     │  │  ├─ db-pull.md
│     │  │  ├─ db-push.md
│     │  │  ├─ db-seed.md
│     │  │  ├─ debug.md
│     │  │  ├─ dev.md
│     │  │  ├─ format.md
│     │  │  ├─ generate.md
│     │  │  ├─ init.md
│     │  │  ├─ mcp.md
│     │  │  ├─ migrate-deploy.md
│     │  │  ├─ migrate-dev.md
│     │  │  ├─ migrate-diff.md
│     │  │  ├─ migrate-reset.md
│     │  │  ├─ migrate-resolve.md
│     │  │  ├─ migrate-status.md
│     │  │  ├─ studio.md
│     │  │  └─ validate.md
│     │  └─ SKILL.md
│     ├─ prisma-client-api
│     │  ├─ references
│     │  │  ├─ client-methods.md
│     │  │  ├─ constructor.md
│     │  │  ├─ filters.md
│     │  │  ├─ model-queries.md
│     │  │  ├─ query-options.md
│     │  │  ├─ raw-queries.md
│     │  │  ├─ relations.md
│     │  │  └─ transactions.md
│     │  └─ SKILL.md
│     ├─ prisma-compute
│     │  ├─ references
│     │  │  ├─ app-deploy-cli.md
│     │  │  ├─ compute-config.md
│     │  │  ├─ create-prisma.md
│     │  │  ├─ frameworks.md
│     │  │  ├─ sdk-api.md
│     │  │  └─ troubleshooting.md
│     │  └─ SKILL.md
│     ├─ prisma-database-setup
│     │  └─ SKILL.md
│     ├─ prisma-driver-adapter-implementation
│     │  └─ SKILL.md
│     ├─ prisma-mongodb-upgrade
│     │  ├─ references
│     │  │  ├─ client-api-mapping.md
│     │  │  ├─ decision-stay-or-migrate.md
│     │  │  ├─ migrations-mapping.md
│     │  │  ├─ schema-contract-mapping.md
│     │  │  └─ verify-cutover-checklist.md
│     │  └─ SKILL.md
│     ├─ prisma-orm-setup
│     │  ├─ references
│     │  │  ├─ v6-mongodb.md
│     │  │  ├─ v7-client-setup.md
│     │  │  ├─ v7-cockroachdb.md
│     │  │  ├─ v7-mysql.md
│     │  │  ├─ v7-postgresql.md
│     │  │  ├─ v7-prisma-postgres.md
│     │  │  ├─ v7-sqlite.md
│     │  │  └─ v7-sqlserver.md
│     │  └─ SKILL.md
│     ├─ prisma-postgres
│     │  └─ SKILL.md
│     ├─ prisma-postgres-setup
│     │  ├─ references
│     │  │  ├─ operations.md
│     │  │  ├─ provisioning.md
│     │  │  └─ vercel-marketplace.md
│     │  └─ SKILL.md
│     └─ prisma-upgrade-v7
│        ├─ references
│        │  ├─ accelerate-users.md
│        │  ├─ driver-adapters.md
│        │  ├─ env-variables.md
│        │  ├─ esm-support.md
│        │  ├─ prisma-config.md
│        │  ├─ removed-features.md
│        │  └─ schema-changes.md
│        └─ SKILL.md
├─ .windsurf
│  └─ skills
│     ├─ prisma-cli
│     │  ├─ references
│     │  │  ├─ agent-safety.md
│     │  │  ├─ complete.md
│     │  │  ├─ db-execute.md
│     │  │  ├─ db-pull.md
│     │  │  ├─ db-push.md
│     │  │  ├─ db-seed.md
│     │  │  ├─ debug.md
│     │  │  ├─ dev.md
│     │  │  ├─ format.md
│     │  │  ├─ generate.md
│     │  │  ├─ init.md
│     │  │  ├─ mcp.md
│     │  │  ├─ migrate-deploy.md
│     │  │  ├─ migrate-dev.md
│     │  │  ├─ migrate-diff.md
│     │  │  ├─ migrate-reset.md
│     │  │  ├─ migrate-resolve.md
│     │  │  ├─ migrate-status.md
│     │  │  ├─ studio.md
│     │  │  └─ validate.md
│     │  └─ SKILL.md
│     ├─ prisma-client-api
│     │  ├─ references
│     │  │  ├─ client-methods.md
│     │  │  ├─ constructor.md
│     │  │  ├─ filters.md
│     │  │  ├─ model-queries.md
│     │  │  ├─ query-options.md
│     │  │  ├─ raw-queries.md
│     │  │  ├─ relations.md
│     │  │  └─ transactions.md
│     │  └─ SKILL.md
│     ├─ prisma-compute
│     │  ├─ references
│     │  │  ├─ app-deploy-cli.md
│     │  │  ├─ compute-config.md
│     │  │  ├─ create-prisma.md
│     │  │  ├─ frameworks.md
│     │  │  ├─ sdk-api.md
│     │  │  └─ troubleshooting.md
│     │  └─ SKILL.md
│     ├─ prisma-database-setup
│     │  └─ SKILL.md
│     ├─ prisma-driver-adapter-implementation
│     │  └─ SKILL.md
│     ├─ prisma-mongodb-upgrade
│     │  ├─ references
│     │  │  ├─ client-api-mapping.md
│     │  │  ├─ decision-stay-or-migrate.md
│     │  │  ├─ migrations-mapping.md
│     │  │  ├─ schema-contract-mapping.md
│     │  │  └─ verify-cutover-checklist.md
│     │  └─ SKILL.md
│     ├─ prisma-orm-setup
│     │  ├─ references
│     │  │  ├─ v6-mongodb.md
│     │  │  ├─ v7-client-setup.md
│     │  │  ├─ v7-cockroachdb.md
│     │  │  ├─ v7-mysql.md
│     │  │  ├─ v7-postgresql.md
│     │  │  ├─ v7-prisma-postgres.md
│     │  │  ├─ v7-sqlite.md
│     │  │  └─ v7-sqlserver.md
│     │  └─ SKILL.md
│     ├─ prisma-postgres
│     │  └─ SKILL.md
│     ├─ prisma-postgres-setup
│     │  ├─ references
│     │  │  ├─ operations.md
│     │  │  ├─ provisioning.md
│     │  │  └─ vercel-marketplace.md
│     │  └─ SKILL.md
│     └─ prisma-upgrade-v7
│        ├─ references
│        │  ├─ accelerate-users.md
│        │  ├─ driver-adapters.md
│        │  ├─ env-variables.md
│        │  ├─ esm-support.md
│        │  ├─ prisma-config.md
│        │  ├─ removed-features.md
│        │  └─ schema-changes.md
│        └─ SKILL.md
├─ AGENTS.md
├─ app
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ prisma
│  ├─ lib
│  │  └─ prisma.ts
│  └─ schema.prisma
├─ prisma7.config.ts
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ skills-lock.json
└─ tsconfig.json

```