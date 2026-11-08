// vitest.config.ts   [NOUVEAU, à la racine de stage/]
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { parse } from "dotenv";

// Variables d'environnement des tests : lues dans .env.test et injectées dans process.env.
// Elles remplacent donc celles de .env : les tests ne touchent jamais à la base de développement.
function loadTestEnv(): Record<string, string> {
  try {
    return parse(readFileSync(".env.test"));
  } catch {
    throw new Error("Fichier .env.test introuvable : crée-le à la racine (voir Lot 1, étape B6).");
  }
}

export default defineConfig({
  resolve: {
    // Alias « @/ » = racine du projet (comme dans tsconfig.json)
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    env: loadTestEnv(),
    setupFiles: ["./tests/setup.ts"],
    fileParallelism: false, // les tests d'intégration partagent une seule base : exécution en série
  },
});