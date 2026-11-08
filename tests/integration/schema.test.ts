// tests/integration/schema.test.ts   [NOUVEAU]
// Automatise les vérifications SQL du Lot 1 (scripts/sql/verify-constraints.sql).
// Chaque test vérifie deux choses : l'opération est REFUSÉE, et rien n'a été enregistré.
import { describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { isUniqueViolation } from "@/lib/errors";
import { makeAssignment, makeCourse, makeFile, makeUser } from "../factories";
import { cleanDatabaseBeforeEach } from "../db";

cleanDatabaseBeforeEach();

/** Cours + devoir + étudiant prêts à recevoir une soumission. */
async function scenario() {
  const trainer = await makeUser("TRAINER");
  const student = await makeUser("STUDENT");
  const course = await makeCourse({ trainerIds: [trainer.id] });
  const assignment = await makeAssignment(course.id, trainer.id);
  return { trainer, student, course, assignment };
}

describe("Submission : contraintes de la base", () => {
  it("accepte une note valide (14,5) et la relit correctement", async () => {
    const { student, assignment } = await scenario();
    const file = await makeFile(student.id);
    const sub = await prisma.submission.create({
      data: { assignmentId: assignment.id, studentId: student.id, fileId: file.id, grade: 14.5 },
    });
    expect(sub.status).toBe("SUBMITTED");
    expect(sub.grade?.toString()).toBe("14.5");
  });

  it.each([25, -1, 20.01])("refuse la note %s (hors de 0–20)", async (grade) => {
    const { student, assignment } = await scenario();
    const file = await makeFile(student.id);
    await expect(
      prisma.submission.create({
        data: { assignmentId: assignment.id, studentId: student.id, fileId: file.id, grade },
      }),
    ).rejects.toThrow();
    expect(await prisma.submission.count()).toBe(0);
  });

  it("accepte les bornes 0 et 20", async () => {
    const { student, assignment, trainer } = await scenario();
    const other = await makeUser("STUDENT");
    const f1 = await makeFile(student.id);
    const f2 = await makeFile(other.id);
    await prisma.submission.create({
      data: { assignmentId: assignment.id, studentId: student.id, fileId: f1.id, grade: 0 },
    });
    await prisma.submission.create({
      data: { assignmentId: assignment.id, studentId: other.id, fileId: f2.id, grade: 20 },
    });
    expect(await prisma.submission.count()).toBe(2);
    expect(trainer.role).toBe("TRAINER"); // (le Trainer n'intervient pas ici)
  });

  it("refuse une soumission « GRADED » sans correcteur ni date de correction", async () => {
    const { student, assignment } = await scenario();
    const file = await makeFile(student.id);
    await expect(
      prisma.submission.create({
        data: { assignmentId: assignment.id, studentId: student.id, fileId: file.id, status: "GRADED" },
      }),
    ).rejects.toThrow();
    expect(await prisma.submission.count()).toBe(0);
  });

  it("accepte « GRADED » avec correcteur, même sans note (la note est facultative)", async () => {
    const { student, assignment, trainer } = await scenario();
    const file = await makeFile(student.id);
    const sub = await prisma.submission.create({
      data: {
        assignmentId: assignment.id,
        studentId: student.id,
        fileId: file.id,
        status: "GRADED",
        gradedById: trainer.id,
        gradedAt: new Date(),
        feedback: "Bon travail",
      },
    });
    expect(sub.grade).toBeNull();
    expect(sub.status).toBe("GRADED");
  });

  it("refuse un second dépôt du même étudiant pour le même devoir (unicité)", async () => {
    const { student, assignment } = await scenario();
    const f1 = await makeFile(student.id);
    const f2 = await makeFile(student.id);
    await prisma.submission.create({
      data: { assignmentId: assignment.id, studentId: student.id, fileId: f1.id },
    });
    const error = await prisma.submission
      .create({ data: { assignmentId: assignment.id, studentId: student.id, fileId: f2.id } })
      .catch((e: unknown) => e);
    expect(isUniqueViolation(error)).toBe(true); // c'est aussi le test du cas « vrai » de isUniqueViolation
    expect(await prisma.submission.count()).toBe(1);
  });
});

describe("Autres unicités", () => {
  it("refuse une double inscription au même cours", async () => {
    const student = await makeUser("STUDENT");
    const course = await makeCourse();
    await prisma.enrollment.create({ data: { userId: student.id, courseId: course.id } });
    const error = await prisma.enrollment
      .create({ data: { userId: student.id, courseId: course.id } })
      .catch((e: unknown) => e);
    expect(isUniqueViolation(error)).toBe(true);
  });

  it("refuse deux comptes avec le même email", async () => {
    await makeUser("STUDENT", { email: "doublon@test.fr" });
    const error = await makeUser("STUDENT", { email: "doublon@test.fr" }).catch((e: unknown) => e);
    expect(isUniqueViolation(error)).toBe(true);
  });

  it("refuse deux cours avec le même slug", async () => {
    const creator = await makeUser("TRAINER");
    const data = { title: "A", slug: "meme-slug", category: "OFFICE" as const, createdById: creator.id };
    await prisma.course.create({ data });
    const error = await prisma.course.create({ data }).catch((e: unknown) => e);
    expect(isUniqueViolation(error)).toBe(true);
  });
});