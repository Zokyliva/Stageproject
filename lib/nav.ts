// lib/nav.ts   [NOUVEAU]
// Navigation de chaque espace, d'après les wireframes. Ce fichier ne contient que des données
// et une fonction pure : il est testable sans navigateur (tests/unit/nav.test.ts).
// `import type` : rien de Prisma n'est embarqué côté navigateur.
import type { Role } from "@/generated/prisma/client";

export type NavItem = { label: string; href: string };

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  STUDENT: [
    { label: "Catalogue", href: "/catalogue" },
    { label: "Mes cours", href: "/mes-cours" },
  ],
  TRAINER: [
    { label: "Mes formations", href: "/formations" },
    { label: "Corrections", href: "/corrections" },
  ],
  ADMIN: [
    { label: "Utilisateurs", href: "/utilisateurs" },
    { label: "Classes", href: "/classes" },
    { label: "Catalogue", href: "/catalogue" },
  ],
};

/** Page d'arrivée après connexion, selon le rôle (wireframes : écran de connexion). */
export const ROLE_HOME: Record<Role, string> = {
  STUDENT: "/mes-cours",
  TRAINER: "/formations",
  ADMIN: "/utilisateurs",
};

export const ROLE_LABEL: Record<Role, string> = {
  STUDENT: "Student",
  TRAINER: "Trainer",
  ADMIN: "Admin",
};

/** Un lien est « actif » sur sa page et sur ses sous-pages (/formations est actif sur /formations/12). */
export function isActivePath(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
