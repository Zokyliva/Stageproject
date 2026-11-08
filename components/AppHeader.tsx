// components/AppHeader.tsx   [NOUVEAU]
// En-tête commun aux trois espaces. Composant serveur STATIQUE : aucune donnée de requête,
// donc compatible avec Cache Components.
// En S1, on ajoutera à droite un emplacement pour le nom de l'utilisateur et « Déconnexion »
// (dans un <Suspense>, car il dépendra de la session).
import Link from "next/link";
import { Suspense } from "react";
import type { Role } from "@/generated/prisma/client";
import { NAV_BY_ROLE, ROLE_HOME, ROLE_LABEL, type NavItem } from "@/lib/nav";
import { NavLinks } from "./NavLinks";

// Version sans soulignement actif, affichée le temps que NavLinks lise l'URL.
// Précaution : à terme, certaines routes auront des paramètres (/cours/[courseId]/…) et
// lire l'URL peut alors demander une frontière Suspense avec Cache Components.
function NavFallback({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Navigation principale" className="flex h-full gap-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex items-center border-b-[3px] border-transparent text-sm font-semibold text-muted"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AppHeader({ role }: { role: Role }) {
  const items = NAV_BY_ROLE[role];

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-6">
        <Link href={ROLE_HOME[role]} className="font-serif text-xl font-bold text-navy">
          HoneyLMS
        </Link>

        <Suspense fallback={<NavFallback items={items} />}>
          <NavLinks items={items} />
        </Suspense>

        <span className="ml-auto rounded-full bg-honey/30 px-3 py-1 text-xs font-bold tracking-wide text-navy uppercase">
          {ROLE_LABEL[role]}
        </span>
      </div>
    </header>
  );
}