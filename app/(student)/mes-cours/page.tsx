// app/(student)/mes-cours/page.tsx   [NOUVEAU]
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes cours" };

export default function MesCoursPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Mes cours</h1>
      <p className="mt-2 text-muted">Page provisoire : le contenu arrive au sprint S2.</p>
    </>
  );
}