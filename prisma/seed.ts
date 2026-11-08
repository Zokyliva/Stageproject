// prisma/seed.ts
// Données de démonstration (DÉVELOPPEMENT UNIQUEMENT). Relançable : tout passe par upsert
// avec « update: {} », donc une seconde exécution ne modifie ni ne duplique rien.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, type Category, type Role } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Le seed est réservé au développement : ne jamais le lancer en production.");
  }

  // ── Comptes de démonstration (mêmes noms que les mock-ups) ──
  const passwordHash = await bcrypt.hash(process.env.SEED_PASSWORD ?? "Demo1234!", 12);

  const upsertUser = (email: string, firstName: string, lastName: string, role: Role) =>
    prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, firstName, lastName, role, passwordHash },
    });

  const [admin, trainer, student] = await Promise.all([
    upsertUser("sarah.benali@exemple.fr", "Sarah", "Benali", "ADMIN"),
    upsertUser("julien.morel@exemple.fr", "Julien", "Morel", "TRAINER"),
    upsertUser("camille.martin@exemple.fr", "Camille", "Martin", "STUDENT"),
  ]);

  // ── Cours publiés (un par domaine, pour tester le catalogue) ──
  const upsertCourse = (c: {
    slug: string;
    title: string;
    description: string;
    category: Category;
    moduleTitle: string;
    lessons: string[];
  }) =>
    prisma.course.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        title: c.title,
        description: c.description,
        category: c.category,
        status: "PUBLISHED",
        publishedAt: new Date(),
        createdById: trainer.id,
        trainers: { create: { userId: trainer.id } }, // périmètre du Trainer
        modules: {
          create: {
            title: c.moduleTitle,
            position: 1,
            status: "PUBLISHED",
            lessons: {
              create: c.lessons.map((title, i) => ({
                title,
                content: `# ${title}\n\nContenu de démonstration.`,
                position: i + 1,
                status: "PUBLISHED" as const,
              })),
            },
          },
        },
      },
    });

  const english = await upsertCourse({
    slug: "anglais-professionnel-b1",
    title: "Anglais professionnel — B1",
    description: "Communiquer à l'écrit et à l'oral en contexte professionnel.",
    category: "LANGUAGES",
    moduleTitle: "L'email pro",
    lessons: ["Structure d'un email", "Formules de politesse", "Rédiger une relance"],
  });
  await upsertCourse({
    slug: "excel-les-essentiels",
    title: "Excel — Les essentiels",
    description: "Formules, mise en forme et premiers tableaux croisés.",
    category: "OFFICE",
    moduleTitle: "Premiers pas",
    lessons: ["L'interface", "Les formules de base"],
  });
  await upsertCourse({
    slug: "accueil-et-conseil-voyageur",
    title: "Accueil et conseil voyageur",
    description: "Accueillir et conseiller un voyageur.",
    category: "EDUCTOUR",
    moduleTitle: "Accueil",
    lessons: ["Les bases de l'accueil", "Construire une offre"],
  });

  // ── Inscription de l'étudiant au cours d'anglais ──
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: student.id, courseId: english.id } },
    update: {},
    create: { userId: student.id, courseId: english.id },
  });

  // ── Un devoir publié, rattaché à la 3e leçon d'anglais (id fixe = relançable) ──
  const lesson3 = await prisma.lesson.findFirst({
    where: { module: { courseId: english.id }, position: 3 },
  });
  await prisma.assignment.upsert({
    where: { id: "seed_assignment_relance" },
    update: {},
    create: {
      id: "seed_assignment_relance",
      courseId: english.id,
      lessonId: lesson3?.id,
      title: "Rédiger une relance à un fournisseur",
      instructions: "Votre commande n°4521 n'a pas été livrée. Rédigez un email de relance (120 à 180 mots).",
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // dans 30 jours
      status: "PUBLISHED",
      createdById: trainer.id,
    },
  });

  console.log(`Seed terminé : admin=${admin.email}, trainer=${trainer.email}, student=${student.email}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });