// tests/factories.ts   [NOUVEAU]
// Fonctions qui créent rapidement des données valides pour les tests.
import { prisma } from "@/lib/prisma";
import type { Role, UserStatus } from "@/generated/prisma/client";

let n = 0; // compteur : garantit des valeurs uniques (emails, slugs, clés de fichier)

export function makeUser(
  role: Role = "STUDENT",
  overrides: { email?: string; status?: UserStatus } = {},
) {
  const i = ++n;
  return prisma.user.create({
    data: {
      email: overrides.email ?? `user${i}@test.fr`,
      firstName: "Test",
      lastName: `User${i}`,
      role,
      status: overrides.status ?? "ACTIVE",
      passwordHash: "x", // jamais utilisé pour se connecter dans ces tests
    },
  });
}

/** Cours avec 1 module et 1 leçon. Un Trainer « créateur » est créé automatiquement. */
export async function makeCourse(opts: { trainerIds?: string[]; published?: boolean } = {}) {
  const creator = await makeUser("TRAINER");
  const status = opts.published === false ? "DRAFT" : "PUBLISHED";
  const i = ++n;
  return prisma.course.create({
    data: {
      title: "Cours test",
      slug: `cours-${i}`,
      category: "LANGUAGES",
      status,
      createdById: creator.id,
      trainers: { create: (opts.trainerIds ?? []).map((userId) => ({ userId })) },
      modules: {
        create: {
          title: "M1",
          position: 1,
          status,
          lessons: { create: { title: "L1", position: 1, status } },
        },
      },
    },
    include: { modules: { include: { lessons: true } } },
  });
}

export function makeFile(uploadedById: string) {
  const i = ++n;
  return prisma.fileAsset.create({
    data: {
      storageKey: `test-${i}.pdf`,
      originalName: "test.pdf",
      mimeType: "application/pdf",
      sizeBytes: 1,
      uploadedById,
    },
  });
}

export function makeAssignment(courseId: string, createdById: string, dueDate?: Date) {
  return prisma.assignment.create({
    data: {
      courseId,
      createdById,
      title: "Devoir test",
      instructions: "Consigne",
      status: "PUBLISHED",
      dueDate: dueDate ?? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // dans 7 jours par défaut
    },
  });
}