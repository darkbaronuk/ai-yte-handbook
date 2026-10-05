import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import { PGlite } from "@electric-sql/pglite";
import postgres from "postgres";
import * as schema from "./schema";

// Lazy singleton: Postgres thật khi có POSTGRES_URL (production),
// PGlite file-backed khi dev local.
let _db: ReturnType<typeof drizzlePg> | null = null;

export function getDb() {
  if (_db) return _db;
  if (process.env.POSTGRES_URL) {
    const client = postgres(process.env.POSTGRES_URL, { ssl: "require" });
    _db = drizzlePg(client, { schema });
  } else {
    const pglite = new PGlite("./.pglite-dev");
    _db = drizzlePglite(pglite, { schema }) as unknown as ReturnType<
      typeof drizzlePg
    >;
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzlePg>, {
  get(_t, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
