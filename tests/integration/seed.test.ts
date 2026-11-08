// tests/integration/seed.test.ts   [MODIFIÉ : remplace tout le contenu]
// Vérifie que le seed est relançable : deux exécutions donnent exactement les mêmes effectifs.
import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { resetDatabase, cleanDatabaseBeforeEach } from "../db";

cleanDatabaseBeforeEach();

function runSeed() {
  // Le seed est lancé comme en vrai (tsx), sur la base de test (variables d'environnement héritées).
  const r = spawnSync("npx tsx prisma/seed.ts", {
    shell: true, // nécessaire sous Windows pour résoudre « npx »
    encoding: "utf8",
    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL },
  });
  if (r.status !== 0) throw new Error(`Seed en échec :\n${r.stdout}\n${r.stderr}`);
}

async function counts() {
  const [users, courses, modules, lessons, enrollments, assignments] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.enrollment.count(),
    prisma.assignment.count(),
  ]);
  return { users, courses, modules, lessons, enrollments, assignments };
}

describe("seed", () => {
  it(
    "est relançable sans créer de doublon",
    async () => {
      await resetDatabase(); // le test compte des lignes : il part explicitement d'une base vide

      runSeed();
      const first = await counts();
      expect(first).toEqual({
        users: 3, courses: 3, modules: 3, lessons: 7, enrollments: 1, assignments: 1,
      });

      runSeed();
      expect(await counts()).toEqual(first);

      // Les trois rôles sont présents, une seule fois chacun
      const roles = await prisma.user.groupBy({ by: ["role"], _count: true });
      expect(roles.map((r) => r.role).sort()).toEqual(["ADMIN", "STUDENT", "TRAINER"]);
    },
    120_000, // deux exécutions de tsx : on laisse jusqu'à 2 minutes
  );
});