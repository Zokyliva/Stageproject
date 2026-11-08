// tests/db.ts   [MODIFIÉ : remplace tout le contenu]
// Outils des tests d'INTÉGRATION.
//  - resetDatabase()     : vide toutes les tables (à appeler directement quand un test compte des lignes)
//  - useCleanDatabase()  : à appeler en haut de chaque fichier d'intégration ; vide la base avant chaque test
//                          et ferme la connexion à la fin du fichier
import { afterAll, beforeEach } from "vitest";

export async function resetDatabase() {
  const { prisma } = await import("@/lib/prisma");
  const tables = await prisma.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND tablename <> '_prisma_migrations'`;
  if (tables.length > 0) {
    const list = tables.map((t) => `"${t.tablename}"`).join(", ");
    await prisma.$executeRawUnsafe(`TRUNCATE ${list} RESTART IDENTITY CASCADE`);
  }
}

export function cleanDatabaseBeforeEach() {
  beforeEach(async () => {
    await resetDatabase();
  });

  afterAll(async () => {
    const { prisma } = await import("@/lib/prisma");
    await prisma.$disconnect();
  });
}