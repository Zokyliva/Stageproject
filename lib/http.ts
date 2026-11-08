// lib/http.ts   [NOUVEAU]
// Outils communs aux Route Handlers (app/api/**/route.ts) :
//  - handler()          : transforme toute erreur en réponse JSON { error: { code, message, details } }
//  - readJson()         : lit le corps JSON, 400 propre si le JSON est invalide
//  - assertSameOrigin() : refuse les requêtes modifiantes venues d'un autre site (protection CSRF)
import { ZodError } from "zod";
import { AppError } from "./errors";

type Ctx<P> = { params: Promise<P> }; // en Next.js 15+, params est une Promise

/** Refuse une requête POST/PUT/PATCH/DELETE dont l'en-tête Origin ne correspond pas à notre hôte. */
export function assertSameOrigin(req: Request) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return;
  const origin = req.headers.get("origin");
  if (!origin) return; // appel non navigateur (tests, scripts) : pas d'en-tête Origin
  // Derrière Caddy, l'en-tête Host d'origine est conservé ; à défaut on prend l'hôte de l'URL.
  const host = req.headers.get("host") ?? new URL(req.url).host;
  let originHost: string | null = null;
  try {
    originHost = new URL(origin).host;
  } catch {
    originHost = null; // Origin invalide (ex. « null ») : traité comme étranger
  }
  if (originHost !== host) throw new AppError("CROSS_ORIGIN", 403, "Origine non autorisée");
}

/** Lit le corps JSON d'une requête ; lève un 400 si le JSON est invalide. */
export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    throw new AppError("INVALID_JSON", 400, "Corps de requête JSON invalide");
  }
}

/** { champ: [messages] } à partir d'une erreur Zod (indépendant de la version de Zod). */
function fieldErrors(error: ZodError): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "_form";
    (out[key] ??= []).push(issue.message);
  }
  return out;
}

/** Convertit n'importe quelle erreur en réponse JSON avec le bon statut HTTP. */
export function errorResponse(e: unknown): Response {
  if (e instanceof AppError) {
    return Response.json(
      {
        error: {
          code: e.code,
          message: e.message,
          ...(e.details !== undefined ? { details: e.details } : {}),
        },
      },
      { status: e.status },
    );
  }
  if (e instanceof ZodError) {
    return Response.json(
      { error: { code: "VALIDATION_ERROR", message: "Données invalides", details: fieldErrors(e) } },
      { status: 400 },
    );
  }
  console.error(e); // erreur inattendue : détail dans les logs, jamais renvoyé au client
  return Response.json({ error: { code: "INTERNAL", message: "Erreur interne" } }, { status: 500 });
}

/**
 * Enveloppe d'un Route Handler. P décrit les paramètres de l'URL, par exemple handler<{ id: string }>(…).
 */
export function handler<P extends Record<string, string> = Record<string, string>>(
  fn: (req: Request, ctx: Ctx<P>) => Promise<Response>,
) {
  return async (req: Request, ctx: Ctx<P>): Promise<Response> => {
    try {
      assertSameOrigin(req);
      return await fn(req, ctx);
    } catch (e) {
      return errorResponse(e);
    }
  };
}