// tests/integration/health.test.ts   [NOUVEAU]
// Vraie base de test : la sonde doit répondre « ok ».
import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/health/route";
import { cleanDatabaseBeforeEach } from "../db"; // sert ici à fermer proprement la connexion en fin de fichier

cleanDatabaseBeforeEach();

describe("GET /api/health : base joignable", () => {
  it("répond 200 avec le statut ok", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ status: "ok" });
  });
});