// app/api/health/route.ts   [NOUVEAU]
// Sonde utilisée par Docker et par le moniteur d'uptime : la base répond-elle ?
import { prisma } from "@/lib/prisma";

// Toujours évalué à la demande (jamais figé au build). Si une future option de Next.js
// (« cacheComponents ») rend cette ligne invalide, supprime-la.


export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "db_unreachable" }, { status: 503 });
  }
}