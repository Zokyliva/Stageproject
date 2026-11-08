// lib/errors.ts   [NOUVEAU]
// Erreurs métier de l'application : un code stable pour le front, un statut HTTP, un message lisible.
import { Prisma } from "@/generated/prisma/client";

export class AppError extends Error {
  // Champs déclarés explicitement (pas de « paramètres propriétés ») pour rester compatible
  // avec toutes les options TypeScript.
  readonly code: string;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: string, status: number, message: string, details?: unknown) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/** Fabriques des erreurs les plus fréquentes (mêmes codes que dans la conception de l'API). */
export const Errors = {
  badRequest: (message = "Requête invalide", details?: unknown) =>
    new AppError("BAD_REQUEST", 400, message, details),
  unauthenticated: () => new AppError("UNAUTHENTICATED", 401, "Connexion requise"),
  forbidden: (message = "Accès refusé") => new AppError("FORBIDDEN", 403, message),
  notFound: (what = "Ressource") => new AppError("NOT_FOUND", 404, `${what} introuvable`),
  conflict: (message = "Conflit avec l'état actuel de la ressource") =>
    new AppError("CONFLICT", 409, message),
};

/**
 * Violation de contrainte d'unicité (double inscription, email déjà pris, double dépôt...).
 * P2002 est le code Prisma correspondant.
 */
export function isUniqueViolation(e: unknown): boolean {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002";
}