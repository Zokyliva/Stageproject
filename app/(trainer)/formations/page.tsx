// app/(trainer)/formations/page.tsx   [NOUVEAU]
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes formations" };

export default function FormationsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Mes formations</h1>
      <p className="mt-2 text-muted">Page provisoire : le contenu arrive au sprint S1.</p>
    </>
  );
}