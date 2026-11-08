// components/RoleShell.tsx   [NOUVEAU]
// Coque commune des trois espaces : en-tête + zone de contenu.
// En S1, c'est ICI (et seulement ici) qu'on ajoutera la vérification du rôle :
//   <Suspense fallback={…}><RoleGate role={role}>{children}</RoleGate></Suspense>
import type { ReactNode } from "react";
import type { Role } from "@/generated/prisma/client";
import { AppHeader } from "./AppHeader";

export function RoleShell({ role, children }: { role: Role; children: ReactNode }) {
  return (
    <>
      <AppHeader role={role} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </>
  );
}