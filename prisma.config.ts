import "dotenv/config"; // Prisma 7 ne charge plus .env automatiquement
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Commande lancée par « npx prisma db seed » (Prisma 7 ne la lance plus après migrate)
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // env() lève une erreur claire si DATABASE_URL est absente.
    // Si l'import de `env` échoue chez toi, remets : url: process.env["DATABASE_URL"]
    url: env("DATABASE_URL"),
  },
});