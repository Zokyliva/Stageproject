// tests/unit/nav.test.ts   [NOUVEAU]
import { describe, expect, it } from "vitest";
import { isActivePath, NAV_BY_ROLE, ROLE_HOME, ROLE_LABEL } from "@/lib/nav";

const roles = ["STUDENT", "TRAINER", "ADMIN"] as const;

describe("navigation par rôle", () => {
  it.each(roles)("%s : a au moins un lien, tous valides et sans doublon", (role) => {
    const items = NAV_BY_ROLE[role];
    expect(items.length).toBeGreaterThan(0);
    for (const item of items) {
      expect(item.label.trim()).not.toBe("");
      expect(item.href.startsWith("/")).toBe(true);
    }
    const hrefs = items.map((i) => i.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it.each(roles)("%s : sa page d'arrivée figure dans sa navigation", (role) => {
    const hrefs = NAV_BY_ROLE[role].map((i) => i.href);
    expect(hrefs).toContain(ROLE_HOME[role]);
  });

  it("chaque rôle a une page d'arrivée et un libellé distincts", () => {
    const homes = roles.map((r) => ROLE_HOME[r]);
    const labels = roles.map((r) => ROLE_LABEL[r]);
    expect(new Set(homes).size).toBe(roles.length);
    expect(new Set(labels).size).toBe(roles.length);
  });

  it("reproduit les pages d'arrivée des wireframes", () => {
    expect(ROLE_HOME.STUDENT).toBe("/mes-cours");
    expect(ROLE_HOME.TRAINER).toBe("/formations");
    expect(ROLE_HOME.ADMIN).toBe("/utilisateurs");
  });
});

describe("isActivePath", () => {
  it.each([
    ["/mes-cours", "/mes-cours", true],
    ["/formations/12", "/formations", true],
    ["/formations/12/edit", "/formations", true],
    ["/formations-archive", "/formations", false], // préfixe sans « / » : autre page
    ["/catalogue", "/mes-cours", false],
    ["/", "/mes-cours", false],
    [null, "/mes-cours", false],
  ])("isActivePath(%s, %s) = %s", (pathname, href, expected) => {
    expect(isActivePath(pathname, href)).toBe(expected);
  });
});