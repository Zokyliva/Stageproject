// app/(admin)/utilisateurs/page.tsx   [NOUVEAU]
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Utilisateurs" };

export default function UtilisateursPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Utilisateurs</h1>
      <p className="mt-2 text-muted">Page provisoire : le contenu arrive au sprint S1.</p>
    </>
  );
}