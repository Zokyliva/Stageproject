// tests/unit/errors.test.ts   [NOUVEAU]
import { describe, expect, it } from "vitest";
import { AppError, Errors, isUniqueViolation } from "@/lib/errors";

describe("AppError", () => {
  it("porte un code, un statut et un message", () => {
    const e = new AppError("ALREADY_ENROLLED", 409, "Déjà inscrit", { courseId: "c1" });
    expect(e).toBeInstanceOf(Error);
    expect(e.code).toBe("ALREADY_ENROLLED");
    expect(e.status).toBe(409);
    expect(e.message).toBe("Déjà inscrit");
    expect(e.details).toEqual({ courseId: "c1" });
  });
});

describe("Errors", () => {
  it.each([
    ["unauthenticated", Errors.unauthenticated(), 401, "UNAUTHENTICATED"],
    ["forbidden", Errors.forbidden(), 403, "FORBIDDEN"],
    ["notFound", Errors.notFound("Cours"), 404, "NOT_FOUND"],
    ["conflict", Errors.conflict(), 409, "CONFLICT"],
    ["badRequest", Errors.badRequest(), 400, "BAD_REQUEST"],
  ])("%s → statut et code attendus", (_name, error, status, code) => {
    expect(error.status).toBe(status);
    expect(error.code).toBe(code);
  });

  it("notFound nomme la ressource", () => {
    expect(Errors.notFound("Cours").message).toBe("Cours introuvable");
  });
});

describe("isUniqueViolation", () => {
  // Le cas « vrai » (code P2002) est couvert par tests/integration/schema.test.ts
  it("est faux pour une erreur ordinaire ou une valeur quelconque", () => {
    expect(isUniqueViolation(new Error("boom"))).toBe(false);
    expect(isUniqueViolation(null)).toBe(false);
    expect(isUniqueViolation("P2002")).toBe(false);
  });
});