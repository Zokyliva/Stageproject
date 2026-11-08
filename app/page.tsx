// app/page.tsx   [MODIFIÉ : remplace tout le contenu]
// ACCUEIL PROVISOIRE (développement). En S1, cette page deviendra une redirection :
// non connecté → /login, sinon → page d'arrivée du rôle (ROLE_HOME).
import Link from "next/link";
import { ROLE_HOME, ROLE_LABEL } from "@/lib/nav";

const spaces = (["STUDENT", "TRAINER", "ADMIN"] as const).map((role) => ({
  role,
  href: ROLE_HOME[role],
  label: ROLE_LABEL[role],
}));

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm font-bold tracking-widest text-tangerine uppercase">
        Honey Group Academy
      </p>
      <h1 className="text-4xl font-bold">HoneyLMS</h1>
      <p className="text-muted">
        Environnement de développement : accès direct aux trois espaces, sans
        connexion (l&apos;authentification arrive au sprint S1).
      </p>
      <ul className="flex flex-wrap gap-3">
        {spaces.map((s) => (
          <li key={s.role}>
            <Link
              href={s.href}
              className="inline-block rounded-full bg-brand px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              Espace {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
