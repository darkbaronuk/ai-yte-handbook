/**
 * Chạy migration: đồng bộ schema lên database.
 * - Local (không có POSTGRES_URL): dùng PGlite file-backed ./_pglite-dev
 * - Production: trỏ POSTGRES_URL vào Vercel Postgres / Neon / Supabase
 * Chạy: npx tsx scripts/migrate.ts  (cần tsx) hoặc node --experimental-strip-types
 */
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { migrate } from "drizzle-orm/pglite/migrator";
import { migrate as migratePg } from "drizzle-orm/postgres-js/migrator";

async function main() {
  if (process.env.POSTGRES_URL) {
    console.log("Migrating remote Postgres…");
    const client = postgres(process.env.POSTGRES_URL, { ssl: "require", max: 1 });
    const db = drizzlePg(client);
    await migratePg(db, { migrationsFolder: "./drizzle" });
    await client.end();
  } else {
    console.log("Migrating local PGlite…");
    const pglite = new PGlite("./.pglite-dev");
    const db = drizzle(pglite);
    await migrate(db, { migrationsFolder: "./drizzle" });
    await pglite.close();
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
