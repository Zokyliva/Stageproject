// lib/prisma.ts
// Client Prisma unique pour toute l'application (Prisma 7 : connexion via adaptateur pg).
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL est absente : vérifie ton fichier .env");
}

// En développement, le rechargement à chaud rejoue ce fichier : on réutilise le client
// existant pour ne pas ouvrir une nouvelle série de connexions à chaque modification.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;