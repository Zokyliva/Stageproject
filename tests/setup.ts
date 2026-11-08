// tests/setup.ts   [MODIFIÉ : remplace tout le contenu]
// Exécuté avant chaque fichier de test (unitaire ou intégration).
// Il ne contient plus que le garde-fou : refuser de tourner si DATABASE_URL ne désigne pas
// une base « de test ». La remise à zéro des données est dans tests/db.ts.
const url = process.env.DATABASE_URL ?? "";
let dbName = "";
try {
  dbName = new URL(url).pathname.slice(1);
} catch {
  dbName = "";
}
if (!/test/i.test(dbName)) {
  throw new Error(
    `GARDE-FOU : la base « ${dbName || "?"} » n'est pas une base de test (son nom doit contenir « test »). ` +
      "Vérifie .env.test.",
  );
}