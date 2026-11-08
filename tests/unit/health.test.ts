// tests/unit/health.test.ts   [NOUVEAU]
// La base est simulée (mock) : on vérifie le comportement quand elle est injoignable.
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: { $queryRaw: vi.fn().mockRejectedValue(new Error("connexion refusée")) },
}));

import { GET } from "@/app/api/health/route";

describe("GET /api/health : base injoignable", () => {
  it("répond 503 avec le statut db_unreachable", async () => {
    const res = await GET();
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ status: "db_unreachable" });
  });
});