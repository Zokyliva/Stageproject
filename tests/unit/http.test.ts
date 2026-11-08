// tests/unit/http.test.ts   [NOUVEAU]
import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { AppError } from "@/lib/errors";
import { assertSameOrigin, errorResponse, handler, readJson } from "@/lib/http";

const ctx = { params: Promise.resolve({}) };
const req = (init?: RequestInit) => new Request("http://localhost:3000/api/test", init);

afterEach(() => vi.restoreAllMocks());

describe("handler : conversion des erreurs en réponses JSON", () => {
  it("laisse passer une réponse normale", async () => {
    const res = await handler(async () => Response.json({ ok: true }))(req(), ctx);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  it("AppError → statut, code et message de l'erreur", async () => {
    const res = await handler(async () => {
      throw new AppError("COURSE_NOT_PUBLISHED", 403, "Cours non publié");
    })(req(), ctx);
    expect(res.status).toBe(403);
    expect(await res.json()).toEqual({
      error: { code: "COURSE_NOT_PUBLISHED", message: "Cours non publié" },
    });
  });

  it("ZodError → 400 avec le détail par champ", async () => {
    const schema = z.object({ name: z.string().min(1, "Nom requis") });
    const res = await handler(async () => {
      schema.parse({ name: "" });
      return Response.json({});
    })(req(), ctx);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error.code).toBe("VALIDATION_ERROR");
    expect(body.error.details.name).toContain("Nom requis");
  });

  it("erreur inattendue → 500 sans fuite d'information", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {}); // évite le bruit dans la sortie
    const res = await handler(async () => {
      throw new Error("secret : mot de passe de la base");
    })(req(), ctx);
    expect(res.status).toBe(500);
    const text = JSON.stringify(await res.json());
    expect(text).toContain("INTERNAL");
    expect(text).not.toContain("secret");
  });

  it("errorResponse accepte aussi une valeur qui n'est pas une Error", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(errorResponse("n'importe quoi").status).toBe(500);
  });
});

describe("readJson", () => {
  it("lit un JSON valide", async () => {
    const r = req({ method: "POST", body: JSON.stringify({ a: 1 }) });
    await expect(readJson(r)).resolves.toEqual({ a: 1 });
  });

  it("lève un 400 INVALID_JSON si le JSON est invalide", async () => {
    const r = req({ method: "POST", body: "{pas du json" });
    await expect(readJson(r)).rejects.toMatchObject({ status: 400, code: "INVALID_JSON" });
  });
});

describe("assertSameOrigin", () => {
  it("ne contrôle pas les requêtes GET", () => {
    expect(() => assertSameOrigin(req({ headers: { origin: "https://evil.example" } }))).not.toThrow();
  });

  it("accepte un POST de la même origine", () => {
    const r = req({ method: "POST", headers: { origin: "http://localhost:3000" } });
    expect(() => assertSameOrigin(r)).not.toThrow();
  });

  it("accepte un POST sans en-tête Origin (script, test)", () => {
    expect(() => assertSameOrigin(req({ method: "POST" }))).not.toThrow();
  });

  it("refuse un POST venu d'un autre site (403)", () => {
    const r = req({ method: "POST", headers: { origin: "https://evil.example" } });
    expect(() => assertSameOrigin(r)).toThrowError(expect.objectContaining({ status: 403, code: "CROSS_ORIGIN" }));
  });

  it("refuse une origine invalide comme « null »", () => {
    const r = req({ method: "DELETE", headers: { origin: "null" } });
    expect(() => assertSameOrigin(r)).toThrowError(expect.objectContaining({ status: 403 }));
  });

  it("est appliqué par handler() aux requêtes modifiantes", async () => {
    const res = await handler(async () => Response.json({ ok: true }))(
      req({ method: "POST", headers: { origin: "https://evil.example" } }),
      ctx,
    );
    expect(res.status).toBe(403);
  });
});