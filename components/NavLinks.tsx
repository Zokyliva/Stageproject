// components/NavLinks.tsx   [NOUVEAU]
// Liens de navigation avec soulignement du lien actif.
// Composant client car il lit l'URL courante (usePathname).
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, type NavItem } from "@/lib/nav";

export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation principale"
      className="flex h-full gap-6 overflow-x-auto"
    >
      {items.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex items-center border-b-[3px] text-sm font-semibold whitespace-nowrap transition-colors ${
              active
                ? "border-honey text-navy"
                : "border-transparent text-muted hover:text-navy"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
